#include "knapsack.h"

#include <algorithm>
#include <iomanip>
#include <iostream>

using namespace std;

// Builds the Dynamic Programming table.
vector<vector<int>> buildDPTable(const vector<Vendor>& vendors, int budget)
{
    int numberOfVendors = vendors.size();

    // Create a DP table initialized with 0.
    vector<vector<int>> dp(numberOfVendors + 1,
                           vector<int>(budget + 1, 0));

    // Fill the DP table row by row.
    for (int i = 1; i <= numberOfVendors; i++)
    {
        for (int currentBudget = 1;
             currentBudget <= budget;
             currentBudget++)
        {
            int vendorCost = vendors[i - 1].cost;
            int vendorValue = vendors[i - 1].value;

            // Check if the vendor can fit in the current budget.
            if (vendorCost <= currentBudget)
            {
                dp[i][currentBudget] = max(
                    dp[i - 1][currentBudget],
                    vendorValue +
                    dp[i - 1][currentBudget - vendorCost]
                );
            }
            else
            {
                // Vendor cannot be selected.
                dp[i][currentBudget] =
                    dp[i - 1][currentBudget];
            }
        }
    }

    return dp;
}

// Walk backwards through the DP table to recover
// which vendors were selected.
vector<Vendor> recoverSelectedVendors(
    const vector<Vendor>& vendors,
    const vector<vector<int>>& dp,
    int budget)
{
    vector<Vendor> selectedVendors;

    int currentBudget = budget;

    // Start from the last vendor.
    for (int i = vendors.size(); i > 0; i--)
    {
        // If value changed, this vendor was selected.
        if (dp[i][currentBudget] != dp[i - 1][currentBudget])
        {
            selectedVendors.push_back(vendors[i - 1]);

            currentBudget -= vendors[i - 1].cost;
        }
    }

    // Vendors were collected in reverse order.
    reverse(selectedVendors.begin(), selectedVendors.end());

    return selectedVendors;
}

// Runs the complete Knapsack algorithm.
KnapsackResult runKnapsack(
    const vector<Vendor>& vendors,
    int budget)
{
    KnapsackResult result;

    result.totalCost = 0;
    result.totalValue = 0;

    // Build the DP table.
    vector<vector<int>> dp =
        buildDPTable(vendors, budget);

    // Recover selected vendors.
    result.selectedVendors =
        recoverSelectedVendors(
            vendors,
            dp,
            budget);

    // Calculate total cost and total value.
    for (const Vendor& vendor : result.selectedVendors)
    {
        result.totalCost += vendor.cost;
        result.totalValue += vendor.value;
    }

    return result;
}

// Displays the Dynamic Programming result.
void displayKnapsackResult(
    const KnapsackResult& result,
    int budget)
{
    cout << "\n=========================================\n";
    cout << "    DYNAMIC PROGRAMMING RESULT\n";
    cout << "=========================================\n\n";

    if (result.selectedVendors.empty())
    {
        cout << "No vendors could be selected.\n";
        return;
    }

    cout << left
         << setw(5) << "No."
         << setw(20) << "Vendor"
         << setw(12) << "Cost"
         << setw(10) << "Value"
         << endl;

    cout << "---------------------------------------------------\n";

    for (int i = 0; i < result.selectedVendors.size(); i++)
    {
        cout << left
             << setw(5) << i + 1
             << setw(20) << result.selectedVendors[i].name
             << setw(12) << result.selectedVendors[i].cost
             << setw(10) << result.selectedVendors[i].value
             << endl;
    }

    cout << "\n---------------------------------------------------\n";
    cout << "Total Cost       : Rs. " << result.totalCost << endl;
    cout << "Total Value      : " << result.totalValue << endl;
    cout << "Remaining Budget : Rs. "
         << budget - result.totalCost << endl;
}