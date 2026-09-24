# 🏦 Addis Bank Management System

A Python-based banking system designed to demonstrate **Object-Oriented Programming, Design Patterns, Data Structures, Algorithms, and Graph Traversal**.

The project simulates a bank with different account types, transactions, branches, account registries, transfer relationships, and notifications.

---

## 📌 Project Overview

The **Addis Bank Management System** models a simplified banking environment where users can:

- Create different types of bank accounts
- Deposit and withdraw money
- Transfer money between accounts
- Undo the most recent transaction
- Earn interest through savings accounts
- Use overdraft facilities through current accounts
- Track transaction history
- Receive transaction notifications
- Maintain audit logs
- Organize accounts using a branch hierarchy
- Search and sort accounts efficiently
- Calculate bank statistics
- Represent account transfers as a graph
- Use BFS to find reachable accounts

The project also demonstrates several software design patterns, including **Singleton, Observer, and Factory**.

---

## 🎯 Learning Objectives

This project was built to practice:

- Object-Oriented Programming (OOP)
- Encapsulation
- Inheritance
- Polymorphism
- Abstract classes
- Design patterns
- Recursion
- Binary search
- Sorting
- Hash tables / dictionaries
- Trees
- Graphs
- Breadth-First Search (BFS)
- Transaction history management
- Type hints
- Exception handling
- Time and space complexity

---

## 🧱 Main Components

### 1. BankConfig — Singleton Pattern

`BankConfig` stores shared bank configuration such as:

- Bank name
- Interest rate
- Overdraft limit
- Minimum balance

The **Singleton Pattern** ensures that only one configuration instance exists throughout the application.

```python
config1 = BankConfig()
config2 = BankConfig()

print(config1 is config2)
# True
```

---

### 2. Observer Pattern — Notification System

The system uses the **Observer Pattern** to notify observers whenever an account performs a transaction.

Two observers are implemented:

#### 📱 SMSAlert

Displays transaction information such as:

- Account number
- Transaction type
- Transaction amount
- New balance
- Overdraft warning

#### 📋 AuditLog

Records transaction information including:

- Timestamp
- Account number
- Account type
- Owner
- Transaction type
- Amount
- New balance
- Overdraft status

Observers can be subscribed or unsubscribed from an account.

```python
account.subscribe(SMSAlert())
account.subscribe(AuditLog())
```

---

## 💳 Account Classes

### Standard Account

The base `Account` class provides:

- Owner information
- Account number
- Private balance
- Deposit
- Withdrawal
- Transfer
- Transaction history
- Undo functionality

The balance is encapsulated using a private attribute.

```python
self.__balance
```

---

### 💰 SavingsAccount

`SavingsAccount` inherits from `Account`.

It adds an interest rate and allows interest to be added to the account.

```python
interest = savings.add_interest()
```

The default interest rate comes from `BankConfig`, unless a custom rate is supplied.

---

### 🏦 CurrentAccount

`CurrentAccount` also inherits from `Account`.

It supports overdrafts up to a specified limit.

For example:

```text
Balance: 500 ETB
Overdraft Limit: 1500 ETB

Maximum available withdrawal: 2000 ETB
```

---

## 🏭 Factory Pattern

`AccountFactory` is responsible for creating different account types.

Instead of directly creating each class, the factory can be used:

```python
account = AccountFactory.create(
    "savings",
    "Bob Smith",
    "S2001",
    2000,
    rate=0.04
)
```

Supported account types:

- `standard`
- `savings`
- `current`

This makes account creation centralized and easier to manage.

---

## ↩️ Transaction Undo

Accounts maintain a transaction history.

Supported operations include:

- Deposit
- Withdrawal
- Transfer
- Undo

The `undo_last()` method reverses the most recent transaction.

Example:

```python
account.deposit(500)

account.undo_last()
```

The transaction is marked as reversed and a reversal record is added to the history.

---

## 🌳 Branch Hierarchy — Tree Data Structure

The `Branch` class represents the bank's organizational structure as a **tree**.

The example hierarchy contains:

```text
Head Office
├── North Region
│   ├── Addis Ababa
│   │   ├── Piassa
│   │   └── Bole
│   ├── Bahir Dar
│   └── Gondar
│
├── South Region
│   ├── Hawassa
│   └── Arba Minch
│
├── East Region
│   ├── Dire Dawa
│   │   ├── Kebele 01
│   │   └── Kebele 02
│   └── Harar
│
└── West Region
    ├── Jimma
    └── Nekemte
```

The tree supports operations such as:

- Adding child branches
- Adding accounts
- Calculating total balance
- Counting accounts
- Getting all accounts
- Finding the deepest branch
- Generating branch summaries
- Printing the hierarchy

The total balance and account count are calculated recursively.

---

## 📚 Account Registry

`AccountRegistry` provides centralized account management.

It uses a dictionary for efficient account lookup:

```python
self.by_number = {}
```

It also maintains insertion order separately.

### Supported Operations

