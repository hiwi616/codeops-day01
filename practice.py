class Book:
    def __init__(self, title, author, pages):  # Corrected __init__
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f"{self.title} by {self.author} has {self.pages} pages.")


book1 = Book("Python Basics", "John", 250)
book2 = Book("AI Fundamentals", "Sara", 320)

book1.describe()
book2.describe()


class Product:
    def __init__(self, name, price, quantity):  # Corrected __init__ and added self
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, amount):
        if amount > 0:
            self.__quantity += amount
            print(f"{amount} items added.")

    def sell(self, amount):
        if amount <= 0:
            print("Amount must be positive.")
        elif amount > self.__quantity:
            print("Not enough stock.")
        else:
            self.__quantity -= amount
            print(f"{amount} items sold.")

    def display(self):
        print(f"Product: {self.name}")
        print(f"Price: {self.price} ETB")
        print(f"Quantity: {self.__quantity}")


# Instantiate products outside the class definition
product1 = Product("Laptop", 65000, 10)
product2 = Product("Phone", 30000, 20)

product1.display()

product1.sell(3)
product1.restock(5)

print("Current Quantity:", product1.quantity)
