"""
main.py - Day 3 Exercise 7 (Modules & Import)

Imports the add_tax function from utils.py and uses it.
"""

from utils import add_tax

if __name__ == "__main__":
    price = 200
    price_with_tax = add_tax(price)
    print(f"Price before tax: {price} ETB")
    print(f"Price after 15% tax: {price_with_tax:.2f} ETB")

    # Using a custom tax rate
    custom_price_with_tax = add_tax(price, rate=0.10)
    print(f"Price after 10% tax: {custom_price_with_tax:.2f} ETB")
