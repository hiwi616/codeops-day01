"""
Day 8 Mini Project - Bank Transaction Analyzer

For the console app of Addis Bank, demonstrates recursion, searching,
and sorting.

Features:
- Stores a list of transactions (amount, date, type)
- Recursive function to calculate total balance
- Sort transactions by amount or date
- Search for transactions:
    - Linear search for unsorted data
    - Binary search after sorting
- Bonus: recursive report generator (transactions above a threshold)
"""

from datetime import datetime


# ============================================================
# Sample transaction data
# ============================================================
# Each transaction is a dict: {"amount": float, "date": "YYYY-MM-DD", "type": "deposit"/"withdrawal"}

transactions = [
    {"amount": 1500, "date": "2026-01-05", "type": "deposit"},
    {"amount": 300, "date": "2026-01-10", "type": "withdrawal"},
    {"amount": 4200, "date": "2026-02-01", "type": "deposit"},
    {"amount": 750, "date": "2026-02-15", "type": "withdrawal"},
    {"amount": 2100, "date": "2026-03-03", "type": "deposit"},
    {"amount": 900, "date": "2026-03-20", "type": "withdrawal"},
    {"amount": 3300, "date": "2026-04-02", "type": "deposit"},
]


# ============================================================
# Recursive total balance calculator
# ============================================================


def calculate_total_balance(txns):
    """Recursively sums transaction amounts.
    Deposits add to the balance, withdrawals subtract.
    Base case: empty list -> balance of 0."""
    if not txns:
        return 0

    first = txns[0]
    amount = first["amount"] if first["type"] == "deposit" else -first["amount"]
    return amount + calculate_total_balance(txns[1:])


# ============================================================
# Sorting transactions
# ============================================================


def insertion_sort_by_key(txns, key):
    """Insertion Sort is a good fit here since transaction lists are
    usually small-to-medium and often nearly sorted already (e.g. new
    transactions appended in date order) - insertion sort performs
    well on nearly-sorted data."""
    sorted_txns = txns.copy()

    for i in range(1, len(sorted_txns)):
        current = sorted_txns[i]
        j = i - 1
        while j >= 0 and sorted_txns[j][key] > current[key]:
            sorted_txns[j + 1] = sorted_txns[j]
            j -= 1
        sorted_txns[j + 1] = current

    return sorted_txns


def sort_by_amount(txns):
    return insertion_sort_by_key(txns, "amount")


def sort_by_date(txns):
    return insertion_sort_by_key(txns, "date")


# ============================================================
# Searching transactions
# ============================================================


def linear_search_by_amount(txns, target_amount):
    """Works on unsorted data - checks each transaction one by one."""
    for index, txn in enumerate(txns):
        if txn["amount"] == target_amount:
            return index
    return -1


def binary_search_by_amount(sorted_txns, target_amount):
    """Requires txns to already be sorted by amount."""
    low, high = 0, len(sorted_txns) - 1

    while low <= high:
        mid = (low + high) // 2
        mid_amount = sorted_txns[mid]["amount"]

        if mid_amount == target_amount:
            return mid
        elif mid_amount < target_amount:
            low = mid + 1
        else:
            high = mid - 1

    return -1


# ============================================================
# Bonus: recursive report generator
# ============================================================


def transactions_above_threshold(txns, threshold):
    """Recursively builds a list of transactions with amount > threshold."""
    if not txns:
        return []

    first = txns[0]
    rest_result = transactions_above_threshold(txns[1:], threshold)

    if first["amount"] > threshold:
        return [first] + rest_result
    return rest_result


# ============================================================
# Console menu
# ============================================================


def print_menu():
    print("\n===== Addis Bank Transaction Analyzer =====")
    print("1. View all transactions")
    print("2. Calculate total balance (recursive)")
    print("3. Sort transactions by amount")
    print("4. Sort transactions by date")
    print("5. Search for a transaction by amount (linear search)")
    print("6. Search for a transaction by amount (binary search, sorted first)")
    print("7. Report: transactions above a threshold (recursive, bonus)")
    print("8. Exit")


def print_transactions(txns):
    if not txns:
        print("No transactions to show.")
        return
    for txn in txns:
        print(f" - {txn['date']} | {txn['type']:<10} | {txn['amount']} ETB")


def run():
    global transactions

    while True:
        print_menu()
        choice = input("Choose an option (1-8): ").strip()

        if choice == "1":
            print_transactions(transactions)

        elif choice == "2":
            balance = calculate_total_balance(transactions)
            print(f"Total balance: {balance} ETB")

        elif choice == "3":
            transactions = sort_by_amount(transactions)
            print("Transactions sorted by amount:")
            print_transactions(transactions)

        elif choice == "4":
            transactions = sort_by_date(transactions)
            print("Transactions sorted by date:")
            print_transactions(transactions)

        elif choice == "5":
            try:
                amount = float(input("Enter amount to search for: "))
            except ValueError:
                print("Please enter a valid number.")
                continue
            index = linear_search_by_amount(transactions, amount)
            if index == -1:
                print("Transaction not found.")
            else:
                print(f"Found at index {index}: {transactions[index]}")

        elif choice == "6":
            try:
                amount = float(input("Enter amount to search for: "))
            except ValueError:
                print("Please enter a valid number.")
                continue
            sorted_txns = sort_by_amount(transactions)
            index = binary_search_by_amount(sorted_txns, amount)
            if index == -1:
                print("Transaction not found.")
            else:
                print(f"Found at index {index} (in amount-sorted list): {sorted_txns[index]}")

        elif choice == "7":
            try:
                threshold = float(input("Enter threshold amount: "))
            except ValueError:
                print("Please enter a valid number.")
                continue
            report = transactions_above_threshold(transactions, threshold)
            print(f"Transactions above {threshold} ETB:")
            print_transactions(report)

        elif choice == "8":
            print("Thank you for using Addis Bank Transaction Analyzer. Goodbye!")
            break

        else:
            print("Invalid option, please choose 1-8.")


if __name__ == "__main__":
    run()
