"""
Day 6 Exercises - SOLID Principles & Design Patterns
Basic Level

Covers:
1. Single Responsibility Principle (SRP)
2. Open/Closed Principle (OCP)
3. Liskov Substitution Principle (LSP)
4. Identifying SOLID violations
"""


# ============================================================
# 1. Single Responsibility Principle (SRP)
# ============================================================
# BEFORE (violates SRP): one class doing salary calc, file saving,
# and email sending all at once - three separate reasons to change.
#
# class Employee:
#     def __init__(self, name, hours_worked, hourly_rate):
#         self.name = name
#         self.hours_worked = hours_worked
#         self.hourly_rate = hourly_rate
#
#     def calculate_salary(self):
#         return self.hours_worked * self.hourly_rate
#
#     def save_to_file(self):
#         with open(f"{self.name}.txt", "w") as f:
#             f.write(f"Salary: {self.calculate_salary()}")
#
#     def send_email(self):
#         print(f"Emailing payslip to {self.name}...")

# AFTER (follows SRP): each class has exactly one responsibility.


class Employee:
    """Only holds employee data - name and hours/rate needed for pay."""

    def __init__(self, name, hours_worked, hourly_rate):
        self.name = name
        self.hours_worked = hours_worked
        self.hourly_rate = hourly_rate


class SalaryCalculator:
    """Responsible only for calculating salary."""

    @staticmethod
    def calculate(employee: Employee) -> float:
        return employee.hours_worked * employee.hourly_rate


class EmployeeFileSaver:
    """Responsible only for persisting employee data to a file."""

    @staticmethod
    def save_to_file(employee: Employee, salary: float):
        with open(f"{employee.name}.txt", "w") as f:
            f.write(f"Employee: {employee.name}\nSalary: {salary}")


class EmployeeEmailer:
    """Responsible only for sending emails."""

    @staticmethod
    def send_payslip_email(employee: Employee, salary: float):
        print(f"Emailing payslip of {salary} ETB to {employee.name}...")


def demo_srp():
    print("\n--- SRP Demo ---")
    emp = Employee("Selam", hours_worked=160, hourly_rate=50)
    salary = SalaryCalculator.calculate(emp)
    EmployeeFileSaver.save_to_file(emp, salary)
    EmployeeEmailer.send_payslip_email(emp, salary)
    print(f"{emp.name}'s salary: {salary} ETB")


# ============================================================
# 2. Open/Closed Principle (OCP)
# ============================================================
# BEFORE (violates OCP): every new employee type means editing
# this function directly.
#
# def calculate_bonus(employee_type):
#     if employee_type == "manager":
#         return 5000
#     elif employee_type == "developer":
#         return 3000
#     elif employee_type == "intern":
#         return 500
#     # Adding a new type means changing this function again.

# AFTER (follows OCP): open for extension (new subclasses),
# closed for modification (no need to touch existing code).


class BonusPolicy:
    """Base bonus policy - subclasses define their own bonus amount."""

    def get_bonus(self) -> float:
        raise NotImplementedError("Subclasses must implement get_bonus()")


class ManagerBonus(BonusPolicy):
    def get_bonus(self) -> float:
        return 5000


class DeveloperBonus(BonusPolicy):
    def get_bonus(self) -> float:
        return 3000


class InternBonus(BonusPolicy):
    def get_bonus(self) -> float:
        return 500


# Adding a new employee type (e.g. "TeamLeadBonus") no longer requires
# touching any existing class - just add a new subclass.
class TeamLeadBonus(BonusPolicy):
    def get_bonus(self) -> float:
        return 4000


def calculate_bonus(policy: BonusPolicy) -> float:
    """Works with any BonusPolicy subclass without modification."""
    return policy.get_bonus()


def demo_ocp():
    print("\n--- OCP Demo ---")
    for policy in [ManagerBonus(), DeveloperBonus(), InternBonus(), TeamLeadBonus()]:
        print(f"{policy.__class__.__name__}: {calculate_bonus(policy)} ETB bonus")


# ============================================================
# 3. Liskov Substitution Principle (LSP)
# ============================================================
# BEFORE (violates LSP): Penguin is a Bird but can't fly, so
# make_bird_fly(bird) breaks when passed a Penguin.
#
# class Bird:
#     def fly(self):
#         print("Flying high!")
#
# class Penguin(Bird):
#     def fly(self):
#         raise Exception("Penguins can't fly!")
#
# def make_bird_fly(bird):
#     bird.fly()  # crashes for Penguin

# AFTER (follows LSP): separate flying ability from being a bird,
# so any Bird subtype can be safely substituted.


class Bird:
    """Base class for all birds - no flying assumption here."""

    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating.")


class FlyingBird(Bird):
    """Only birds that can actually fly implement this."""

    def fly(self):
        print(f"{self.name} is flying high!")


class Sparrow(FlyingBird):
    pass


class Penguin(Bird):
    """Penguin is a Bird, but NOT a FlyingBird - no broken fly() method."""

    def swim(self):
        print(f"{self.name} is swimming instead of flying.")


def make_bird_fly(bird: FlyingBird):
    """Safe to call on any FlyingBird - no risk of a crash."""
    bird.fly()


def demo_lsp():
    print("\n--- LSP Demo ---")
    sparrow = Sparrow("Sparrow")
    penguin = Penguin("Penguin")

    make_bird_fly(sparrow)  # works fine
    # make_bird_fly(penguin)  # would be a type error - Penguin is not a FlyingBird
    penguin.swim()  # penguins do what penguins actually do


# ============================================================
# 4. Identify SOLID Violations
# ============================================================
# class Account:
#     def __init__(self):
#         self.notifier = EmailNotifier()
#
#     def withdraw(self, amount):
#         ...
#         self.notifier.send_email(...)
#         self.save_to_db(...)
#
# Violations:
# - SRP (Single Responsibility Principle): Account is responsible for
#   account logic AND notification AND persistence (save_to_db) - three
#   reasons to change in one class.
# - DIP (Dependency Inversion Principle): Account directly creates and
#   depends on a concrete EmailNotifier class instead of depending on
#   an abstraction (e.g. a Notifier interface). This makes it hard to
#   swap in SMSNotifier or PushNotifier later without editing Account.
# - OCP (Open/Closed Principle, as a side effect of the above): to
#   support a new notification method, you'd have to modify Account's
#   internals rather than just plugging in a new notifier.


if __name__ == "__main__":
    demo_srp()
    demo_ocp()
    demo_lsp()
