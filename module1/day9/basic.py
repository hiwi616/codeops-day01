import heapq

# ==========================================
# 1. TREE BASICS
# ==========================================
class TreeNode:
    """Represents a node in a generic bank hierarchy tree."""
    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, child_node):
        """Adds a child node to the current node."""
        self.children.append(child_node)

    def print_tree(self, level=0):
        """Recursively prints the tree hierarchy with indentation."""
        indent = "  " * level
        print(f"{indent}- {self.name}")
        for child in self.children:
            child.print_tree(level + 1)

print("--- 1. TREE BASICS ---")
head_office = TreeNode("Head Office")

# Bole Branch & Staff
bole = TreeNode("Bole Branch")
bole.add_child(TreeNode("Teller"))
bole.add_child(TreeNode("Loan Officer"))

# Piassa Branch
piassa = TreeNode("Piassa Branch")

# Assemble hierarchy
head_office.add_child(bole)
head_office.add_child(piassa)

# Print tree structure
head_office.print_tree()
print()


# ==========================================
# 2. BINARY SEARCH TREE (BST)
# ==========================================
class BSTNode:
    """Represents a single node in a Binary Search Tree."""
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    """Binary Search Tree enforcing left < parent <= right."""
    def __init__(self):
        self.root = None

    def insert(self, value):
        """Inserts a value into the BST - O(log n) average time complexity."""
        if not self.root:
            self.root = BSTNode(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = BSTNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = BSTNode(value)
            else:
                self._insert_recursive(node.right, value)

    def search(self, value):
        """Searches for a value in the BST - O(log n) average time complexity."""
        return self._search_recursive(self.root, value)

    def _search_recursive(self, node, value):
        if node is None:
            return False
        if node.value == value:
            return True
        if value < node.value:
            return self._search_recursive(node.left, value)
        return self._search_recursive(node.right, value)

print("--- 2. BINARY SEARCH TREE ---")
bst = BinarySearchTree()
values_to_insert = [50, 30, 70, 20, 40, 60]

for val in values_to_insert:
    bst.insert(val)

print("Searching for 40:", bst.search(40))   # Expected: True
print("Searching for 100:", bst.search(100)) # Expected: False
print()


# ==========================================
# 3. GRAPH BASICS
# ==========================================
class CustomerGraph:
    """Represents a money transfer network using an adjacency list."""
    def __init__(self):
        self.adj_list = {}

    def add_customer(self, customer):
        """Adds a customer vertex if not present - O(1) time complexity."""
        if customer not in self.adj_list:
            self.adj_list[customer] = []

    def add_transfer(self, sender, receiver):
        """Adds a money transfer edge between sender and receiver - O(1) time complexity."""
        self.add_customer(sender)
        self.add_customer(receiver)
        self.adj_list[sender].append(receiver)

    def print_graph(self):
        """Prints all customer connections."""
        for customer, connections in self.adj_list.items():
            print(f"{customer} -> {', '.join(connections) if connections else 'None'}")

print("--- 3. GRAPH BASICS ---")
bank_graph = CustomerGraph()
customers = ["Almaz", "Dawit", "Tigist", "Hanna"]

for c in customers:
    bank_graph.add_customer(c)

bank_graph.add_transfer("Almaz", "Dawit")
bank_graph.add_transfer("Dawit", "Tigist")
bank_graph.add_transfer("Tigist", "Hanna")
bank_graph.add_transfer("Almaz", "Hanna")

bank_graph.print_graph()
print()


# ==========================================
# 4. HEAP BASICS
# ==========================================
print("--- 4. HEAP BASICS ---")
# Priority Queue (Min-Heap): Lowest number = highest priority
priority_queue = []

# Push items with (priority_score, description)
# O(log n) per push operation
heapq.heappush(priority_queue, (5000, "Big Loan"))
heapq.heappush(priority_queue, (200, "Small Deposit"))
heapq.heappush(priority_queue, (10000, "Fraud Alert"))

# Pop highest priority item (smallest priority number)
# O(log n) time complexity
highest_priority = heapq.heappop(priority_queue)
print("Popped Highest Priority Item:", highest_priority)
# Note: (200, 'Small Deposit') comes out first as 200 is the minimum numerical key!