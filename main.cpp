#include <iostream>
#include <vector>

#include "comparison.h"
#include "vendor.h"
#include "menu.h"
#include "greedy.h"
#include "knapsack.h"
#include "report.h"
#include "session.h"
#include "vendor_manager.h"
#include "statistics.h"

using namespace std;

int main()
{
    vector<Vendor> vendors;

    if (!loadVendorsFromFile(vendors, "vendors.txt"))
{
    cout << "Vendor file not found.\n";
    cout << "Loading default vendors...\n\n";

    loadDefaultVendors(vendors);
}
    PlannerSession session;
    int choice;
    //int budget = 0;

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

                session.budget = getBudget();

                cout << "\nBudget saved successfully!\n";
                cout << "Current Budget : Rs. " << session.budget << endl;

                break;

            case 3:

                if (session.budget == 0)
                {
                    cout << "\nPlease enter the budget first.\n";
                }
                else
                {
                    session.greedyResult =
                        runGreedy(vendors, session.budget);
                    session.hasGreedyResult = true;

                    displayGreedyResult(session.greedyResult, session.budget);
                }

                break;

            case 4:

                if (session.budget == 0)
                {
                    cout << "\nPlease enter the budget first.\n";
                }
                else
                {
                    session.dpResult =
                        runKnapsack(vendors, session.budget);
                    session.hasDPResult = true;
                    displayKnapsackResult(session.dpResult, session.budget);
                }

                break;

            case 5:

    if (session.budget == 0)
    {
        cout << "\nPlease enter the budget first.\n";
    }
    else
    {
        compareAlgorithms(vendors, session.budget);
    }

    break;
case 6:

    manageVendors(vendors);

    break;
case 7:
{
    int option;

    cout << "\nGenerate Report\n";
    cout << "1. Greedy Report\n";
    cout << "2. Dynamic Programming Report\n";
    cout << "Choice : ";

    cin >> option;

    bool success = false;

    if (option == 1)
    {
        if (!session.hasGreedyResult)
        {
            cout << "\nRun Greedy Algorithm first.\n";
        }
        else
        {
            success = generateGreedyReport(
                session.greedyResult,
                session.budget
            );
        }
    }
    else if (option == 2)
    {
        if (!session.hasDPResult)
        {
            cout << "\nRun Dynamic Programming first.\n";
        }
        else
        {
            success = generateDPReport(
                session.dpResult,
                session.budget
            );
        }
    }
    else
    {
        cout << "\nInvalid choice.\n";
    }

    if (success)
    {
        cout << "\nReport generated successfully.\n";
        cout << "Saved as report.txt\n";
    }

    break;
}
case 8:

    displayStatistics(vendors);

    break;
case 9:

    cout << "\nThank you for using Event Budget Planner.\n";

    break;
        }

    } while (choice != 9);

    return 0;
}