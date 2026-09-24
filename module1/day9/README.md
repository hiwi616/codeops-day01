# Day 9 — DSA III: Trees, Graphs & Heaps

Python exercises covering trees, binary search trees, graphs, and heaps, culminating in a menu-driven mini project.

## Files

- **`basic.py`** — Tree basics (`TreeNode`, a bank branch hierarchy, and a `print_tree` function), a Binary Search Tree (insert + search for 40/100), Graph basics (a customer money-transfer network using an adjacency list), and Heap basics (`heapq` used as a priority queue for urgent transactions).
- **`mini_project.py`** — **Addis Bank Network & Priority System**: combines all four structures into one console app —
  - **Tree** for the branch/employee hierarchy
  - **Graph** (with BFS and DFS) for the customer money-transfer network
  - **Heap** (max-priority queue) for urgent transactions and alerts
  - **BST** for customer account lookup by account number

  Each major operation is commented with its Big-O time complexity (bonus requirement).

## Run

```bash
python3 basic.py
python3 mini_project.py   # interactive menu
```

`mini_project.py` prompts for input at several menu options, so run it in a terminal where you can type responses. It comes pre-seeded with a small branch hierarchy (Bole Branch, Piassa Branch) and three sample accounts (1001-1003) so the menu has data to work with right away.
