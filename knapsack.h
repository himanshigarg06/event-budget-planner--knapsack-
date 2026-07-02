#ifndef KNAPSACK_H
#define KNAPSACK_H

#include "vendor.h"
#include <vector>

using namespace std;

// Stores the result produced by the Dynamic Programming algorithm.
struct KnapsackResult
{
    vector<Vendor> selectedVendors;
    int totalCost;
    int totalValue;
};

// Builds the Dynamic Programming table.
vector<vector<int>> buildDPTable(const vector<Vendor>& vendors, int budget);

// Backtracks through the DP table to recover the selected vendors.
vector<Vendor> recoverSelectedVendors(
    const vector<Vendor>& vendors,
    const vector<vector<int>>& dp,
    int budget
);

// Executes the complete Knapsack algorithm.
KnapsackResult runKnapsack(
    const vector<Vendor>& vendors,
    int budget
);

// Displays the final result.
void displayKnapsackResult(
    const KnapsackResult& result,
    int budget
);

#endif