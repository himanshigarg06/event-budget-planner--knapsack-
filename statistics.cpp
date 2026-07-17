#include "statistics.h"

#include <iostream>
#include <iomanip>

using namespace std;

void displayStatistics(const vector<Vendor>& vendors)
{
    if (vendors.empty())
    {
        cout << "\nNo vendor data available.\n";
        return;
    }

    int totalCost = 0;
    int totalValue = 0;

    int highestValue = vendors[0].value;
    int lowestCost = vendors[0].cost;
    int highestCost = vendors[0].cost;

    string highestValueVendor = vendors[0].name;
    string cheapestVendor = vendors[0].name;
    string expensiveVendor = vendors[0].name;

    for (const auto& vendor : vendors)
    {
        totalCost += vendor.cost;
        totalValue += vendor.value;

        if (vendor.value > highestValue)
        {
            highestValue = vendor.value;
            highestValueVendor = vendor.name;
        }

        if (vendor.cost < lowestCost)
        {
            lowestCost = vendor.cost;
            cheapestVendor = vendor.name;
        }

        if (vendor.cost > highestCost)
        {
            highestCost = vendor.cost;
            expensiveVendor = vendor.name;
        }
    }

    double averageCost =
        static_cast<double>(totalCost) / vendors.size();

    double averageValue =
        static_cast<double>(totalValue) / vendors.size();

    cout << "\n==================================================\n";
    cout << "              PROJECT STATISTICS\n";
    cout << "==================================================\n\n";

    cout << left << setw(30) << "Total Vendors"
         << ": " << vendors.size() << endl;

    cout << left << setw(30) << "Average Vendor Cost"
         << ": Rs. " << fixed << setprecision(2)
         << averageCost << endl;

    cout << left << setw(30) << "Average Vendor Value"
         << ": " << averageValue << endl;

    cout << left << setw(30) << "Highest Value Vendor"
         << ": " << highestValueVendor
         << " (" << highestValue << ")" << endl;

    cout << left << setw(30) << "Cheapest Vendor"
         << ": " << cheapestVendor
         << " (Rs. " << lowestCost << ")" << endl;

    cout << left << setw(30) << "Most Expensive Vendor"
         << ": " << expensiveVendor
         << " (Rs. " << highestCost << ")" << endl;

    cout << "\n==================================================\n";
}