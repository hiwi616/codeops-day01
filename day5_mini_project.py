from abc import ABC, abstractmethod


# ==========================================
# ACCOUNT - ABSTRACT PARENT CLASS
# ==========================================

class Account(ABC):

    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            print(f"Deposited: {amount}")
        else:
            print("Amount must be positive.")

    @abstractmethod
    def withdraw(self, amount):
        pass

    @abstractmethod
    def calculate_interest(self):
        pass

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")


# ==========================================
# SAVINGS ACCOUNT
# ==========================================

class SavingsAccount(Account):

    def __init__(self, owner, balance, interest_rate=0.05):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def withdraw(self, amount):
        if amount <= self.balance:
            self._balance -= amount
            print(f"Withdrawn: {amount}")
        else:
            print("Insufficient balance.")

    def calculate_interest(self):
        return self.balance * self.interest_rate

    def add_interest(self):
        interest = self.calculate_interest()
        self.deposit(interest)
        print(f"Interest added: {interest}")

    def statement(self):
        print("=== Savings Account ===")
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")
        print(f"Interest Rate: {self.interest_rate * 100}%")


# ==========================================
# CURRENT ACCOUNT
# ==========================================

class CurrentAccount(Account):

    def __init__(self, owner, balance, overdraft_limit=500):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft_limit:
            self._balance -= amount
            print(f"Withdrawn: {amount}")
        else:
            print("Overdraft limit exceeded!")

    def calculate_interest(self):
        return 0

    def statement(self):
        print("=== Current Account ===")
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")
        print(f"Overdraft Limit: {self.overdraft_limit}")


# ==========================================
# BANK SYSTEM
# ==========================================

accounts = []


# 1. Create Savings Account
def create_savings_account():
    owner = input("Enter owner name: ")
    balance = float(input("Enter starting balance: "))

    account = SavingsAccount(owner, balance)
    accounts.append(account)

    print("Savings account created successfully!")


# 2. Create Current Account
def create_current_account():
    owner = input("Enter owner name: ")
    balance = float(input("Enter starting balance: "))

    account = CurrentAccount(owner, balance)
    accounts.append(account)

    print("Current account created successfully!")


# Show accounts with numbers
def show_all_accounts():
    if not accounts:
        print("No accounts found.")
        return

    for i, account in enumerate(accounts, start=1):
        print(f"\nAccount {i}")
        account.statement()


# Choose an account
def choose_account():
    if not accounts:
        print("No accounts found.")
        return None

    show_all_accounts()

    choice = int(input("\nChoose account number: "))

    if 1 <= choice <= len(accounts):
        return accounts[choice - 1]

    print("Invalid account number.")
    return None


# 3. Deposit
def deposit_money():
    account = choose_account()

    if account:
        amount = float(input("Enter deposit amount: "))
        account.deposit(amount)


# 4. Withdraw
def withdraw_money():
    account = choose_account()

    if account:
        amount = float(input("Enter withdrawal amount: "))
        account.withdraw(amount)


# 5. Show statement
def show_statement():
    account = choose_account()

    if account:
        account.statement()


# 6. Apply interest to all savings accounts
def apply_interest():
    found = False

    for account in accounts:
        if isinstance(account, SavingsAccount):
            account.add_interest()
            found = True

    if not found:
        print("No savings accounts found.")


# 7. Show all accounts using polymorphism
def show_all():
    if not accounts:
        print("No accounts found.")
        return

    print("\n=== ALL ACCOUNTS ===")

    for account in accounts:
        account.statement()
        print("--------------------")


# ==========================================
# MAIN MENU
# ==========================================

while True:

    print("\n===== ADDIS BANK SYSTEM =====")
    print("1. Create Savings Account")
    print("2. Create Current Account")
    print("3. Deposit")
    print("4. Withdraw")
    print("5. Show Statement")
    print("6. Apply Interest to All Savings Accounts")
    print("7. Show All Accounts")
    print("8. Exit")

    choice = input("Choose an option: ")

    if choice == "1":
        create_savings_account()

    elif choice == "2":
        create_current_account()

    elif choice == "3":
        deposit_money()

    elif choice == "4":
        withdraw_money()

    elif choice == "5":
        show_statement()

    elif choice == "6":
        apply_interest()

    elif choice == "7":
        show_all()

    elif choice == "8":
        print("Thank you for using Addis Bank System!")
        break

    else:
        print("Invalid choice. Please try again.")