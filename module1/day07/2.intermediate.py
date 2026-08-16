"""
Day 7 - Intermediate Exercises (Level 2)
DSA I: Linear Structures & Big-O
"""

from collections import deque

# ==============================================================================
# Exercise 5: Big-O Analysis
# ==============================================================================


# Time Complexity: O(n) - Linear Time
# Why: We iterate through the list of numbers exactly once from start to finish.
def find_max(numbers: list) -> int:
  if not numbers:
    return None
  max_val = numbers[0]
  for num in numbers:
    if num > max_val:
      max_val = num
  return max_val


# Time Complexity: O(n^2) - Quadratic Time
# Why: For every element in the list, we loop through the entire list again (nested loops).
def print_all_pairs(items: list):
  for i in items:
    for j in items:
      print(f"({i}, {j})", end=" ")
  print()


# ==============================================================================
# Exercise 6: Linked List Basics
# ==============================================================================


class Node:

  def __init__(self, value):
    self.value = value
    self.next = None  # Pointer to the next node


class LinkedList:

  def __init__(self):
    self.head = None

  def append(self, value):
    """Adds a new node to the end of the chain - O(n) without tail pointer."""
    new_node = Node(value)
    if not self.head:
      self.head = new_node
      return

    current = self.head
    while current.next:
      current = current.next
    current.next = new_node

  def print_list(self):
    """Walks through the chain from head to end and prints values."""
    current = self.head
    elements = []
    while current:
      elements.append(str(current.value))
      current = current.next
    print(" -> ".join(elements) + " -> None")


# ==============================================================================
# Exercise 7: Stack (LIFO - Last In, First Out)
# ==============================================================================


class Stack:

  def __init__(self):
    self._items = []

  def push(self, item):
    """Add item to top - O(1)"""
    self._items.append(item)

  def pop(self):
    """Remove and return top item - O(1)"""
    if self.is_empty():
      raise IndexError("Pop from an empty stack")
    return self._items.pop()

  def peek(self):
    """View top item without removing - O(1)"""
    if self.is_empty():
      return None
    return self._items[-1]

  def is_empty(self) -> bool:
    return len(self._items) == 0


def reverse_string(text: str) -> str:
  stack = Stack()
  # Push all characters onto the stack
  for char in text:
    stack.push(char)

  # Pop all characters off to reverse order (LIFO)
  reversed_chars = []
  while not stack.is_empty():
    reversed_chars.append(stack.pop())

  return "".join(reversed_chars)


# ==============================================================================
# Exercise 8: Queue (FIFO - First In, First Out)
# ==============================================================================


class Queue:

  def __init__(self):
    # collections.deque gives O(1) popleft and append operations
    self._items = deque()

  def enqueue(self, item):
    """Join the back of the queue - O(1)"""
    self._items.append(item)

  def dequeue(self):
    """Leave from the front of the queue - O(1)"""
    if self.is_empty():
      raise IndexError("Dequeue from an empty queue")
    return self._items.popleft()

  def is_empty(self) -> bool:
    return len(self._items) == 0


# ==============================================================================
# TESTING / VERIFYING ALL LEVEL 2 EXERCISES
# ==============================================================================
if __name__ == "__main__":
  print("--- Exercise 5: Big-O Analysis ---")
  nums = [12, 45, 2, 99, 23]
  print(f"Max number in {nums}: {find_max(nums)} (O(n))")
  print("Pairs of [1, 2, 3] (O(n^2)):")
  print_all_pairs([1, 2, 3])

  print("\n--- Exercise 6: Linked List Basics ---")
  ll = LinkedList()
  ll.append("Acc-001 (Loza)")
  ll.append("Acc-002 (Hiwot)")
  ll.append("Acc-003 (Amanuel)")
  print("Linked list elements:")
  ll.print_list()

  print("\n--- Exercise 7: Stack String Reversal ---")
  original_text = "Addis Ababa"
  reversed_text = reverse_string(original_text)
  print(f"Original : '{original_text}'")
  print(f"Reversed : '{reversed_text}'")

  print("\n--- Exercise 8: Queue Bank Simulation ---")
  bank_queue = Queue()
  bank_queue.enqueue("Customer 1: Loza")
  bank_queue.enqueue("Customer 2: Hiwot")
  bank_queue.enqueue("Customer 3: Amanuel")

  print("Serving bank customers in order (FIFO):")
  while not bank_queue.is_empty():
    served_customer = bank_queue.dequeue()
    print(f"🔔 Serving {served_customer}")