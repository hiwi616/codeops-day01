# day4_mini_project.py

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

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

def main():
    accounts = {}   # Dictionary to hold accounts (account_number -> account object)

    while True:
        print("\nMenu:")
        print("1. Create new account")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Check balance")
        print("5. View account info")
        print("6. Exit")
        
        choice = input("Enter your choice: ")

        if choice == '1':
            name = input("Enter account owner's name: ")
            account_number = len(accounts) + 1   # Simple account number generation
            accounts[account_number] = BankAccount(name)
            print(f"Account created for {name} with account number {account_number}.")

        elif choice == '2':
            account_number = int(input("Enter account number: "))
            if account_number in accounts:
                amount = float(input("Enter deposit amount: "))
                accounts[account_number].deposit(amount)
                print(f"Deposited {amount} to account number {account_number}.")
            else:
                print("Account not found.")

        elif choice == '3':
            account_number = int(input("Enter account number: "))
            if account_number in accounts:
                amount = float(input("Enter withdrawal amount: "))
                accounts[account_number].withdraw(amount)
                print(f"Withdrew {amount} from account number {account_number}.")
            else:
                print("Account not found.")

        elif choice == '4':
            account_number = int(input("Enter account number: "))
            if account_number in accounts:
                print(f"Balance for account number {account_number}: {accounts[account_number].balance}")
            else:
                print("Account not found.")

        elif choice == '5':
            account_number = int(input("Enter account number: "))
            if account_number in accounts:
                acc = accounts[account_number]
                print(f"Account Number: {account_number}, Owner: {acc.owner}, Balance: {acc.balance}")
            else:
                print("Account not found.")

        elif choice == '6':
            print("Exiting...")
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
