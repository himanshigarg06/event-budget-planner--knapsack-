# Event Budget Planner (Knapsack-Based)

## 📌 Overview

**Event Budget Planner** is a C++ application that helps event organizers optimize their spending by selecting the best combination of vendors and activities within a fixed budget. The project models the real-world budgeting problem as a **0/1 Knapsack Problem** and solves it using **Dynamic Programming (DP)**.

In addition to the optimal DP solution, the application also implements a **Greedy Algorithm** as a baseline. The outputs of both algorithms are compared to demonstrate why Dynamic Programming produces better results for optimization problems involving budget constraints.

This project showcases practical applications of **Dynamic Programming, Greedy Algorithms, Arrays, STL, File Handling, and Algorithm Analysis**.

---

# Problem Statement

Event planning often involves choosing among multiple vendors such as catering services, decorators, photographers, DJs, and entertainment providers while staying within a limited budget.

Selecting vendors manually may lead to poor budget utilization or lower event quality.

The objective is to automatically determine the best combination of vendors that:

* Does not exceed the available budget.
* Maximizes the overall value of the event.
* Generates an itemized budget plan.
* Compares the optimal solution with a simple greedy approach.

---

# Objectives

* Implement the **0/1 Knapsack Dynamic Programming Algorithm**.
* Compare the DP solution with a Greedy Algorithm.
* Generate a detailed vendor selection report.
* Ensure the total spending never exceeds the given budget.
* Demonstrate real-world application of Dynamic Programming.

---

# Features

### Vendor Management

* Display available vendors
* View vendor cost and value
* Load vendor data from a file
* Add new vendors (future enhancement)
* Update vendor details (future enhancement)
* Delete vendors (future enhancement)

---

### Budget Planning

* Accept user-defined budget
* Calculate optimal vendor selection
* Ensure budget compliance
* Display remaining budget

---

### Dynamic Programming Optimization

Uses the **0/1 Knapsack Algorithm** to maximize event value.

The algorithm considers every possible valid combination before selecting the best one.

---

### Greedy Baseline

Implements a greedy strategy based on the **Value/Cost ratio**.

This allows comparison between:

* Fast but non-optimal solution
* Optimal Dynamic Programming solution

---

### Comparison Report

Displays:

* Selected vendors
* Total cost
* Total value
* Remaining budget
* Difference between Greedy and DP

---

### Report Generation

Creates an itemized report containing:

* Budget
* Selected vendors
* Total expenditure
* Remaining balance
* Total event value
* Algorithm used

---

# Technologies Used

* C++
* Standard Template Library (STL)
* Dynamic Programming
* Greedy Algorithm
* Arrays
* Structures
* Vectors
* Sorting
* File Handling

---

# Data Structure

Each vendor is represented using a structure.

```cpp
struct Vendor
{
    string name;
    int cost;
    int value;
};
```

Where:

* **name** → Vendor name
* **cost** → Amount required to hire the vendor
* **value** → Importance or benefit score assigned to the vendor

---

# Project Structure

```
EventBudgetPlanner/

│── main.cpp
│── vendor.h
│── vendor.cpp
│── greedy.h
│── greedy.cpp
│── knapsack.h
│── knapsack.cpp
│── report.h
│── report.cpp
│── vendors.txt
│── report.txt
│── README.md
```

---

# Working Principle

## Step 1

Load all available vendors.

Example:

| Vendor      | Cost  | Value |
| ----------- | ----- | ----- |
| Catering    | 25000 | 95    |
| Decoration  | 18000 | 70    |
| DJ          | 12000 | 50    |
| Photography | 15000 | 65    |
| Games       | 10000 | 40    |

---

## Step 2

User enters the total event budget.

Example

```
Budget = ₹50,000
```

---

## Step 3

Run the Greedy Algorithm.

The algorithm:

* Calculates Value/Cost ratio
* Sorts vendors
* Selects vendors while budget remains

---

## Step 4

Run the Dynamic Programming Algorithm.

The DP algorithm evaluates every valid combination of vendors.

It chooses the combination with the maximum total value while staying within the budget.

---

## Step 5

Backtrack through the DP table.

This determines which vendors were actually selected.

---

## Step 6

Display results.

Example

```
Selected Vendors

✔ Catering
✔ Photography
✔ Games

Total Cost : ₹50,000

Total Value : 200

Remaining Budget : ₹0
```

---

# Dynamic Programming Approach

The project solves the **0/1 Knapsack Problem**.

Each vendor has:

* Cost → Weight
* Value → Profit

The budget represents the maximum capacity.

For every vendor there are two choices:

* Select the vendor
* Skip the vendor

The algorithm chooses whichever gives the greater total value.

Transition Formula:

```
dp[i][w] = max(
    dp[i-1][w],
    value + dp[i-1][w-cost]
)
```

Where:

* i = current vendor
* w = remaining budget

---

# Greedy Approach

The greedy algorithm computes:

```
Ratio = Value / Cost
```

It selects vendors with the highest ratio first.

Although faster, this strategy does **not always produce the optimal solution**, making it a useful comparison baseline.

---

# Time Complexity

## Greedy

Sorting

```
O(n log n)
```

Selection

```
O(n)
```

Overall

```
O(n log n)
```

---

## Dynamic Programming

```
O(n × Budget)
```

Where

* n = number of vendors
* Budget = maximum available budget

---

# Space Complexity

DP Table

```
O(n × Budget)
```

Can be optimized to

```
O(Budget)
```

using a one-dimensional DP array.

---

# Sample Input

```
Budget

50000

Available Vendors

DJ

12000

50

Decoration

18000

70

Photography

15000

65

Games

10000

40

Catering

25000

95
```

---

# Sample Output

```
===========================

EVENT BUDGET REPORT

===========================

Budget

₹50000

Selected Vendors

✔ Catering

✔ Photography

✔ Games

Total Cost

₹50000

Remaining Budget

₹0

Total Value

200

Algorithm

Dynamic Programming
```

---

# Applications

* Wedding Planning
* College Festivals
* Corporate Events
* Conferences
* Hackathons
* Birthday Events
* Cultural Programs
* Community Functions

---

# Learning Outcomes

After completing this project, the following concepts are demonstrated:

* Dynamic Programming
* 0/1 Knapsack Problem
* Greedy Algorithms
* Arrays and Vectors
* Structures in C++
* Sorting
* File Handling
* Algorithm Comparison
* Time and Space Complexity Analysis
* Real-world Optimization Problems

---

# Future Enhancements

* Graphical User Interface (GUI)
* Web-based dashboard
* Vendor categories
* Vendor ratings and reviews
* Bundle discounts
* Multiple event templates
* Database integration
* PDF report generation
* Budget visualization charts
* AI-based vendor recommendations
* Multi-objective optimization considering budget, ratings, and customer preferences

---

# Conclusion

The **Event Budget Planner** demonstrates how a classic Dynamic Programming algorithm can solve a practical budgeting problem. By comparing the optimal 0/1 Knapsack solution with a Greedy Algorithm, the project highlights the importance of choosing appropriate algorithms for optimization tasks. It combines theoretical computer science concepts with a real-world event planning application, making it an excellent project for learning, academic evaluation, hackathons, and technical interviews.