```python
registry.add(account)
registry.find(number)
registry.find_by_number(number)
registry.list_all()
registry.remove(number)
registry.count()
```

The registry also supports:

- Top accounts by balance
- Bottom accounts by balance
- Total transaction calculations
- Bank statistics

---

## 🔎 Searching Algorithms

### Dictionary Lookup

```python
registry.find("A1001")
```

Uses dictionary lookup for approximately **O(1)** average-time access.

### Binary Search

The project also implements binary search over sorted account numbers.

```python
binary_search(sorted_numbers, target)
```

Binary search operates in:

**O(log n)** time.

---

## 🔃 Sorting

The registry can find accounts with the highest or lowest balances.

### Top Accounts

```python
registry.top_by_balance(5)
```

### Bottom Accounts

```python
registry.bottom_by_balance(5)
```

Python's `sorted()` function is used with a key based on account balance.

---

## 🔁 Recursion

The project uses recursion to calculate the total transaction amount for an account.

```python
recursive_total_transactions(history)
```

It processes the transaction history one item at a time until it reaches the end.

Recursion is also used by the branch tree for:

- Total balance
- Account count
- Account collection
- Tree depth

---

## 🔗 Transfer Graph

Transfers between accounts are represented using a **graph**.

For example:

```text
Alice → Bob
Bob → Carol
Carol → David
David → Eve
Eve → Frank
```

The graph is represented using an adjacency-list-style dictionary:

```python
{
    "A1001": ["S2001"],
    "S2001": ["C3001"],
    "C3001": ["S2002"]
}
```

This allows the system to represent relationships between accounts.

---

## 🚶 Breadth-First Search (BFS)

The project implements **Breadth-First Search** to explore the transfer graph.

```python
bfs(transfer_graph, start)
```

BFS can determine which accounts are reachable from a starting account.

The project also includes:

```python
bfs_with_details()
```

which provides:

- Reachable accounts
- Levels
- Traversed edges
- Maximum depth

BFS has a time complexity of approximately:

**O(V + E)**

where:

- `V` = number of accounts
- `E` = number of transfer relationships

---

## 📊 Bank Statistics

The account registry can generate statistics such as:

- Total accounts
- Total balance
- Average balance
- Maximum balance
- Minimum balance
- Number of accounts by type
- Total transactions

Example:

```python
statistics = registry.get_statistics()
```

---

## 🧪 Demonstration

The project includes a demonstration that creates a complete bank structure.

It:

1. Creates multiple accounts
2. Adds them to the account registry
3. Builds the branch hierarchy
4. Assigns accounts to branches
5. Performs transfers
6. Builds the transfer graph
7. Uses graph traversal to analyze relationships

The demonstration contains **15 sample accounts** across standard, savings, and current account types.

---

## 🛠️ Technologies Used

- **Python 3**
- Object-Oriented Programming
- Abstract Base Classes
- Type Hints
- Collections
- `deque`
- Dictionaries
- Lists
- Tuples
- Sets
- Recursion
- Binary Search
- Sorting
- Trees
- Graphs
- BFS
- Design Patterns

---

## 📁 Project Structure

```text
day09/
│
├── bank_model.py
└── README.md
```

### `bank_model.py`

Contains the complete banking system, including:

- `BankConfig`
- `Observer`
- `SMSAlert`
- `AuditLog`
- `Account`
- `SavingsAccount`
- `CurrentAccount`
- `AccountFactory`
- `Branch`
- `AccountRegistry`
- Search algorithms
- Recursive functions
- Transfer graph
- BFS
- Demonstration code

---

## ▶️ How to Run

Make sure Python is installed.

From the project directory, run:

```bash
python bank_model.py
```

On some systems, you may need:

```bash
python3 bank_model.py
```

The program will display the creation of accounts, branch hierarchy, transfers, and other banking operations in the terminal.

---

## 🧠 Key Concepts Practiced

| Concept            | Where It Is Used                      |
| ------------------ | ------------------------------------- |
| Encapsulation      | Private account balance               |
| Inheritance        | `SavingsAccount` and `CurrentAccount` |
| Polymorphism       | Different account behaviors           |
| Abstraction        | `Observer` abstract class             |
| Singleton          | `BankConfig`                          |
| Observer           | `SMSAlert`, `AuditLog`                |
| Factory            | `AccountFactory`                      |
| Dictionary         | Account registry                      |
| Recursion          | Branch calculations and transactions  |
| Binary Search      | Account number search                 |
| Sorting            | Balance ranking                       |
| Tree               | Bank branch hierarchy                 |
| Graph              | Account transfers                     |
| BFS                | Transfer graph traversal              |
| Exception Handling | Invalid transactions                  |
| Type Hints         | Function and collection annotations   |

---

## 📌 Conclusion

This mini-project combines multiple Python programming concepts into one practical banking application. It demonstrates how **OOP, design patterns, data structures, and algorithms** can work together to build a more organized and maintainable system.

The main goal is not to create a production banking application, but to practice and understand how these programming concepts can be applied together in a realistic problem domain.
