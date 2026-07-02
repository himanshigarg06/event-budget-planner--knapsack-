#ifndef VENDOR_H
#define VENDOR_H

#include <iostream>
#include <vector>
#include <string>

using namespace std;

// Represents one vendor or activity available for the event.
struct Vendor
{
    string name;
    int cost;
    int value;
};

// Function declarations
void loadSampleVendors(vector<Vendor>& vendors);
void displayVendors(const vector<Vendor>& vendors);

#endif