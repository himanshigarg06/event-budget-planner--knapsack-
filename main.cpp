#include <iostream>
#include <vector>

#include "vendor.h"
#include "menu.h"
#include "greedy.h"
#include "knapsack.h"

using namespace std;

int main()
{
    vector<Vendor> vendors;

    loadSampleVendors(vendors);

    int choice;
    int budget = 0;

    do
    {
        displayMenu();
        cin >> choice;

        switch (choice)
        {
            case 1:

                displayVendors(vendors);

                break;

            case 2:

                budget = getBudget();

                cout << "\nBudget saved successfully!\n";
                cout << "Current Budget : Rs. " << budget << endl;

                break;

            case 3:

                if (budget == 0)
                {
                    cout << "\nPlease enter the budget first.\n";
                }
                else
                {
                    GreedyResult greedyResult =
                        runGreedy(vendors, budget);

                    displayGreedyResult(greedyResult, budget);
                }

                break;

            case 4:

                if (budget == 0)
                {
                    cout << "\nPlease enter the budget first.\n";
                }
                else
                {
                    KnapsackResult dpResult =
                        runKnapsack(vendors, budget);

                    displayKnapsackResult(dpResult, budget);
                }

                break;

            case 5:

                cout << "\nThank you for using Event Budget Planner.\n";

                break;

            default:

                cout << "\nInvalid choice. Please try again.\n";
        }

    } while (choice != 5);

    return 0;
}