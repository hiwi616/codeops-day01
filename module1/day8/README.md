# Day 8 — DSA II: Recursion, Searching & Sorting

Python exercises covering recursion, linear/binary search, and sorting algorithms, culminating in a menu-driven mini project.

## Files

- **`basic.py`** — Recursion basics (`factorial`, recursive vs iterative), recursion with lists (`sum_list`), linear search, binary search (with an explanation of why it needs a sorted array), and Bubble Sort (printing the array after each pass).
- **`advanced.py`** — Recursive string reversal, recursive counting of list occurrences, a Selection Sort vs Insertion Sort comparison (with comparison/swap counts), and the Two Pointer technique for finding a pair that sums to a target in a sorted array.
- **`mini_project.py`** — **Bank Transaction Analyzer**: a menu-driven console app for Addis Bank that stores transactions (amount, date, type), calculates total balance recursively, sorts transactions by amount or date (Insertion Sort), searches by amount (linear search on unsorted data, binary search after sorting), and includes a bonus recursive report generator for transactions above a given threshold.

## Run

```bash
python3 basic.py
python3 advanced.py
python3 mini_project.py   # interactive menu
```

`mini_project.py` prompts for input at several menu options, so run it in a terminal where you can type responses.
