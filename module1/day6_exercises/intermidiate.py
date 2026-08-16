"""
Day 6 Exercises - SOLID Principles & Design Patterns
Intermediate Level

Covers:
1. SRP + DIP applied to Account
2. Factory Pattern (AccountFactory)
3. Observer Pattern (withdraw notifications)
4. Interface Segregation Principle (ISP)
"""

from abc import ABC, abstractmethod


# ============================================================
# 1. Apply SRP + DIP
# ============================================================
# Account only handles account-related logic (balance, deposit, withdraw).
# Persistence and notification are separate classes, injected into
# Account rather than created inside it (Dependency Injection).


class Notifier(ABC):
    """Abstraction for sending notifications - DIP: Account depends on this,
    not on a concrete notifier implementation."""

    @abstractmethod
    def notify(self, message: str):
        ...


class EmailNotifier(Notifier):
    def notify(self, message: str):
        print(f"[Email] {message}")


class SMSNotifier(Notifier):
    def notify(self, message: str):
        print(f"[SMS] {message}")


class Repository(ABC):
    """Abstraction for persistence - Account doesn't care HOW it's saved."""

    @abstractmethod
    def save(self, account: "Account"):
        ...


class InMemoryRepository(Repository):
    """A simple in-memory 'database' for demo purposes."""

    def __init__(self):
        self.storage = {}

    def save(self, account: "Account"):
        self.storage[account.number] = account.balance
        print(f"[Repository] Saved account {account.number} with balance {account.balance}")


class Account:
    """Only responsible for account logic: balance, deposit, withdraw.
    Notification and persistence are injected dependencies (DIP)."""

    def __init__(self, number, owner, balance, notifier: Notifier, repository: Repository):
        self.number = number
        self.owner = owner
        self.balance = balance
        self.notifier = notifier
        self.repository = repository

    def deposit(self, amount):
        self.balance += amount
        self.repository.save(self)
        self.notifier.notify(f"{self.owner} deposited {amount}. New balance: {self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        self.repository.save(self)
        self.notifier.notify(f"{self.owner} withdrew {amount}. New balance: {self.balance}")


def demo_srp_dip():
    print("\n--- SRP + DIP Demo ---")
    account = Account(
        number="ACC001",
        owner="Selam",
        balance=1000,
        notifier=EmailNotifier(),
        repository=InMemoryRepository(),
    )
    account.deposit(500)
    account.withdraw(200)


# ============================================================
# 2. Factory Pattern
# ============================================================


class BaseAccount(ABC):
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance

    @abstractmethod
    def account_type(self) -> str:
        ...


class SavingsAccount(BaseAccount):
    def account_type(self) -> str:
        return "Savings Account"


class CurrentAccount(BaseAccount):
    def account_type(self) -> str:
        return "Current Account"


class FixedDepositAccount(BaseAccount):
    def account_type(self) -> str:
        return "Fixed Deposit Account"


class AccountFactory:
    """Centralizes creation logic - callers don't need to know
    which concrete class to instantiate."""

    @staticmethod
    def create(kind: str, owner: str, number: str, balance: float) -> BaseAccount:
        kind = kind.lower()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        elif kind == "fixed":
            return FixedDepositAccount(owner, number, balance)
        else:
            raise ValueError(f"Unknown account kind: {kind}")


def demo_factory():
    print("\n--- Factory Pattern Demo ---")
    for kind in ["savings", "current", "fixed"]:
        acc = AccountFactory.create(kind, owner="Abebe", number=f"ACC-{kind}", balance=1000)
        print(f"Created {acc.account_type()} for {acc.owner} with balance {acc.balance}")


# ============================================================
# 3. Observer Pattern
# ============================================================


class Observer(ABC):
    @abstractmethod
    def update(self, message: str):
        ...


class SMSAlert(Observer):
    def update(self, message: str):
        print(f"[SMS Alert] {message}")


class AuditLog(Observer):
    def __init__(self):
        self.log = []

    def update(self, message: str):
        self.log.append(message)
        print(f"[Audit Log] Recorded: {message}")


class ObservableAccount:
    """Account with an Observer system - notifies subscribers
    when a large withdrawal happens."""

    LARGE_WITHDRAWAL_THRESHOLD = 3000

    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance
        self._observers: list[Observer] = []

    def subscribe(self, observer: Observer):
        self._observers.append(observer)

    def _notify_all(self, message: str):
        for observer in self._observers:
            observer.update(message)

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        if amount > self.LARGE_WITHDRAWAL_THRESHOLD:
            self._notify_all(f"Large withdrawal of {amount} ETB by {self.owner}!")


def demo_observer():
    print("\n--- Observer Pattern Demo ---")
    account = ObservableAccount(owner="Kebede", balance=10000)
    account.subscribe(SMSAlert())
    account.subscribe(AuditLog())

    account.withdraw(1000)  # below threshold, no alert
    account.withdraw(5000)  # above threshold, triggers observers


# ============================================================
# 4. Interface Segregation Principle (ISP)
# ============================================================
# InterestBearing is a small, focused interface. Only account types
# that actually earn interest implement it - CurrentAccount is not
# forced to implement interest methods it doesn't need.


class InterestBearing(ABC):
    @abstractmethod
    def apply_interest(self, rate: float):
        ...


class SavingsAccountISP(BaseAccount, InterestBearing):
    def account_type(self) -> str:
        return "Savings Account"

    def apply_interest(self, rate: float):
        interest = self.balance * rate
        self.balance += interest
        print(f"Applied {rate * 100}% interest to {self.owner}'s savings: +{interest}")


class CurrentAccountISP(BaseAccount):
    """Does NOT implement InterestBearing - current accounts don't earn interest,
    and ISP means we shouldn't force it to have a meaningless apply_interest()."""

    def account_type(self) -> str:
        return "Current Account"


def demo_isp():
    print("\n--- ISP Demo ---")
    savings = SavingsAccountISP(owner="Marta", number="SAV001", balance=2000)
    savings.apply_interest(0.05)

    current = CurrentAccountISP(owner="Yonas", number="CUR001", balance=1500)
    print(f"{current.owner}'s current account has no interest methods - by design.")


if __name__ == "__main__":
    demo_srp_dip()
    demo_factory()
    demo_observer()
    demo_isp()
