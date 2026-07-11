#include "vendor.h"
#include <sstream>

// Loads some sample vendors into memory.
// Later, this will be replaced by reading from a file.
void loadDefaultVendors(vector<Vendor>& vendors)
{
    vendors.push_back({"Catering", 25000, 95});
    vendors.push_back({"Decoration", 18000, 70});
    vendors.push_back({"Photography", 15000, 65});
    vendors.push_back({"DJ", 12000, 50});
    vendors.push_back({"Games", 10000, 40});
}
// Loads vendor information from a text file.
bool loadVendorsFromFile(
    vector<Vendor>& vendors,
    const string& filename)
{
    ifstream file(filename);

    if (!file.is_open())
    {
        return false;
    }

    vendors.clear();

    string line;

    while (getline(file, line))
    {
        stringstream ss(line);

        Vendor vendor;

        string cost;
        string value;

        getline(ss, vendor.name, ',');
        getline(ss, cost, ',');
        getline(ss, value, ',');

        vendor.cost = stoi(cost);
        vendor.value = stoi(value);

        vendors.push_back(vendor);
    }

    file.close();

    return true;
}
// Saves vendor information into the text file.
bool saveVendorsToFile(
    const vector<Vendor>& vendors,
    const string& filename)
{
    ofstream file(filename);

    if (!file.is_open())
    {
        return false;
    }

    for (const Vendor& vendor : vendors)
    {
        file << vendor.name << ","
             << vendor.cost << ","
             << vendor.value << endl;
    }

    file.close();

    return true;
}
void displayVendors(const vector<Vendor>& vendors)
{
    cout << "\n========== Available Vendors ==========\n";

    for (int i = 0; i < vendors.size(); i++)
    {
        cout << i + 1 << ". " << vendors[i].name << endl;
        cout << "   Cost  : Rs. " << vendors[i].cost << endl;
        cout << "   Value : " << vendors[i].value << endl;
        cout << "--------------------------------------\n";
    }
}
