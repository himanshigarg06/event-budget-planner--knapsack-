from flask import Flask, render_template, request
import subprocess
import os

app = Flask(__name__)

# Path to your C++ executable
CPP_EXECUTABLE = os.path.join(
    os.path.dirname(__file__),
    "..",
    "cpp",
    "server.exe"      # Change this to your executable name if different
)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/planner")
def planner():
    return render_template("planner.html")


@app.route("/optimize", methods=["POST"])
def optimize():

    event_name = request.form.get("event_name", "").strip()
    event_type = request.form.get("event_type", "").strip()
    budget = request.form.get("budget", "").strip()
    guests = request.form.get("guests", "").strip()

    try:

        result = subprocess.run(

            [CPP_EXECUTABLE],

            input=f"{event_name}\n{event_type}\n{budget}\n{guests}\n",

            capture_output=True,

            text=True,

            timeout=15

        )

        output = result.stdout

    except Exception as e:

        output = f"Error:\n{e}"

    return render_template(
        "results.html",
        output=output,
        event_name=event_name
    )


@app.route("/about")
def about():
    return render_template("about.html")


if __name__ == "__main__":
    app.run(debug=True)