#include "report.h"

#include <fstream>
#include <iomanip>
#include <ctime>

using namespace std;

static void printHeader(ofstream& file,
                        const string& algorithm,
                        int budget)
{
    time_t now = time(nullptr);

    file << "=============================================\n";
    file << "         EVENT BUDGET PLANNER REPORT\n";
    file << "=============================================\n\n";

    file << "Algorithm : " << algorithm << endl;
    file << "Budget    : Rs. " << budget << endl;
    file << "Generated : " << ctime(&now) << endl;
}

bool generateGreedyReport(
    const GreedyResult& result,
    int budget,
    const string& filename)
{
    ofstream file(filename);

    if (!file.is_open())
        return false;

    printHeader(file, "Greedy Algorithm", budget);

    file << "Selected Vendors\n";
    file << "---------------------------------------------\n";

    for (size_t i = 0; i < result.selectedVendors.size(); i++)
    {
        file << i + 1 << ". "
             << result.selectedVendors[i].name
             << "\n";

        file << "   Cost  : Rs. "
             << result.selectedVendors[i].cost
             << "\n";

        file << "   Value : "
             << result.selectedVendors[i].value
             << "\n\n";
    }

    file << "---------------------------------------------\n";
    file << "Total Cost      : Rs. "
         << result.totalCost << endl;

    file << "Remaining Budget: Rs. "
         << budget - result.totalCost << endl;

    file << "Total Value     : "
         << result.totalValue << endl;

    file.close();

    return true;
}

bool generateDPReport(
    const KnapsackResult& result,
    int budget,
    const string& filename)
{
    ofstream file(filename);

    if (!file.is_open())
        return false;

    printHeader(file,
                "Dynamic Programming",
                budget);

    file << "Selected Vendors\n";
    file << "---------------------------------------------\n";

    for (size_t i = 0; i < result.selectedVendors.size(); i++)
    {
        file << i + 1 << ". "
             << result.selectedVendors[i].name
             << "\n";

        file << "   Cost  : Rs. "
             << result.selectedVendors[i].cost
             << "\n";

        file << "   Value : "
             << result.selectedVendors[i].value
             << "\n\n";
    }

    file << "---------------------------------------------\n";

    file << "Total Cost      : Rs. "
         << result.totalCost << endl;

    file << "Remaining Budget: Rs. "
         << budget - result.totalCost << endl;

    file << "Total Value     : "
         << result.totalValue << endl;

    file.close();

    return true;
}