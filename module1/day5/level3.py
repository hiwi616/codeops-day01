from abc import ABC, abstractmethod


# ==========================================
# Level 3 - Exercise 7
# Full Account Hierarchy
# ==========================================

# Parent class
class Account(ABC):

    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance

    # @property lets us READ the balance
    @property
    def balance(self):
        return self._balance

    # Deposit money
    def deposit(self, amount):
        self._balance += amount

    # Every child must create its own withdraw()
    @abstractmethod
    def withdraw(self, amount):
        pass

    # Every child must create its own calculate_interest()
    @abstractmethod
    def calculate_interest(self):
        pass

    # Basic statement
    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")


# ==========================================
# SavingsAccount
# ==========================================

class SavingsAccount(Account):

    def __init__(self, owner, balance, interest_rate):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    # SavingsAccount withdraw
    def withdraw(self, amount):
        if amount <= self.balance:
            self._balance -= amount
            print(f"Withdrawn: {amount}")
        else:
            print("Insufficient balance.")

    # Calculate interest
    def calculate_interest(self):
        return self.balance * self.interest_rate

    # Add interest
    def add_interest(self):
        interest = self.calculate_interest()
        self.deposit(interest)

    # Override statement
    def statement(self):
        print("=== Savings Account ===")
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")
        print(f"Interest Rate: {self.interest_rate * 100}%")


# ==========================================
# CurrentAccount
# ==========================================

class CurrentAccount(Account):

    def __init__(self, owner, balance, overdraft_limit):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    # CurrentAccount withdraw
    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft_limit:
            self._balance -= amount
            print(f"Withdrawn: {amount}")
        else:
            print("Overdraft limit exceeded!")

    # CurrentAccount has no interest
    def calculate_interest(self):
        return 0

    # Override statement
    def statement(self):
        print("=== Current Account ===")
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")
        print(f"Overdraft Limit: {self.overdraft_limit}")


# ==========================================
# TEST THE PROGRAM
# ==========================================

savings = SavingsAccount("Bura", 1000, 0.05)
current = CurrentAccount("Sara", 1500, 500)


print("SAVINGS ACCOUNT")
savings.statement()

print("\nAdding interest...")
savings.add_interest()

savings.statement()

print("\n--------------------")

print("CURRENT ACCOUNT")
current.statement()

print("\nWithdrawing 1800...")
current.withdraw(1800)

current.statement()