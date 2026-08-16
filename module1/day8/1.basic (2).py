# ==========================================
# Exercise 1: Recursion Basics (Factorial)
# ==========================================

def factorial_recursive(n):
    """Calculates factorial using recursion."""
    # Base case: factorial of 0 or 1 is 1
    if n <= 1:
        return 1
    # Recursive case: n * factorial of (n - 1)
    return n * factorial_recursive(n - 1)


def factorial_iterative(n):
    """Calculates factorial using a loop (for comparison)."""
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result


# ==========================================
# Exercise 2: Recursion with Lists
# ==========================================

def sum_list(numbers):
    """Recursively calculates the sum of all numbers in a list."""
    # Base case: empty list sum is 0
    if not numbers:
        return 0
    # Recursive case: first element + sum of the remaining elements
    return numbers[0] + sum_list(numbers[1:])


# ==========================================
# Exercise 3: Linear Search
# ==========================================

def linear_search(arr, target):
    """
    Searches for target in arr sequentially.
    Returns index if found, else -1.
    """
    for index in range(len(arr)):
        if arr[index] == target:
            return index  # Target found
    return -1  # Target not found in the list


# --- Testing basic.py ---
if __name__ == "__main__":
    print("--- 1. Factorial ---")
    print("Recursive 5!:", factorial_recursive(5))  # Output: 120
    print("Iterative 5!:", factorial_iterative(5))  # Output: 120

    print("\n--- 2. Sum List ---")
    nums = [10, 20, 30, 40]
    print("Sum of list:", sum_list(nums))  # Output: 100

    print("\n--- 3. Linear Search ---")
    sample_list = [4, 2, 9, 7, 1]
    print("Index of 7:", linear_search(sample_list, 7))  # Output: 3
    print("Index of 5:", linear_search(sample_list, 5))  # Output: -1