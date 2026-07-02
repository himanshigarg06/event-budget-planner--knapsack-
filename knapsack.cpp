#include "knapsack.h"

#include <iostream>
#include <iomanip>

using namespace std;

vector<vector<int>> buildDPTable(const vector<Vendor>& vendors, int budget)
{
    int numberOfVendors = vendors.size();

    // Create a DP table with all values initialized to 0.
    vector<vector<int>> dp(numberOfVendors + 1,
                           vector<int>(budget + 1, 0));

    // Build the table row by row.
    for (int i = 1; i <= numberOfVendors; i++)
    {
        for (int currentBudget = 1;
             currentBudget <= budget;
             currentBudget++)
        {
            int vendorCost = vendors[i - 1].cost;
            int vendorValue = vendors[i - 1].value;

            // If the current vendor fits within the budget,
            // choose the better of taking or skipping it.
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
                // Vendor cannot be selected because it exceeds
                // the available budget.
                dp[i][currentBudget] =
                    dp[i - 1][currentBudget];
            }
        }
    }

    return dp;
}
vector<Vendor> recoverSelectedVendors(
    const vector<Vendor>& vendors,
    const vector<vector<int>>& dp,
    int budget)
{
    return {};
}

KnapsackResult runKnapsack(
    const vector<Vendor>& vendors,
    int budget)
{
    KnapsackResult result;

    result.totalCost = 0;
    result.totalValue = 0;

    return result;
}

void displayKnapsackResult(
    const KnapsackResult& result,
    int budget)
{
    cout << "\nDynamic Programming module is under development.\n";
}