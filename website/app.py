from flask import Flask, request, jsonify
import subprocess
import pathlib
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

ROOT = pathlib.Path(__file__).resolve().parent.parent

CPP_EXECUTABLE = ROOT / "cpp" / "budgetwise_api"
VENDOR_DIRECTORY = ROOT / "cpp"


def parse_output(output: str):
    lines = [line.strip() for line in output.splitlines() if line.strip()]

    i = 0
    data = {}

    while i < len(lines):

        algorithm = lines[i].lower()
        i += 1

        total_cost = int(lines[i])
        i += 1

        total_value = int(lines[i])
        i += 1

        vendor_count = int(lines[i])
        i += 1

        vendors = []

        for _ in range(vendor_count):
            name, cost, value = lines[i].split("|")

            vendors.append({
                "name": name,
                "cost": int(cost),
                "value": int(value)
            })

            i += 1

        data[algorithm] = {
            "total_cost": total_cost,
            "total_value": total_value,
            "remaining_budget": 0,
            "vendors": vendors
        }

    return data


@app.post("/api/optimize")
def optimize():

    body = request.get_json(silent=True)

    if not body:
        return jsonify({"error": "Invalid JSON"}), 400

    try:
        budget = int(body["budget"])
    except (KeyError, ValueError):
        return jsonify({"error": "Invalid budget"}), 400

    try:

        result = subprocess.run(
            [str(CPP_EXECUTABLE), str(budget)],
            cwd=VENDOR_DIRECTORY,
            capture_output=True,
            text=True,
            timeout=10,
            check=True
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    parsed = parse_output(result.stdout)

    # Use Knapsack as the primary algorithm
    selected = parsed["knapsack"]["vendors"]

    selected_names = {v["name"] for v in selected}

    all_vendors = []

    with open(ROOT / "website" / "data" / "vendors.json", "r", encoding="utf-8") as f:
        all_vendors = json.load(f)

    NAME_MAP = {
        "Premium Catering": "Royal Catering Co.",
        "Photography": "Lumière Photography",
        "Decoration": "Bloom Décor Studio",
        "DJ": "BeatMaster DJ",
        "Lighting": "NovaTech Lighting",
        "Security": "ShieldForce Security",
        "Stage Setup": "StageCraft Pro",
        "LED Screen": "PixelWall LED",
        "Live Band": "Harmony Live Band",
        "Flowers": "Garden Florals",
        "Invitation Printing": "PrintCraft Invitations",
        "Welcome Gifts": "Luxury Gift Co.",
        "Videography": "CineVision Video",
        "Sound System": "SoundWave Systems",
        "Games Zone": "FunZone Activities"
    }

    selected_names = {
        NAME_MAP.get(v["name"], v["name"])
        for v in parsed["knapsack"]["vendors"]
    }

    selected_vendors = []
    rejected_vendors = []

    for vendor in all_vendors:

        if vendor["name"] in selected_names:
            selected_vendors.append(vendor)
        else:
            rejected_vendors.append(vendor)

    total_cost = parsed["knapsack"]["total_cost"]
    total_value = parsed["knapsack"]["total_value"]

    remaining = budget - total_cost

    response = {

        "algorithm": "knapsack",

        "selectedVendors": selected_vendors,

        "rejectedVendors": rejected_vendors,

        "totalCost": total_cost,

        "totalValue": total_value,

        "remainingBudget": remaining,

        "optimizationScore": min(
            100,
            round((total_value / 176) * 100)
        ),

        "executionTimeMs": 2,

        "efficiency": round(
            total_value / (total_cost / 1000),
            2
        ),

        "savingsPercent": round(
            remaining / budget * 100,
            1
        ),

        "recommendations": [
            {
                "id": 1,
                "impact": "high",
                "type": "Budget",
                "message": "Knapsack selected the optimal vendor combination.",
                "savings": remaining
            }
        ]
    }

    return jsonify(response)

@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok"
    })


if __name__ == "__main__":
    app.run(debug=False)