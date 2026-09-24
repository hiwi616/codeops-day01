# Day 3 — Collections, Files & Errors

Python exercises covering lists/tuples, dictionaries, sets, list comprehension, modules, file I/O, error handling, and a menu-driven mini project.

## Files

- **`day3_level1.py`** — Level 1 (Basic): lists & tuples, dictionaries, sets.
- **`utils.py`** — small module exporting `add_tax(price, rate=0.15)`, used by both `main.py` and `day3_level2.py`.
- **`main.py`** — imports and uses `add_tax` from `utils.py` (Exercise 7).
- **`day3_level2.py`** — Level 2 (Intermediate): list operations, dictionary operations, list comprehension, and modules & import.
- **`day3_level3.py`** — Level 3 (Advanced): file reading/writing (`students.txt`) with a missing-file check, and error handling (`ValueError`, `ZeroDivisionError`, `finally`).
- **`day3_mini_project.py`** — **Inventory Manager**: a menu-driven console program using a dictionary to store `product: quantity` pairs, with add/update/view/save/load/exit options.

## Run

```bash
python3 day3_level1.py
python3 main.py
python3 day3_level2.py
python3 day3_level3.py
python3 day3_mini_project.py   # interactive menu
```

Note: `day3_level2.py`, `day3_level3.py`, and `day3_mini_project.py` prompt for input, so run them in a terminal where you can type responses.
