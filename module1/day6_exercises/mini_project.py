"""
Day 6 Mini Project - Clean Addis Bank System

A menu-driven console program demonstrating SOLID principles and
Design Patterns together:

- AccountFactory        -> creates account types from user input
- BankConfig (Singleton) -> manages bank-wide rules (interest rate, overdraft limit)
- Observer pattern       -> large withdrawals trigger SMS alert + audit log
- SOLID applied throughout (especially S, O, D)
- Bonus feature: "apply interest to all accounts" added without breaking
  existing code (OCP in action)
- Basic input validation and error handling included
"""

from abc import ABC, abstractmethod


# ============================================================
# Singleton: BankConfig
# ============================================================


class BankConfig:
    """Single source of truth for bank-wide rules."""

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


# ============================================================
# Observer Pattern: notifications on large transactions
# ============================================================


class Observer(ABC):
    @abstractmethod
    def update(self, message: str):
        ...


class SMSAlert(Observer):
    def update(self, message: str):
        print(f"  [SMS Alert] {message}")


class AuditLog(Observer):
    def __init__(self):
        self.entries = []

    def update(self, message: str):
        self.entries.append(message)
        print(f"  [Audit Log] {message}")

    def print_all(self):
        if not self.entries:
            print("No audit entries yet.")
            return
        for entry in self.entries:
            print(f" - {entry}")


# ============================================================
# Accounts (SRP: only account-related logic lives here)
# ============================================================


class BaseAccount(ABC):
    LARGE_WITHDRAWAL_THRESHOLD = 3000

    def __init__(self, owner: str, number: str, balance: float):
        self.owner = owner
        self.number = number
        self.balance = balance
        self._observers: list[Observer] = []

    def subscribe(self, observer: Observer):
        self._observers.append(observer)

    def _notify_all(self, message: str):
        for observer in self._observers:
            observer.update(message)

    @abstractmethod
    def account_type(self) -> str:
        ...

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")

        config = BankConfig()
        min_allowed_balance = -config.overdraft_limit

        if self.balance - amount < min_allowed_balance:
            raise ValueError(
                f"Withdrawal exceeds overdraft limit of {config.overdraft_limit} ETB"
            )

        self.balance -= amount

        if amount > self.LARGE_WITHDRAWAL_THRESHOLD:
            self._notify_all(
                f"Large withdrawal of {amount} ETB by {self.owner} (Acc: {self.number})"
            )


class InterestBearing(ABC):
    """ISP: only account types that actually earn interest implement this."""

    @abstractmethod
    def apply_interest(self):
        ...


class SavingsAccount(BaseAccount, InterestBearing):
    def account_type(self) -> str:
        return "Savings Account"

    def apply_interest(self):
        config = BankConfig()
        interest = self.balance * config.interest_rate
        self.balance += interest
        return interest


class CurrentAccount(BaseAccount):
    """No interest methods - by design (ISP)."""

    def account_type(self) -> str:
        return "Current Account"


class FixedDepositAccount(BaseAccount, InterestBearing):
    def account_type(self) -> str:
        return "Fixed Deposit Account"

    def apply_interest(self):
        config = BankConfig()
        # Fixed deposits earn a bit more than regular savings
        interest = self.balance * (config.interest_rate + 0.02)
        self.balance += interest
        return interest


# Bonus feature demo: InvestmentAccount added later without touching
# any of the classes above (OCP).
class InvestmentAccount(BaseAccount):
    def __init__(self, owner, number, balance, risk_level="medium"):
        super().__init__(owner, number, balance)
        self.risk_level = risk_level

    def account_type(self) -> str:
        return f"Investment Account ({self.risk_level} risk)"


# ============================================================
# Factory Pattern: AccountFactory
# ============================================================


class AccountFactory:
    @staticmethod
    def create(kind: str, owner: str, number: str, balance: float, **kwargs) -> BaseAccount:
        kind = kind.lower().strip()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        elif kind == "fixed":
            return FixedDepositAccount(owner, number, balance)
        elif kind == "investment":
            return InvestmentAccount(owner, number, balance, risk_level=kwargs.get("risk_level", "medium"))
        else:
            raise ValueError(f"Unknown account type: {kind}")


