#ifndef VENDOR_H
#define VENDOR_H

#include <iostream>
#include <vector>
#include <string>
#include <fstream>
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
// Loads vendors from a text file.
bool loadVendorsFromFile(
    vector<Vendor>& vendors,
    const string& filename
);

// Saves vendors back to the text file.
bool saveVendorsToFile(
    const vector<Vendor>& vendors,
    const string& filename
);

// Loads default vendors if file cannot be opened.
void loadDefaultVendors(
    vector<Vendor>& vendors
);
#endif