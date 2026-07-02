#ifndef GREEDY_H
#define GREEDY_H

#include "vendor.h"

// Stores the result returned by the greedy algorithm.
struct GreedyResult
{
    std::vector<Vendor> selectedVendors;
    int totalCost;
    int totalValue;
};

// Executes the greedy algorithm.
GreedyResult runGreedy(const std::vector<Vendor>& vendors, int budget);

// Displays the greedy algorithm result.
void displayGreedyResult(const GreedyResult& result, int budget);

#endif