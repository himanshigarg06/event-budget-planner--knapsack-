#include "greedy.h"

#include <algorithm>
#include <iomanip>
#include <iostream>

using namespace std;

// Helper structure used for sorting vendors based on Value/Cost ratio.
struct VendorRatio
{
    Vendor vendor;
    double ratio;
};

// Runs the greedy algorithm.
GreedyResult runGreedy(const vector<Vendor>& vendors, int budget)
{
    GreedyResult result;

    result.totalCost = 0;
    result.totalValue = 0;

    vector<VendorRatio> sortedVendors;

    // Calculate Value/Cost ratio for every vendor.
    for (const Vendor& vendor : vendors)
    {
        VendorRatio temp;

        temp.vendor = vendor;
        temp.ratio = static_cast<double>(vendor.value) / vendor.cost;

        sortedVendors.push_back(temp);
    }

    // Sort vendors in descending order of Value/Cost ratio.
    sort(sortedVendors.begin(), sortedVendors.end(),
         [](const VendorRatio& a, const VendorRatio& b)
         {
             return a.ratio > b.ratio;
         });

    int remainingBudget = budget;

    // Select vendors while budget allows.
    for (const VendorRatio& item : sortedVendors)
    {
        if (item.vendor.cost <= remainingBudget)
        {
            result.selectedVendors.push_back(item.vendor);

            remainingBudget -= item.vendor.cost;

            result.totalCost += item.vendor.cost;
            result.totalValue += item.vendor.value;
        }
    }

    return result;
}

// Displays the greedy result.
void displayGreedyResult(const GreedyResult& result, int budget)
{
    cout << "\n=========================================\n";
    cout << "         GREEDY PLANNER RESULT\n";
    cout << "=========================================\n\n";

    if (result.selectedVendors.empty())
    {
        cout << "No vendors could be selected within the budget.\n";
        return;
    }

    cout << left
         << setw(20) << "Vendor"
         << setw(12) << "Cost"
         << setw(10) << "Value"
         << endl;

    cout << "----------------------------------------------\n";

    for (const Vendor& vendor : result.selectedVendors)
    {
        cout << left
             << setw(20) << vendor.name
             << setw(12) << vendor.cost
             << setw(10) << vendor.value
             << endl;
    }

    cout << "\n----------------------------------------------\n";
    cout << "Total Cost       : Rs. " << result.totalCost << endl;
    cout << "Total Value      : " << result.totalValue << endl;
    cout << "Remaining Budget : Rs. " << budget - result.totalCost << endl;
}
