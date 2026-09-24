# Parent class
class Vehicle:
    def __init__(self, name, model, year):
        self.name = name
        self.model = model
        self.year = year

    def info(self):
        print(f"Name: {self.name}")
        print(f"Model: {self.model}")
        print(f"Year: {self.year}")


# Child class
class Car(Vehicle):
    def __init__(self, name, model, year, doors):
        super().__init__(name, model, year)
        self.doors = doors

    def drive(self):
        print(f"{self.name} is driving with {self.doors} doors.")


# Child class
class Motorcycle(Vehicle):
    def __init__(self, name, model, year, engine_cc):
        super().__init__(name, model, year)
        self.engine_cc = engine_cc

    def ride(self):
        print(f"{self.name} has a {self.engine_cc}cc engine.")


# Create objects
car = Car("Toyota", "Corolla", 2022, 4)
bike = Motorcycle("Yamaha", "R15", 2023, 155)

# Test
car.info()
car.drive()

print("----------------")

bike.info()
bike.ride()

# ==============================
# SavingsAccount Inheritance
# ==============================


# Parent class
class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
        else:
            print("Insufficient balance.")

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")


# Child class
class SavingsAccount(Account):
    def __init__(self, owner, balance, interest_rate):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self.balance * self.interest_rate
        self.deposit(interest)


# ==============================
# Test the program
# ==============================

savings = SavingsAccount("Hiwot", 1000, 0.05)

print("Before interest:")
savings.statement()

savings.add_interest()

print("\nAfter interest:")
savings.statement()


# ==============================
# currentAccount Inheritance
# ==============================

# Parent class
class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")


# Child class
class CurrentAccount(Account):
    def __init__(self, owner, balance, overdraft_limit):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    # Override the withdraw() method
    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft_limit:
            self.balance -= amount
            print(f"Withdrawn: {amount}")
        else:
            print("Overdraft limit exceeded!")


# Test the CurrentAccount
current = CurrentAccount("Birtukan", 1000, 500)

current.statement()

current.withdraw(1200)   # Allowed
current.statement()

current.withdraw(400)    # Not allowed
current.statement()