# ============================================================
# The Bank - orchestrates accounts, ties patterns together
# ============================================================


class AddisBank:
    def __init__(self):
        self.accounts: dict[str, BaseAccount] = {}
        self.audit_log = AuditLog()
        self._next_id = 1

    def _generate_account_number(self) -> str:
        number = f"ADB{self._next_id:04d}"
        self._next_id += 1
        return number

    def open_account(self, kind: str, owner: str, balance: float, **kwargs) -> BaseAccount:
        number = self._generate_account_number()
        account = AccountFactory.create(kind, owner, number, balance, **kwargs)
        account.subscribe(SMSAlert())
        account.subscribe(self.audit_log)
        self.accounts[number] = account
        return account

    def find_account(self, number: str) -> BaseAccount:
        account = self.accounts.get(number)
        if not account:
            raise ValueError(f"No account found with number {number}")
        return account

    def apply_interest_to_all(self):
        """Bonus feature - added without breaking any existing code,
        thanks to the InterestBearing (ISP) abstraction and OCP design."""
        applied = []
        for account in self.accounts.values():
            if isinstance(account, InterestBearing):
                interest = account.apply_interest()
                applied.append((account.number, account.owner, interest))
        return applied

    def list_accounts(self):
        return list(self.accounts.values())


# ============================================================
# Console UI (menu-driven)
# ============================================================


def print_menu():
    print("\n===== Clean Addis Bank System =====")
    print("1. Open a new account")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. View all accounts")
    print("5. Apply interest to all eligible accounts")
    print("6. View audit log")
    print("7. Exit")


def prompt_float(message: str) -> float:
    while True:
        try:
            return float(input(message))
        except ValueError:
            print("Please enter a valid number.")


def run():
    bank = AddisBank()
    print(f"Bank-wide interest rate: {BankConfig().interest_rate * 100}%")
    print(f"Overdraft limit: {BankConfig().overdraft_limit} ETB")

    while True:
        print_menu()
        choice = input("Choose an option (1-7): ").strip()

        if choice == "1":
            kind = input("Account type (savings / current / fixed / investment): ").strip()
            owner = input("Owner name: ").strip()
            balance = prompt_float("Initial balance: ")
            try:
                if kind.lower() == "investment":
                    risk = input("Risk level (low/medium/high): ").strip() or "medium"
                    account = bank.open_account(kind, owner, balance, risk_level=risk)
                else:
                    account = bank.open_account(kind, owner, balance)
                print(f"Opened {account.account_type()} #{account.number} for {account.owner}")
            except ValueError as e:
                print(f"Error: {e}")

        elif choice == "2":
            number = input("Account number: ").strip()
            amount = prompt_float("Deposit amount: ")
            try:
                account = bank.find_account(number)
                account.deposit(amount)
                print(f"New balance: {account.balance}")
            except ValueError as e:
                print(f"Error: {e}")

        elif choice == "3":
            number = input("Account number: ").strip()
            amount = prompt_float("Withdrawal amount: ")
            try:
                account = bank.find_account(number)
                account.withdraw(amount)
                print(f"New balance: {account.balance}")
            except ValueError as e:
                print(f"Error: {e}")

        elif choice == "4":
            accounts = bank.list_accounts()
            if not accounts:
                print("No accounts yet.")
            for acc in accounts:
                print(f"#{acc.number} | {acc.account_type()} | {acc.owner} | Balance: {acc.balance}")

        elif choice == "5":
            results = bank.apply_interest_to_all()
            if not results:
                print("No interest-bearing accounts found.")
            for number, owner, interest in results:
                print(f"Applied {interest:.2f} ETB interest to {owner}'s account #{number}")

        elif choice == "6":
            bank.audit_log.print_all()

        elif choice == "7":
            print("Thank you for using Clean Addis Bank System. Goodbye!")
            break

        else:
            print("Invalid option, please choose 1-7.")


if __name__ == "__main__":
    run()
