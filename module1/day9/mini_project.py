"""
Day 9 Mini Project - Addis Bank Network & Priority System

Combines Trees, Graphs, and Heaps into a single console program.

Features:
- Tree for bank branch/employee hierarchy
- Graph to model the customer money-transfer network
- Heap to manage urgent transactions and alerts
- BST to search for customer accounts

Menu options:
1. Add new branch / employee (Tree)
2. Add money transfer connection (Graph)
3. Show all connected customers using BFS/DFS
4. Add urgent transaction (Heap)
5. Process highest priority transaction
6. Search for customer account in BST

Bonus: Big-O time complexity noted next to the major operations.
"""

import heapq
from collections import deque


# ============================================================
# Tree: bank branch / employee hierarchy
# ============================================================


class TreeNode:
    """Generic tree node - O(1) to create, O(1) to add a child."""

    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, child_node):
        # O(1) amortized - appending to a Python list
        self.children.append(child_node)

    def find(self, name):
        """Recursively searches for a node by name.
        Time complexity: O(n) worst case, visiting every node in the tree."""
        if self.name == name:
            return self
        for child in self.children:
            found = child.find(name)
            if found:
                return found
        return None


def print_tree(node, depth=0):
    """Prints the tree. Time complexity: O(n), visits every node once."""
    print("  " * depth + f"- {node.name}")
    for child in node.children:
        print_tree(child, depth + 1)


# ============================================================
# Graph: customer money-transfer network
# ============================================================


class Graph:
    """Undirected graph using an adjacency list.
    add_customer/add_connection: O(1) average (dict + set operations)."""

    def __init__(self):
        self.adjacency_list = {}

    def add_customer(self, name):
        if name not in self.adjacency_list:
            self.adjacency_list[name] = set()

    def add_connection(self, customer_a, customer_b):
        self.add_customer(customer_a)
        self.add_customer(customer_b)
        self.adjacency_list[customer_a].add(customer_b)
        self.adjacency_list[customer_b].add(customer_a)

    def bfs(self, start):
        """Breadth-First Search - explores neighbors level by level.
        Time complexity: O(V + E) where V = customers, E = connections."""
        if start not in self.adjacency_list:
            return []

        visited = set()
        queue = deque([start])
        order = []

        while queue:
            current = queue.popleft()
            if current in visited:
                continue
            visited.add(current)
            order.append(current)
            for neighbor in sorted(self.adjacency_list[current]):
                if neighbor not in visited:
                    queue.append(neighbor)

        return order

    def dfs(self, start, visited=None, order=None):
        """Depth-First Search - explores as far as possible before backtracking.
        Time complexity: O(V + E)."""
        if visited is None:
            visited = set()
        if order is None:
            order = []

        if start not in self.adjacency_list or start in visited:
            return order

        visited.add(start)
        order.append(start)
        for neighbor in sorted(self.adjacency_list[start]):
            if neighbor not in visited:
                self.dfs(neighbor, visited, order)

        return order


# ============================================================
# BST: customer account lookup
# ============================================================


class BSTNode:
    def __init__(self, account_number, owner):
        self.account_number = account_number
        self.owner = owner
        self.left = None
        self.right = None


class AccountBST:
    """Binary Search Tree keyed by account number.
    insert/search: O(log n) average, O(n) worst case (unbalanced tree)."""

    def __init__(self):
        self.root = None

    def insert(self, account_number, owner):
        if self.root is None:
            self.root = BSTNode(account_number, owner)
        else:
            self._insert_recursive(self.root, account_number, owner)

    def _insert_recursive(self, node, account_number, owner):
        if account_number < node.account_number:
            if node.left is None:
                node.left = BSTNode(account_number, owner)
            else:
                self._insert_recursive(node.left, account_number, owner)
        else:
            if node.right is None:
                node.right = BSTNode(account_number, owner)
            else:
                self._insert_recursive(node.right, account_number, owner)

    def search(self, account_number):
        return self._search_recursive(self.root, account_number)

    def _search_recursive(self, node, account_number):
        if node is None:
            return None
        if node.account_number == account_number:
            return node
        elif account_number < node.account_number:
            return self._search_recursive(node.left, account_number)
        else:
            return self._search_recursive(node.right, account_number)


# ============================================================
# Heap: urgent transactions / alerts
# ============================================================


