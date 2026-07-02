#include "knapsack.h"

#include <iostream>
#include <iomanip>

using namespace std;

vector<vector<int>> buildDPTable(const vector<Vendor>& vendors, int budget)
{
    return {};
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