# day4_level2.py

# 4. Student Class
class Student:
    def __init__(self, name, student_id):
        self.name = name  # Initialize the name attribute
        self.student_id = student_id  # Initialize the student ID attribute
        self.grades = []  # Initialize an empty list for grades

    def add_grade(self, grade):
        self.grades.append(grade)  # Add grade to the list

    def average_grade(self):
        return sum(self.grades) / len(self.grades) if self.grades else 0  # Calculate average

# Create a student object, add several grades, and print the average
student = Student("David", "S123")
student.add_grade(85)
student.add_grade(90)
student.add_grade(78)

print(f"{student.name}'s average grade: {student.average_grade()}")


# 5. Product Class
class Product:
    def __init__(self, name, price, stock):
        self.name = name  # Initialize the product name
        self.price = price  # Initialize the product price
        self.stock = stock  # Initialize the stock quantity

    def sell(self, quantity):
        if quantity <= self.stock:
            self.stock -= quantity  # Reduce stock by quantity sold
        else:
            print("Not enough stock available")

    def restock(self, quantity):
        self.stock += quantity  # Increase stock by quantity restocked

# Create a product object and test sell and restock
product = Product("Laptop", 1000, 5)
product.sell(2)
print(f"Stock after selling: {product.stock}")
product.restock(3)
print(f"Stock after restocking: {product.stock}")


# 6. Encapsulation Practice (Modifying Account class)
class AccountEncapsulated:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance  # Make balance private

    @property
    def balance(self):
        return self.__balance  # Read-only balance property

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Insufficient funds")

# Test the encapsulated account class
account_encap = AccountEncapsulated("Eve", 200)
account_encap.deposit(100)
print(f"Balance after deposit: {account_encap.balance}")
account_encap.withdraw(50)
print(f"Balance after withdrawal: {account_encap.balance}")
account_encap.withdraw(300)  # Trying to withdraw more than available
