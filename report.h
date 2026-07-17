#ifndef REPORT_H
#define REPORT_H

#include "greedy.h"
#include "knapsack.h"
#include <string>

// Generates report using Greedy result
bool generateGreedyReport(
    const GreedyResult& result,
    int budget,
    const std::string& filename = "report.txt"
);

// Generates report using Dynamic Programming result
bool generateDPReport(
    const KnapsackResult& result,
    int budget,
    const std::string& filename = "report.txt"
);

#endif