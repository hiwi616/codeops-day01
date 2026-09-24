"""
Day 3 Mini Project - Inventory Manager

A menu-driven console program that:
- Uses a dictionary to store product: quantity pairs
- Offers a menu with options to add, update, view, save, load, and exit
"""

INVENTORY_FILE = "inventory.txt"


def print_menu():
    print("\n===== Inventory Manager =====")
    print("1. Add new product")
    print("2. Update quantity")
    print("3. View all products")
    print("4. Save to file")
    print("5. Load from file")
    print("6. Exit")


def add_product(inventory):
    name = input("Product name: ").strip()
    try:
        quantity = int(input("Quantity: "))
    except ValueError:
        print("Error: quantity must be a whole number.")
        return

    if name in inventory:
        print(f"'{name}' already exists with quantity {inventory[name]}. Use 'Update quantity' instead.")
        return

    inventory[name] = quantity
    print(f"Added '{name}' with quantity {quantity}.")


def update_quantity(inventory):
    name = input("Product name to update: ").strip()
    if name not in inventory:
        print(f"Error: '{name}' not found in inventory.")
        return

    try:
        quantity = int(input("New quantity: "))
    except ValueError:
        print("Error: quantity must be a whole number.")
        return

    inventory[name] = quantity
    print(f"Updated '{name}' to quantity {quantity}.")


def view_products(inventory):
    if not inventory:
        print("Inventory is empty.")
        return

    print("Current inventory:")
    for name, quantity in inventory.items():
        print(f" -> {name:<15} | Qty: {quantity}")


def save_to_file(inventory, filename=INVENTORY_FILE):
    with open(filename, "w") as f:
        for name, quantity in inventory.items():
            f.write(f"{name},{quantity}\n")
    print(f"Inventory saved to {filename}")


def load_from_file(inventory, filename=INVENTORY_FILE):
    try:
        with open(filename, "r") as f:
            lines = f.readlines()
    except FileNotFoundError:
        print(f"Error: '{filename}' does not exist yet. Save the inventory first.")
        return

    inventory.clear()
    for line in lines:
        line = line.strip()
        if not line:
            continue
        name, quantity = line.split(",")
        inventory[name] = int(quantity)

    print(f"Loaded {len(inventory)} products from {filename}")


def run():
    inventory = {}

    while True:
        print_menu()
        choice = input("Choose an option (1-6): ").strip()

        if choice == "1":
            add_product(inventory)
        elif choice == "2":
            update_quantity(inventory)
        elif choice == "3":
            view_products(inventory)
        elif choice == "4":
            save_to_file(inventory)
        elif choice == "5":
            load_from_file(inventory)
        elif choice == "6":
            print("Goodbye!")
            break
        else:
            print("Invalid option, please choose 1-6.")


if __name__ == "__main__":
    run()
