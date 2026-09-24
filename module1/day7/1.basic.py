"""
Day 7 - Basic Exercises (Level 1)
DSA I: Linear Structures & Big-O
"""

# ==============================================================================
# Exercise 1: Big-O Notation Identification
# ==============================================================================
"""
Time Complexities for standard Python operations:
1. Accessing an element in a Python list by index: O(1) [Constant Time]
   - Why: Python lists are contiguous arrays; index calculation jumps straight to memory address.

2. Searching for an element in a list using 'in': O(n) [Linear Time]
   - Why: Python must check items one by one from start to end in the worst case.

3. Inserting at the beginning of a list: O(n) [Linear Time]
   - Why: Every single existing element after index 0 has to shift one position right.

4. Dictionary lookup by key: O(1) [Constant Time]
   - Why: Hash functions compute the exact bucket index directly from the key.
"""

# ==============================================================================
# Exercise 2: Compare Complexities
# Ranking from FASTEST to SLOWEST for large n (e.g., n = 1,000,000):
# ==============================================================================
"""
Fastest  --->  Slowest:
1. O(1)      - Constant (Instant lookup)
2. O(log n)  - Logarithmic (e.g., Binary Search, cuts problem in half)
3. O(n)      - Linear (Scanning through items)
4. O(n^2)    - Quadratic (Nested loops, 1,000,000 x 1,000,000 operations)
"""

# ==============================================================================
# Exercise 3: Arrays / Lists Operations
# ==============================================================================
print("--- Exercise 3: Arrays / Lists ---")

# Create a list of 10 student names
students = [
    "Abebe",
    "Kebede",
    "Almaz",
    "Chala",
    "Tigist",
    "Dawit",
    "Marta",
    "Beni",
    "Sami",
    "Yonas",
]

# 1. Accessing by index - O(1)
first_student = students[0]
print(f"First student (index 0): {first_student}")

# 2. Adding at the end (Append) - O(1) amortized
students.append("Solomon")
print(f"After adding at end: {students}")

# 3. Inserting at position 0 - O(n)
students.insert(0, "Loza")
print(f"After inserting at position 0: {students}")


# ==============================================================================
# Exercise 4: Hashmaps (Dictionaries) Operations
# ==============================================================================
print("\n--- Exercise 4: Hashmaps (Dictionaries) ---")

# Create dictionary with 5 students and their grades
student_grades = {
    "Abebe": 85,
    "Kebede": 90,
    "Almaz": 78,
    "Chala": 92,
    "Tigist": 88,
}

# 1. Add a new student - O(1)
student_grades["Dawit"] = 95
print(f"Added Dawit: {student_grades}")

# 2. Update a grade - O(1)
student_grades["Almaz"] = 82
print(f"Updated Almaz's grade: {student_grades}")

# 3. Check if a student exists (fast lookup) - O(1)
search_name = "Chala"
if search_name in student_grades:  # O(1) key membership check
  print(
      f"✅ Fast lookup: {search_name} exists with grade"
      f" {student_grades[search_name]}."
  )
else:
  print(f"❌ {search_name} not found.")