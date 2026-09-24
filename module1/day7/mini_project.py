"""
Day 7 - Mini Project
Bank Customer Service Simulator

Combines:
- Queue (FIFO) for waiting customers
- Stack (LIFO) for transaction log / undo functionality
- Hashmap (Dict) for O(1) account balance management
"""

from collections import deque


class BankSimulator:

  def __init__(self):
    # Queue for waiting customers (FIFO)
    self.customer_queue = deque()

    # Stack for completed transaction history (LIFO)
    self.transaction_history = []

    # Hashmap for account records (O(1) lookup speed)
    self.accounts = {
        "ACC-101": {"name": "Loza", "balance": 15000.0},
        "ACC-102": {"name": "Hiwot", "balance": 8500.0},
        "ACC-103": {"name": "Amanuel", "balance": 12000.0},
    }

  # --- QUEUE OPERATIONS (FIFO) ---
  def add_customer_to_queue(self, customer_name: str, account_id: str):
    """Enqueue a customer arriving at the bank - O(1)"""
    if account_id not in self.accounts:
      print(f"❌ Error: Account {account_id} not found.")
      return

    self.customer_queue.append((customer_name, account_id))
    print(
        f"➡️  [Queue] {customer_name} ({account_id}) joined the queue."
        f" Current queue size: {len(self.customer_queue)}"
    )

  def serve_next_customer(self, action: str, amount: float):
    """Dequeue and process the next customer in line - O(1)"""
    if not self.customer_queue:
      print("⚠️ No customers waiting in queue.")
      return

    # Dequeue front customer (FIFO)
    customer_name, account_id = self.customer_queue.popleft()
    print(f"\n🔔 [Teller] Serving {customer_name} ({account_id})...")

    # Hashmap O(1) balance update
    if action.lower() == "deposit":
      self.accounts[account_id]["balance"] += amount
      print(f"   ➕ Deposited {amount:,} ETB.")
    elif action.lower() == "withdraw":
      if self.accounts[account_id]["balance"] >= amount:
        self.accounts[account_id]["balance"] -= amount
        print(f"   ➖ Withdrew {amount:,} ETB.")
      else:
        print(
            f"   ❌ Insufficient funds! Current balance:"
            f" {self.accounts[account_id]['balance']:,} ETB."
        )
        return

    new_balance = self.accounts[account_id]["balance"]
    print(f"   💰 New Balance: {new_balance:,} ETB")

    # Push to transaction stack (LIFO)
    transaction = {
        "account_id": account_id,
        "action": action.lower(),
        "amount": amount,
    }
    self.transaction_history.append(transaction)

  # --- STACK OPERATIONS (LIFO) ---
  def undo_last_transaction(self):
    """Pop and reverse the last transaction - O(1)"""
    if not self.transaction_history:
      print("\n⚠️ No transactions to undo.")
      return

    # Pop top item from stack (LIFO)
    last_tx = self.transaction_history.pop()
    account_id = last_tx["account_id"]
    action = last_tx["action"]
    amount = last_tx["amount"]

    # Reverse the operation
    if action == "deposit":
      self.accounts[account_id]["balance"] -= amount
      print(f"\n↩️  [Undo] Reversed deposit of {amount:,} ETB for {account_id}.")
    elif action == "withdraw":
      self.accounts[account_id]["balance"] += amount
      print(
          f"\n↩️  [Undo] Reversed withdrawal of {amount:,} ETB for"
          f" {account_id}."
      )

    current_balance = self.accounts[account_id]["balance"]
    print(f"   💰 Restored Balance: {current_balance:,} ETB")

  # --- HASHMAP OPERATIONS (O(1)) ---
  def print_accounts(self):
    """Displays all account balances"""
    print("\n========================================")
    print("       CURRENT ACCOUNT BALANCES          ")
    print("========================================")
    for acc_id, info in self.accounts.items():
      print(f"  {acc_id} | {info['name']:<10} | {info['balance']:>10,} ETB")
    print("========================================\n")


# ==============================================================================
# SIMULATION RUNNER
# ==============================================================================
if __name__ == "__main__":
  bank = BankSimulator()

  # Print initial state
  bank.print_accounts()

  # 1. Customers arrive at the bank (Queueing)
  bank.add_customer_to_queue("Loza", "ACC-101")
  bank.add_customer_to_queue("Hiwot", "ACC-102")
  bank.add_customer_to_queue("Amanuel", "ACC-103")

  # 2. Bank Teller serves customers in FIFO order
  bank.serve_next_customer("deposit", 5000.0)  # Loza deposits 5,000
  bank.serve_next_customer("withdraw", 2000.0)  # Hiwot withdraws 2,000
  bank.serve_next_customer("deposit", 3000.0)  # Amanuel deposits 3,000

  # Check balances after transactions
  bank.print_accounts()

  # 3. Undo last action (LIFO - Amanuel's deposit of 3,000)
  bank.undo_last_transaction()

  # Final balances state
  bank.print_accounts()