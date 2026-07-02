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
    }
    else if (dpResult.totalValue < greedyResult.totalValue)
    {
        cout << "Winner : Greedy\n";
    }
    else
    {
        cout << "Both algorithms produced the same result.\n";
    }
}