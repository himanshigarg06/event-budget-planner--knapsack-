#include <iostream>
#include <limits>

#include "menu.h"

using namespace std;

// Displays the main menu.
void displayMenu()
{
    cout << "\n=====================================\n";
    cout << "      EVENT BUDGET PLANNER\n";
    cout << "=====================================\n";

    cout << "1. View Available Vendors\n";
    cout << "2. Enter Event Budget\n";
    cout << "3. Run Greedy Planner\n";
    cout << "4. Run Dynamic Programming\n";
    cout << "5. Exit\n";

    cout << "\nEnter your choice: ";
}

// Takes a valid budget from the user.
int getBudget()
{
    int budget;

    while (true)
    {
        cout << "\nEnter your total event budget (Rs.): ";

        cin >> budget;

        if (cin.fail())
        {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');

            cout << "Please enter numbers only.\n";
        }
        else if (budget <= 0)
        {
            cout << "Budget must be greater than zero.\n";
        }
        else
        {
            return budget;
        }
    }
}