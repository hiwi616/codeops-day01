
# ---------------------------------------
# Personal Finance Tracker
# ---------------------------------------

balance = 0

def add_income():
    global balance

    try:
        income = float(input("Enter income: "))
        balance += income
        print("Income added successfully.")
    except ValueError:
        print("Invalid input.")

def add_expense():
    global balance

    try:
        expense = float(input("Enter expense: "))
        balance -= expense
        print("Expense added successfully.")
    except ValueError:
        print("Invalid input.")

def show_balance():
    print(f"Current Balance: {balance}")

while True:

    print("\n===== MENU =====")
    print("1. Add Income")
    print("2. Add Expense")
    print("3. Show Balance")
    print("4. Exit")

    choice = input("Choose an option: ")

    if choice == "1":
        add_income()

    elif choice == "2":
        add_expense()

    elif choice == "3":
        show_balance()

    elif choice == "4":
        break

    else:
        print("Invalid choice!")

print("\nProgram Ended")
print(f"Final Balance: {balance}")