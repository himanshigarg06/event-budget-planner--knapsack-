#include "comparison.h"

#include <iomanip>
#include <iostream>

using namespace std;

void compareAlgorithms(
    const vector<Vendor>& vendors,
    int budget)
{
    GreedyResult greedyResult =
        runGreedy(vendors, budget);

    KnapsackResult dpResult =
        runKnapsack(vendors, budget);

    cout << "\n===============================================\n";
    cout << "          ALGORITHM COMPARISON\n";
    cout << "===============================================\n\n";

    cout << left
         << setw(20) << "Metric"
         << setw(15) << "Greedy"
         << setw(15) << "DP"
         << endl;

    cout << "------------------------------------------------\n";

    cout << left
         << setw(20) << "Total Cost"
         << setw(15) << greedyResult.totalCost
         << setw(15) << dpResult.totalCost
         << endl;

    cout << left
         << setw(20) << "Total Value"
         << setw(15) << greedyResult.totalValue
         << setw(15) << dpResult.totalValue
         << endl;

    cout << left
         << setw(20) << "Remaining Budget"
         << setw(15) << budget - greedyResult.totalCost
         << setw(15) << budget - dpResult.totalCost
         << endl;

    cout << left
         << setw(20) << "Vendors Selected"
         << setw(15) << greedyResult.selectedVendors.size()
         << setw(15) << dpResult.selectedVendors.size()
         << endl;

    cout << "\n-----------------------------------------------\n";

if (dpResult.totalValue > greedyResult.totalValue)
{
    cout << "Winner : Dynamic Programming\n";
    cout << "Additional Value Gained : "
         << dpResult.totalValue - greedyResult.totalValue
         << endl;

    cout << "\nRecommendation\n";
    cout << "--------------\n";
    cout << "Dynamic Programming is recommended because\n";
    cout << "it produces the highest total event value\n";
    cout << "while staying within the given budget.\n";
}
else if (greedyResult.totalValue > dpResult.totalValue)
{
    cout << "Winner : Greedy Algorithm\n";
    cout << "Additional Value Gained : "
         << greedyResult.totalValue - dpResult.totalValue
         << endl;

    cout << "\nRecommendation\n";
    cout << "--------------\n";
    cout << "Greedy is recommended for faster execution\n";
    cout << "when a near-optimal solution is acceptable.\n";
}
else
{
    cout << "Result : Tie\n";

    cout << "\nRecommendation\n";
    cout << "--------------\n";
    cout << "Both algorithms produced the same value.\n";
    cout << "Greedy is preferred because it executes\n";
    cout << "faster for this dataset.\n";
}

cout << "\nBudget Utilization\n";
cout << "------------------\n";

cout << fixed << setprecision(2);

cout << "Greedy : "
     << (greedyResult.totalCost * 100.0 / budget)
     << "%\n";

cout << "Dynamic Programming : "
     << (dpResult.totalCost * 100.0 / budget)
     << "%\n";

cout << "\nEfficiency Summary\n";
cout << "------------------\n";

cout << "Greedy Vendors Selected : "
     << greedyResult.selectedVendors.size()
     << endl;

cout << "DP Vendors Selected : "
     << dpResult.selectedVendors.size()
     << endl;

cout << "Unused Budget (Greedy) : Rs. "
     << budget - greedyResult.totalCost
     << endl;

cout << "Unused Budget (DP) : Rs. "
     << budget - dpResult.totalCost
     << endl;

cout << "\n================================================\n";
}