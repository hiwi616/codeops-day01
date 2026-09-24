# day4_level3.py

# 7. Full Bank Account with Properties
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance  # Make balance private

    @property
    def balance(self):
        return self.__balance  # Read-only balance property

    @balance.setter
    def balance(self, amount):
        if amount < 0:
            raise ValueError("Balance cannot be negative")
        self.__balance = amount

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Insufficient funds")

    def transfer(self, to_account, amount):
        if amount <= self.__balance:
            self.withdraw(amount)
            to_account.deposit(amount)
        else:
            print("Insufficient funds for transfer")

# Create a BankAccount object and test methods
account1 = BankAccount("Frank", 500)
account2 = BankAccount("Grace", 300)

account1.deposit(200)
print(f"Account1 Balance: {account1.balance}")
account1.withdraw(100)
print(f"Account1 Balance after withdrawal: {account1.balance}")

account1.transfer(account2, 250)
print(f"Account1 Balance after transfer: {account1.balance}")
print(f"Account2 Balance after receiving transfer: {account2.balance}")


# 8. Library System
class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.available = True  # Initially available

class Library:
    def __init__(self):
        self.books = []  # List to hold books

    def add_book(self, book):
        self.books.append(book)  # Add book to library

    def borrow_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn and book.available:
                book.available = False  # Mark as borrowed
                return f"You borrowed '{book.title}'"
        return "Book not available"

    def return_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn and not book.available:
                book.available = True  # Mark as returned
                return f"You returned '{book.title}'"
        return "Book not found or was not borrowed"

# Create a Library object and test add, borrow & return methods.
library = Library()
book1 = Book("1984", "George Orwell", "123456789")
library.add_book(book1)

print(library.borrow_book("123456789"))  # Borrowing a book
print(library.borrow_book("123456789"))  # Trying to borrow again
print(library.return_book("123456789"))   # Returning the book
print(library.borrow_book("123456789"))   # Borrowing again after return


# 9. Car Class with Encapsulation
class Car:
    def __init__(self):
        self.__speed = 0   # Private speed attribute
        self.__fuel = 100   # Private fuel attribute

    @property
    def speed(self):
        return self.__speed

    @property
    def fuel(self):
        return self.__fuel

    def accelerate(self):
        if self.__fuel > 0:
            self.__speed += 10   # Increase speed by 10
            self.__fuel -= 5     # Decrease fuel by some amount
            print(f"Accelerating... Speed: {self.__speed}, Fuel left: {self.__fuel}")
        else:
            print("Out of fuel!")

    def brake(self):
        if self.__speed > 0:
            self.__speed -= 10   # Decrease speed by 10 but not below zero
            print(f"Braking... Speed: {self.__speed}")

    def refuel(self, amount):
        if amount > 0:
            self.__fuel += amount   # Increase fuel by given amount
            print(f"Refueled! Fuel level: {self.__fuel}")

# Create a Car object and test accelerate, brake & refuel methods.
car = Car()
car.accelerate()
car.brake()
car.refuel(20)
