# ==========================================
# Exercise 4: Binary Search
# ==========================================

def binary_search(arr, target):
    """
    Searches for target in a SORTED array using divide and conquer.
    Returns index if found, else -1.

    WHY IT NEEDS A SORTED ARRAY:
    Binary Search depends on knowing whether the target is larger or smaller
    than the middle element. If the array isn't sorted, eliminating half of 
    the array could accidentally throw away the target!
    """
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        # Check if mid is the target
        if arr[mid] == target:
            return mid
        # If target is greater, ignore left half
        elif arr[mid] < target:
            left = mid + 1
        # If target is smaller, ignore right half
        else:
            right = mid - 1

    return -1


# ==========================================
# Exercise 5: Bubble Sort
# ==========================================

def bubble_sort(arr):
    """
    Sorts an array in ascending order using Bubble Sort
    and prints the array after each full pass.
    """
    n = len(arr)
    # Copy array so we don't modify the original during testing
    arr_copy = arr.copy()

    for i in range(n):
        swapped = False
        print(f"\nPass {i + 1}:")

        for j in range(0, n - i - 1):
            if arr_copy[j] > arr_copy[j + 1]:
                # Swap neighbors
                arr_copy[j], arr_copy[j + 1] = arr_copy[j + 1], arr_copy[j]
                swapped = True

        print(f"  State: {arr_copy}")
        # If no elements were swapped, array is already sorted
        if not swapped:
            print("  (Array is fully sorted early!)")
            break

    return arr_copy


# --- Testing intermediate.py ---
if __name__ == "__main__":
    print("--- 4. Binary Search ---")
    sorted_arr = [11, 22, 33, 44, 55, 66, 77]
    print("Index of 44:", binary_search(sorted_arr, 44))  # Output: 3
    print("Index of 90:", binary_search(sorted_arr, 90))  # Output: -1

    print("\n--- 5. Bubble Sort ---")
    unsorted_arr = [64, 34, 25, 12, 22, 11, 90]
    sorted_res = bubble_sort(unsorted_arr)
    print("\nFinal Sorted Array:", sorted_res)