#include <iostream>
#include <vector>

#include "vendor.h"
#include "greedy.h"
#include "knapsack.h"

using namespace std;

int main(int argc, char* argv[])
{
    if (argc != 2)
    {
        cerr << "Usage: budgetwise_api <budget>" << endl;
        return 1;
    }

    int budget;

    try
    {
        budget = stoi(argv[1]);
    }
    catch (...)
    {
        cerr << "Invalid budget" << endl;
        return 1;
    }

    if (budget <= 0)
    {
        cerr << "Budget must be positive" << endl;
        return 1;
    }

    vector<Vendor> vendors;

    if (!loadVendorsFromFile(vendors, "vendors.txt"))
    {
        loadDefaultVendors(vendors);
    }

    GreedyResult greedy = runGreedy(vendors, budget);
    KnapsackResult knapsack = runKnapsack(vendors, budget);

    cout << "GREEDY\n";
    cout << greedy.totalCost << '\n';
    cout << greedy.totalValue << '\n';
    cout << greedy.selectedVendors.size() << '\n';

    for (const auto& v : greedy.selectedVendors)
    {
        cout << v.name << '|'
             << v.cost << '|'
             << v.value << '\n';
    }

    cout << "KNAPSACK\n";
    cout << knapsack.totalCost << '\n';
    cout << knapsack.totalValue << '\n';
    cout << knapsack.selectedVendors.size() << '\n';

    for (const auto& v : knapsack.selectedVendors)
    {
        cout << v.name << '|'
             << v.cost << '|'
             << v.value << '\n';
    }

    return 0;
}