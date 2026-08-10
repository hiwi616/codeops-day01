# day4_level1.py

# 1. Simple Class – Person
class Person:
    def __init__(self, name, age):
        self.name = name  # Initialize the name attribute
        self.age = age    # Initialize the age attribute

    def introduce(self):
        print(f"Hello, my name is {self.name}.")

# Create 2 Person objects and call introduce() on both
person1 = Person("Alice", 30)
person2 = Person("Bob", 25)

person1.introduce()
person2.introduce()


# 2. Rectangle Class
class Rectangle:
    def __init__(self, length, width):
        self.length = length  # Initialize the length attribute
        self.width = width    # Initialize the width attribute

    def area(self):
        return self.length * self.width  # Calculate area

    def perimeter(self):
        return 2 * (self.length + self.width)  # Calculate perimeter

# Create 2 Rectangle objects and call area() & perimeter() on both
rectangle1 = Rectangle(10, 5)
rectangle2 = Rectangle(7, 3)

print(f"Rectangle 1 Area: {rectangle1.area()}, Perimeter: {rectangle1.perimeter()}")
print(f"Rectangle 2 Area: {rectangle2.area()}, Perimeter: {rectangle2.perimeter()}")


# 3. Bank Account (Basic)
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner  # Initialize the owner attribute
        self.balance = balance  # Initialize the balance attribute

    def deposit(self, amount):
        self.balance += amount  # Increase balance by amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount  # Decrease balance by amount
        else:
            print("Insufficient funds")

# Create an object and test deposits and withdrawals
account = Account("Charlie", 100)
account.deposit(50)
print(f"Balance after deposit: {account.balance}")
account.withdraw(30)
print(f"Balance after withdrawal: {account.balance}")
account.withdraw(150)  # Trying to withdraw more than available