class UrgentTransactionQueue:
    """Max-priority queue built on heapq (a min-heap), using negated
    amounts so the highest amount pops first.
    push: O(log n). pop: O(log n)."""

    def __init__(self):
        self._heap = []

    def push(self, amount, description):
        heapq.heappush(self._heap, (-amount, description))

    def pop_highest_priority(self):
        if not self._heap:
            return None
        amount, description = heapq.heappop(self._heap)
        return -amount, description

    def is_empty(self):
        return len(self._heap) == 0


# ============================================================
# The Bank system - ties everything together
# ============================================================


class AddisBankNetwork:
    def __init__(self):
        self.branch_tree = TreeNode("Head Office")
        self.customer_graph = Graph()
        self.urgent_queue = UrgentTransactionQueue()
        self.account_bst = AccountBST()

    def add_branch_or_employee(self, parent_name, new_name):
        parent_node = self.branch_tree.find(parent_name)
        if parent_node is None:
            print(f"Error: could not find '{parent_name}' in the hierarchy.")
            return
        parent_node.add_child(TreeNode(new_name))
        print(f"Added '{new_name}' under '{parent_name}'.")


def print_menu():
    print("\n===== Addis Bank Network & Priority System =====")
    print("1. Add new branch / employee (Tree)")
    print("2. Add money transfer connection (Graph)")
    print("3. Show all connected customers using BFS/DFS")
    print("4. Add urgent transaction (Heap)")
    print("5. Process highest priority transaction")
    print("6. Search for customer account in BST")
    print("7. View branch hierarchy")
    print("8. Exit")


def run():
    bank = AddisBankNetwork()

    # Seed some starting data so the menu has something to work with
    bole_branch = TreeNode("Bole Branch")
    bole_branch.add_child(TreeNode("Teller"))
    bole_branch.add_child(TreeNode("Loan Officer"))
    bank.branch_tree.add_child(bole_branch)
    bank.branch_tree.add_child(TreeNode("Piassa Branch"))

    bank.account_bst.insert(1001, "Almaz")
    bank.account_bst.insert(1002, "Dawit")
    bank.account_bst.insert(1003, "Tigist")

    while True:
        print_menu()
        choice = input("Choose an option (1-8): ").strip()

        if choice == "1":
            parent_name = input("Parent name (e.g. 'Head Office', 'Bole Branch'): ").strip()
            new_name = input("New branch/employee name: ").strip()
            bank.add_branch_or_employee(parent_name, new_name)

        elif choice == "2":
            customer_a = input("First customer name: ").strip()
            customer_b = input("Second customer name: ").strip()
            bank.customer_graph.add_connection(customer_a, customer_b)
            print(f"Connected '{customer_a}' and '{customer_b}'.")

        elif choice == "3":
            start = input("Start customer for BFS/DFS: ").strip()
            method = input("Method (bfs/dfs): ").strip().lower()
            if method == "bfs":
                result = bank.customer_graph.bfs(start)
            else:
                result = bank.customer_graph.dfs(start)
            print(f"Connected customers ({method}):", result)

        elif choice == "4":
            try:
                amount = float(input("Transaction amount: "))
            except ValueError:
                print("Please enter a valid number.")
                continue
            description = input("Description (e.g. 'Fraud Alert'): ").strip()
            bank.urgent_queue.push(amount, description)
            print(f"Added urgent transaction: ({amount}, '{description}')")

        elif choice == "5":
            if bank.urgent_queue.is_empty():
                print("No urgent transactions in the queue.")
            else:
                amount, description = bank.urgent_queue.pop_highest_priority()
                print(f"Processing highest priority: amount={amount}, description='{description}'")

        elif choice == "6":
            try:
                account_number = int(input("Account number to search: "))
            except ValueError:
                print("Please enter a valid account number.")
                continue
            result = bank.account_bst.search(account_number)
            if result:
                print(f"Found account #{result.account_number} belonging to {result.owner}")
            else:
                print("Account not found.")

        elif choice == "7":
            print("Current branch hierarchy:")
            print_tree(bank.branch_tree)

        elif choice == "8":
            print("Thank you for using Addis Bank Network & Priority System. Goodbye!")
            break

        else:
            print("Invalid option, please choose 1-8.")


if __name__ == "__main__":
    run()
