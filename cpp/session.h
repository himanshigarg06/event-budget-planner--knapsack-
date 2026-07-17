#ifndef SESSION_H
#define SESSION_H

#include "greedy.h"
#include "knapsack.h"

// Stores the current planning session.
struct PlannerSession
{
    int budget = 0;

    bool hasGreedyResult = false;
    bool hasDPResult = false;

    GreedyResult greedyResult;
    KnapsackResult dpResult;
};

#endif