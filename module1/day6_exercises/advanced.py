"""
Day 6 Exercises - SOLID Principles & Design Patterns
Advanced Level

Covers:
9. Full SOLID refactoring of a "god class" Account
10. Combine Factory + Observer + Singleton
11. Refactoring challenge - adding InvestmentAccount
"""

from abc import ABC, abstractmethod


# ============================================================
# 9. Full SOLID Refactoring
# ============================================================
# BEFORE: a "god class" that does everything - balance, notifications,
# persistence, interest calculation, logging - all mixed together.
#
# class GodAccount:
#     def __init__(self, owner, balance):
#         self.owner = owner
#         self.balance = balance
#
#     def withdraw(self, amount):
#         self.balance -= amount
#         print(f"Emailing {self.owner}...")       # notification logic
#         print(f"Saving to database...")          # persistence logic
#         print(f"Logging transaction...")         # audit logic
#
#     def apply_interest(self):
#         self.balance *= 1.05                     # interest logic, hardcoded rate

# AFTER: responsibilities split across small, focused classes that
# depend on abstractions and can be extended without modification.


class Notifier(ABC):
    @abstractmethod
    def notify(self, message: str):
        ...


class EmailNotifier(Notifier):
    def notify(self, message: str):
        print(f"[Email] {message}")


class Repository(ABC):
    @abstractmethod
    def save(self, account: "Account"):
        ...


class InMemoryRepository(Repository):
    def save(self, account: "Account"):
        print(f"[DB] Saved account {account.number}, balance: {account.balance}")


class InterestStrategy(ABC):
    """Strategy pattern piece - lets interest calculation vary
    independently, satisfying OCP for interest rules."""

    @abstractmethod
    def calculate(self, balance: float) -> float:
        ...


class FixedRateInterest(InterestStrategy):
    def __init__(self, rate: float):
        self.rate = rate

    def calculate(self, balance: float) -> float:
        return balance * self.rate


class Account:
    """SRP: only manages balance and core account operations.
    DIP: depends on Notifier/Repository/InterestStrategy abstractions,
    all injected from outside rather than constructed internally."""

    def __init__(
        self,
        number: str,
        owner: str,
        balance: float,
        notifier: Notifier,
        repository: Repository,
        interest_strategy: InterestStrategy = None,
    ):
        self.number = number
        self.owner = owner
        self.balance = balance
        self.notifier = notifier
        self.repository = repository
        self.interest_strategy = interest_strategy

    def withdraw(self, amount: float):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        self.repository.save(self)
        self.notifier.notify(f"{self.owner} withdrew {amount}. Balance: {self.balance}")

    def apply_interest(self):
        if not self.interest_strategy:
            return
        interest = self.interest_strategy.calculate(self.balance)
        self.balance += interest
        self.repository.save(self)
        self.notifier.notify(f"Interest of {interest} applied to {self.owner}'s account")


def demo_full_refactor():
    print("\n--- Full SOLID Refactoring Demo ---")
    account = Account(
        number="ACC900",
        owner="Hana",
        balance=5000,
        notifier=EmailNotifier(),
        repository=InMemoryRepository(),
        interest_strategy=FixedRateInterest(0.05),
    )
    account.withdraw(1000)
    account.apply_interest()


# ============================================================
# 10. Combine Factory + Observer + Singleton
# ============================================================


class BankConfig:
    """Singleton - only one instance manages bank-wide rules
    (interest rate, overdraft limit) for the whole app."""

    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


class Observer(ABC):
    @abstractmethod
    def update(self, message: str):
        ...


class SMSAlert(Observer):
    def update(self, message: str):
        print(f"[SMS Alert] {message}")


class AuditLog(Observer):
    def update(self, message: str):
        print(f"[Audit Log] {message}")


