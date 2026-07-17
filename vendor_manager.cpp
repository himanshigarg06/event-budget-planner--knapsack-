#include "vendor_manager.h"

#include <iostream>

using namespace std;

void manageVendors(vector<Vendor>& vendors)
{
    int choice;

    do
    {
        cout << "\n========== VENDOR MANAGEMENT ==========\n";
        cout << "1. Add Vendor\n";
        cout << "2. Update Vendor\n";
        cout << "3. Delete Vendor\n";
        cout << "4. Search Vendors\n";
        cout << "5. View Vendors\n";
        cout << "6. Back\n";

        cout << "\nEnter choice : ";
        cin >> choice;

        switch(choice)
        {
            case 1:
            {
                Vendor v;

                cout << "\nVendor Name : ";
                cin.ignore();
                getline(cin, v.name);

                if (v.name.empty())
                {
                    cout << "\nVendor name cannot be empty.\n";
                    break;
                }

                cout << "Cost : ";
                cin >> v.cost;

                if (cin.fail())
                {
                    cin.clear();
                    cin.ignore(10000, '\n');
                    cout << "\nInvalid cost entered.\n";
                    break;
                }

                if (v.cost <= 0)
                {
                    cout << "\nCost must be greater than zero.\n";
                    break;
                }

                cout << "Value : ";
                cin >> v.value;

                if (cin.fail())
                {
                    cin.clear();
                    cin.ignore(10000, '\n');
                    cout << "\nInvalid value entered.\n";
                    break;
                }

                if (v.value <= 0)
                {
                    cout << "\nValue must be greater than zero.\n";
                    break;
                }

                // Check duplicate vendor names
                bool duplicate = false;
                for (const auto& vendor : vendors)
                {
                    if (vendor.name == v.name)
                    {
                        //cout << "\nVendor with this name already exists.\n";
                        duplicate = true;
                        break;
                    }
                }

                
                if(duplicate){
                    cout << "\nVendor with this name already exists.\n";
                    break;
                }
                saveVendorsToFile(vendors,"vendors.txt");
                cout << "\nVendor Added Successfully.\n";
                break;
            }

            case 2:
            {
                displayVendors(vendors);

                int index;

                cout << "\nVendor Number : ";
                cin >> index;

                if(index>=1 && index<=vendors.size())
                {
                    Vendor &v = vendors[index-1];

                    cin.ignore();

                    cout << "New Name : ";
                    getline(cin,v.name);

                    cout << "New Cost : ";
                    cin >> v.cost;

                    if (cin.fail())
                    {
                        cin.clear();
                        cin.ignore(10000, '\n');
                        cout << "\nInvalid Cost.\n";
                        break;
                    }

                    if (v.cost <= 0)
                    {
                        cout << "\nCost must be greater than zero.\n";
                        break;
                    }

                    cout << "New Value : ";
                    cin >> v.value;

                    if (cin.fail())
                    {
                        cin.clear();
                        cin.ignore(10000, '\n');
                        cout << "\nInvalid Value.\n";
                        break;
                    }

                    if (v.value <= 0)
                    {
                        cout << "\nValue must be greater than zero.\n";
                        break;
                    }

                cout << "\nVendor Updated Successfully.\n";
                saveVendorsToFile(vendors,"vendors.txt");
                break;
                }
            }
            case 3:
            {
                displayVendors(vendors);

                int index;

                cout << "\nVendor Number : ";
                cin >> index;

                if(index>=1 && index<=vendors.size())
                {
                    vendors.erase(vendors.begin()+index-1);
                    saveVendorsToFile(vendors,"vendors.txt");
                    cout << "\nVendor Deleted.\n";
                }
                else
                {
                    cout << "\nInvalid Vendor.\n";
                }

                break;
            }
            case 4:
            {
                string keyword;

                cin.ignore();

                cout << "\nEnter Vendor Name : ";

                getline(cin, keyword);

                bool found = false;

                for(const auto &v : vendors)
                {
                    if(v.name.find(keyword)!=string::npos)
                    {
                        cout<<"\n"<<v.name<<endl;
                        cout<<"Cost : "<<v.cost<<endl;
                        cout<<"Value : "<<v.value<<endl;

                        found=true;
                    }
                }

                if(!found)
                    cout<<"\nVendor Not Found.\n";

                break;
            }
            case 5:
                displayVendors(vendors);
                //if(saveVendorsToFile(vendors,"vendors.txt"))
                 //   cout << "\nChanges Saved.\n";
                //else
                //    cout << "\nSave Failed.\n";
//
                //break;

            case 6:

                break;

            default:

                cout << "\nInvalid Choice.\n";
        }

    }while(choice!=6);
}