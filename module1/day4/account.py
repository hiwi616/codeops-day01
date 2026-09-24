class Account:

    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return

        self.__balance += amount
        print(f"Deposited {amount} ETB successfully.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return

        if amount > self.__balance:
            print("Insufficient funds.")
            return

        self.__balance -= amount
        print(f"Withdrawn {amount} ETB successfully.")

    def statement(self):
        print("\n----- ACCOUNT STATEMENT -----")
        print(f"Owner          : {self.owner}")
        print(f"Account Number : {self.account_number}")
        print(f"Balance        : {self.__balance} ETB")


# Creating account instances outside the class
acc1 = Account("Hiwot Ketema", "ACC1001", 3000)
acc2 = Account("Almaz Bekele", "ACC1002", 1500)

# Displaying account statements
acc1.statement()
acc2.statement()

# Performing deposit and withdrawal
acc1.deposit(1000)
acc1.withdraw(500)

# Displaying updated account statement for acc1
acc1.statement()

# Printing current balance for acc1
print("\nCurrent Balance:", acc1.balance)

# Correcting the typo in statement call for acc2
acc2.statement()
