#include "vendor.h"

// Loads some sample vendors into memory.
// Later, this will be replaced by reading from a file.
void loadSampleVendors(vector<Vendor>& vendors)
{
    vendors.push_back({"Catering", 25000, 95});
    vendors.push_back({"Decoration", 18000, 70});
    vendors.push_back({"Photography", 15000, 65});
    vendors.push_back({"DJ", 12000, 50});
    vendors.push_back({"Games", 10000, 40});
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
