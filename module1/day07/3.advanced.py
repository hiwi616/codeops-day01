"""
Day 7 - Advanced Exercises (Level 3)
DSA I: Linear Structures & Big-O
"""

import time
from collections import deque

# ==============================================================================
# Exercise 9: Performance Comparison
# ==============================================================================
def compare_search_performance():
    print("--- Exercise 9: Performance Comparisons ---")
    size = 100_000
    search_target = size - 1  # Element near the very end for worst-case lookup

    # 1. Search in List vs Dict
    sample_list = list(range(size))
    sample_dict = {i: True for i in range(size)}

    # Time List Search - O(n)
    start_time = time.perf_counter()
    _ = search_target in sample_list
    list_time = time.perf_counter() - start_time

    # Time Dict Search - O(1)
    start_time = time.perf_counter()
    _ = search_target in sample_dict
    dict_time = time.perf_counter() - start_time

    print(f"List search time (O(n)):  {list_time:.6f} seconds")
    print(f"Dict search time (O(1)):  {dict_time:.6f} seconds")

    # 2. Insert 10,000 elements at beginning: List vs Deque
    n_inserts = 10_000

    # List insert at front - O(n) per insert -> Total O(n^2)
    start_time = time.perf_counter()
    lst = []
    for i in range(n_inserts):
        lst.insert(0, i)
    list_insert_time = time.perf_counter() - start_time

    # Deque appendleft - O(1) per insert -> Total O(n)
    start_time = time.perf_counter()
    deq = deque()
    for i in range(n_inserts):
        deq.appendleft(i)
    deque_insert_time = time.perf_counter() - start_time

    print(f"\nList 10k front inserts (O(n^2)):  {list_insert_time:.6f} seconds")
    print(f"Deque 10k front inserts (O(n)):   {deque_insert_time:.6f} seconds")


# ==============================================================================
# Exercise 10: Choose the Right Structure
# ==============================================================================
"""
1. Checking if a username is already taken:
   - Best Structure: Set or Hashmap (Dict)
   - Big-O: O(1) lookup speed.
   - Justification: Fast membership check without scanning all users.

2. Processing tasks in the order they arrive (Customer Support):
   - Best Structure: Queue (collections.deque)
   - Big-O: O(1) enqueue at back, O(1) dequeue from front.
   - Justification: Enforces FIFO (First-In, First-Out) fair ordering.

3. Implementing "Undo" feature in a text editor:
   - Best Structure: Stack (List or deque)
   - Big-O: O(1) push and pop from top.
   - Justification: Enforces LIFO (Last-In, First-Out) so the latest edit is undone first.

4. Storing student IDs for fast lookup:
   - Best Structure: Hashmap (Dict)
   - Big-O: O(1) lookup by ID key.
   - Justification: Maps unique Student ID directly to student records.
"""


# ==============================================================================
# Exercise 11: Linked List vs Array (Removing Middle Element)
# ==============================================================================
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def remove_middle(self):
        """Removes middle node using Fast & Slow pointer approach."""
        if not self.head or not self.head.next:
            self.head = None
            return

        slow = self.head
        fast = self.head
        prev = None

        # Fast moves 2 steps, Slow moves 1 step
        while fast and fast.next:
            fast = fast.next.next
            prev = slow
            slow = slow.next

        # Unlink the slow node (middle)
        if prev:
            prev.next = slow.next

    def to_list(self):
        res = []
        current = self.head
        while current:
            res.append(current.value)
            current = current.next
        return res


def remove_middle_array(arr: list) -> list:
    """Removes the middle element from a Python list."""
    if not arr:
        return arr
    mid_index = len(arr) // 2
    arr.pop(mid_index)  # Removes middle index
    return arr


# ==============================================================================
# TESTING / VERIFYING ALL LEVEL 3 EXERCISES
# ==============================================================================
if __name__ == "__main__":
    compare_search_performance()

    print("\n--- Exercise 11: Removing Middle Element Trade-offs ---")
    # Array approach
    py_list = ["Loza", "Hiwot", "Amanuel", "Kebede", "Almaz"]
    print(f"Original Python List: {py_list}")
    remove_middle_array(py_list)
    print(f"After Middle Removal: {py_list}")

    # Linked List approach
    ll = LinkedList()
    for name in ["Loza", "Hiwot", "Amanuel", "Kebede", "Almaz"]:
        ll.append(name)
    print(f"\nOriginal Linked List: {ll.to_list()}")
    ll.remove_middle()
    print(f"After Middle Removal: {ll.to_list()}")

    """
    Trade-offs Discussion:
    - Python List:
        Finding middle index is O(1) via length/2.
        Removing item requires shifting all remaining elements left: O(n).
    - Linked List:
        Finding middle requires walking pointers (Fast/Slow): O(n).
        Removing node once found is O(1) pointer reassignment.
    """