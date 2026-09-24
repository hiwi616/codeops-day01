"""
utils.py - Day 3 Exercise 7 (Modules & Import)

A small utility module with a single function, imported and used
from main.py (and from day3_level2.py) to demonstrate Python modules.
"""


def add_tax(price, rate=0.15):
    """Accepts a price, applies tax, and returns the tax-included price."""
    return price * (1 + rate)
