"""
Day 3 Exercises - Collections, Files & Errors
Level 2: Intermediate

Covers:
4. List Operations
5. Dictionary Operations
6. List Comprehension
7. Modules & Import (see utils.py and main.py)
"""

from utils import add_tax

# ============================================================
# 4. List Operations
# ============================================================
print("=== 4. List Operations ===")

numbers = [10, 25, 40, 15, 60, 30]
print("Original numbers:", numbers)

# Use a loop to print only numbers greater than 30
print("Numbers greater than 30:")
for number in numbers:
    if number > 30:
        print(" -", number)

# Sort the list and print it
sorted_numbers = sorted(numbers)
print("Sorted list:", sorted_numbers)

# Find the sum and average of the list
total = sum(numbers)
average = total / len(numbers)
print(f"Sum: {total}, Average: {average}")


# ============================================================
# 5. Dictionary Operations
# ============================================================
print("\n=== 5. Dictionary Operations ===")

products = {
    "Coffee": 150,
    "Injera": 20,
    "Shiro": 60,
    "Honey": 300,
    "Butter": 250,
}

# Loop through the dictionary and print each product with its price
print("Product price list:")
for product, price in products.items():
    print(f" -> {product:<10} | {price} ETB")

# Ask user for a product name and show its price (.get() with default message)
product_query = input("Enter a product name to check its price: ").strip()
price = products.get(product_query, "Product not found.")
print(f"Price of '{product_query}':", price)


# ============================================================
# 6. List Comprehension
# ============================================================
print("\n=== 6. List Comprehension ===")

# List of numbers from 1 to 20 using comprehension
numbers_1_to_20 = [n for n in range(1, 21)]
print("Numbers 1-20:", numbers_1_to_20)

# List containing only even numbers from 1 to 30 using comprehension
even_numbers_1_to_30 = [n for n in range(1, 31) if n % 2 == 0]
print("Even numbers 1-30:", even_numbers_1_to_30)

# List of odd numbers from 1 to 10 using comprehension
odd_numbers_1_to_10 = [n for n in range(1, 11) if n % 2 != 0]
print("Odd numbers 1-10:", odd_numbers_1_to_10)


# ============================================================
# 7. Modules & Import
# ============================================================
print("\n=== 7. Modules & Import ===")
# add_tax() lives in utils.py and is imported at the top of this file.
# main.py also demonstrates this same import separately.

price = 500
print(f"{price} ETB with 15% tax -> {add_tax(price):.2f} ETB")