class BankAccount:
    """Combines Observer (transaction alerts) with values pulled
    from the BankConfig singleton."""

    LARGE_WITHDRAWAL_THRESHOLD = 3000

    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance
        self._observers: list[Observer] = []

    def subscribe(self, observer: Observer):
        self._observers.append(observer)

    def _notify_all(self, message: str):
        for observer in self._observers:
            observer.update(message)

    def withdraw(self, amount):
        config = BankConfig()  # same singleton instance every time
        min_allowed_balance = -config.overdraft_limit

        if self.balance - amount < min_allowed_balance:
            raise ValueError("Withdrawal exceeds overdraft limit")

        self.balance -= amount
        if amount > self.LARGE_WITHDRAWAL_THRESHOLD:
            self._notify_all(f"Large withdrawal of {amount} ETB by {self.owner}!")


class BankAccountFactory:
    """Factory for creating BankAccount instances."""

    @staticmethod
    def create(owner: str, number: str, balance: float) -> BankAccount:
        return BankAccount(owner, number, balance)


def demo_combined_patterns():
    print("\n--- Factory + Observer + Singleton Demo ---")
    config1 = BankConfig()
    config2 = BankConfig()
    print("Same singleton instance?", config1 is config2)
    print(f"Bank-wide interest rate: {config1.interest_rate}, overdraft limit: {config1.overdraft_limit}")

    account = BankAccountFactory.create(owner="Dawit", number="ACC777", balance=2000)
    account.subscribe(SMSAlert())
    account.subscribe(AuditLog())

    account.withdraw(500)   # normal withdrawal, no alert
    account.withdraw(4000)  # exceeds overdraft AND is large - should raise before notifying
    # Note: this second call intentionally goes over the overdraft limit
    # to demonstrate the validation; see the try/except version below.


def demo_combined_patterns_safe():
    print("\n--- Factory + Observer + Singleton Demo (with error handling) ---")
    account = BankAccountFactory.create(owner="Dawit", number="ACC777", balance=5000)
    account.subscribe(SMSAlert())
    account.subscribe(AuditLog())

    account.withdraw(500)   # normal withdrawal, no alert
    account.withdraw(4000)  # large withdrawal, triggers observers

    try:
        account.withdraw(10000)  # exceeds overdraft limit
    except ValueError as e:
        print(f"Withdrawal blocked: {e}")


# ============================================================
# 11. Refactoring Challenge - Add InvestmentAccount
# ============================================================
# Thanks to OCP + the Factory pattern, adding a new account type
# does NOT require modifying BankAccount, BankConfig, or any
# existing account classes - we just add a new class and register
# it in the factory.


class InvestmentAccount(BankAccount):
    """New account type - inherits all existing withdraw/observer
    behavior for free, and adds its own investment-specific logic."""

    def __init__(self, owner, number, balance, risk_level="medium"):
        super().__init__(owner, number, balance)
        self.risk_level = risk_level

    def invest(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds to invest")
        self.balance -= amount
        print(f"{self.owner} invested {amount} ETB at {self.risk_level} risk.")


class ExtendedAccountFactory(BankAccountFactory):
    """Extends the factory to support the new account type -
    existing 'create' behavior for regular accounts is untouched (OCP)."""

    @staticmethod
    def create(owner: str, number: str, balance: float, kind: str = "regular", **kwargs) -> BankAccount:
        if kind == "investment":
            return InvestmentAccount(owner, number, balance, risk_level=kwargs.get("risk_level", "medium"))
        return BankAccountFactory.create(owner, number, balance)


def demo_investment_account():
    print("\n--- Refactoring Challenge: InvestmentAccount Demo ---")
    investment_acc = ExtendedAccountFactory.create(
        owner="Liya", number="INV001", balance=10000, kind="investment", risk_level="high"
    )
    investment_acc.subscribe(SMSAlert())
    investment_acc.invest(4000)
    investment_acc.withdraw(1000)  # inherited behavior, still works


if __name__ == "__main__":
    demo_full_refactor()
    demo_combined_patterns_safe()
    demo_investment_account()
