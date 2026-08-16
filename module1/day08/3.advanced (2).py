# ==========================================
# Exercise 6: Recursive Problems
# ==========================================

def reverse_string(s):
    """Recursively reverses a string."""
    # Base case: empty string or single character
    if len(s) <= 1:
        return s
    # Recursive case: last character + reverse of the rest
    return s[-1] + reverse_string(s[:-1])


def count_occurrences(arr, target):
    """Recursively counts occurrences of target in a list."""
    # Base case: empty list
    if not arr:
        return 0
    # Check if first element matches target (1 if match, 0 if not)
    match = 1 if arr[0] == target else 0
    # Recursive case: match + count in rest of list
    return match + count_occurrences(arr[1:], target)


# ==========================================
# Exercise 7: Sorting Comparison
# ==========================================

def selection_sort_with_stats(arr):
    """Selection Sort tracking comparisons and swaps."""
    data = arr.copy()
    comparisons = 0
    swaps = 0
    n = len(data)

    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            comparisons += 1
            if data[j] < data[min_idx]:
                min_idx = j
        if min_idx != i:
            data[i], data[min_idx] = data[min_idx], data[i]
            swaps += 1

    return data, comparisons, swaps


def insertion_sort_with_stats(arr):
    """Insertion Sort tracking comparisons and swaps."""
    data = arr.copy()
    comparisons = 0
    swaps = 0

    for i in range(1, len(data)):
        key = data[i]
        j = i - 1
        while j >= 0:
            comparisons += 1
            if data[j] > key:
                data[j + 1] = data[j]
                swaps += 1
                j -= 1
            else:
                break
        data[j + 1] = key

    return data, comparisons, swaps


# ==========================================
# Exercise 8: Two Pointer Technique
# ==========================================

def two_sum_sorted(arr, target):
    """
    Finds two numbers in a SORTED array that sum to target.
    Returns tuple of numbers (a, b) or None if not found.
    """
    left = 0
    right = len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]

        if current_sum == target:
            return arr[left], arr[right]
        elif current_sum < target:
            left += 1  # Need a larger sum
        else:
            right -= 1  # Need a smaller sum

    return None


# --- Testing advanced.py ---
if __name__ == "__main__":
    print("--- 6. Recursive String & Count ---")
    print("Reversed 'hello':", reverse_string("hello"))  # Output: 'olleh'
    sample_items = [1, 3, 7, 3, 3, 5]
    print("Occurrences of 3:", count_occurrences(sample_items, 3))  # Output: 3

    print("\n--- 7. Sorting Comparison ---")
    test_arr = [29, 10, 14, 37, 14, 85, 12, 1]
    sel_res, sel_comp, sel_swaps = selection_sort_with_stats(test_arr)
    ins_res, ins_comp, ins_swaps = insertion_sort_with_stats(test_arr)

    print(f"Selection Sort -> Comparisons: {sel_comp}, Swaps: {sel_swaps}")
    print(f"Insertion Sort -> Comparisons: {ins_comp}, Swaps: {ins_swaps}")

    print("\n--- 8. Two Pointer Technique ---")
    sorted_numbers = [2, 7, 11, 15, 20]
    target_val = 26
    pair = two_sum_sorted(sorted_numbers, target_val)
    print(f"Two numbers adding to {target_val}:", pair)  # Output: (11, 15)