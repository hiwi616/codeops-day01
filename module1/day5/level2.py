# Day 5 - Level 2
# Exercises 4, 5, and 6

from abc import ABC, abstractmethod


# ==========================================
# Exercise 4 + Exercise 6
# Parent class: Account
# ==========================================

class Account(ABC):

    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    # Deposit money
    def deposit(self, amount):
        self.balance += amount

    # Basic statement
    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")

    # Exercise 6:
    # Every child class MUST implement this method
    @abstractmethod
    def calculate_interest(self):
        pass


# ==========================================
# SavingsAccount
# ==========================================

class SavingsAccount(Account):

    def __init__(self, owner, balance, interest_rate):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    # Exercise 4:
    # Override statement() to show interest rate
    def statement(self):
        print("=== Savings Account ===")
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")
        print(f"Interest Rate: {self.interest_rate * 100}%")

    # Exercise 6:
    # Implement calculate_interest()
    def calculate_interest(self):
        return self.balance * self.interest_rate


# ==========================================
# CurrentAccount
# ==========================================

class CurrentAccount(Account):

    def __init__(self, owner, balance, overdraft_limit):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    # Exercise 4:
    # Override statement() to show overdraft info
    def statement(self):
        print("=== Current Account ===")
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")
        print(f"Overdraft Limit: {self.overdraft_limit}")

    # Exercise 6:
    # Implement calculate_interest()
    def calculate_interest(self):
        return 0


# ==========================================
# Exercise 5: Polymorphism Practice
# ==========================================

# Create different account objects
savings = SavingsAccount("Birtukan", 2000, 0.05)
current = CurrentAccount("Sara", 1500, 500)

# Put them in ONE list
accounts = [savings, current]

# Loop through the list
for acc in accounts:

    # Deposit 100
    acc.deposit(100)

    # Show statement
    acc.statement()

    # Show interest
    print(f"Interest: {acc.calculate_interest()}")

    print("--------------------")