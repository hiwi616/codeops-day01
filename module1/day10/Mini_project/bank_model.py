# day09/bank_model.py

from abc import ABC, abstractmethod
from typing import List, Dict, Optional, Tuple, Any, Set, Deque
from collections import deque
import datetime
import time


# ============================================================================
# Singleton Pattern - BankConfig
# ============================================================================

class BankConfig:
    """
    Singleton class to hold shared bank configuration.
    Ensures only one instance exists across the application.
    """
    _instance = None
    
    def __new__(cls):
        """Create or return the single instance of BankConfig."""
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        """Initialize configuration values."""
        self.interest_rate = 0.05
        self.overdraft_limit = 1000
        self.bank_name = "Addis Bank"
        self.minimum_balance = 0
    
    def update_interest_rate(self, rate):
        if rate < 0:
            raise ValueError("Interest rate must be non-negative")
        self.interest_rate = rate
    
    def update_overdraft_limit(self, limit):
        if limit < 0:
            raise ValueError("Overdraft limit must be non-negative")
        self.overdraft_limit = limit


# ============================================================================
# Observer Pattern - Notification System
# ============================================================================

class Observer(ABC):
    """Abstract base class for all observers."""
    
    @abstractmethod
    def update(self, account, transaction_type, amount, new_balance):
        pass


class SMSAlert(Observer):
    """SMS Alert observer that sends notifications via SMS."""
    
    def __init__(self, phone_number=None):
        self.phone_number = phone_number
    
    def update(self, account, transaction_type, amount, new_balance):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"📱 SMS Alert [{timestamp}]")
        print(f"   To: {self.phone_number or account.owner}")
        print(f"   Account: {account.account_number} ({account.__class__.__name__})")
        print(f"   Transaction: {transaction_type} of {amount:.2f} ETB")
        print(f"   New Balance: {new_balance:.2f} ETB")
        if transaction_type == 'withdraw' and new_balance < 0:
            print("   ⚠️ WARNING: Account is overdrawn!")
        print("-" * 40)


class AuditLog(Observer):
    """Audit Log observer that records all transactions."""
    
    def __init__(self, log_file='audit.log'):
        self.log_file = log_file
        self.transactions = []
    
    def update(self, account, transaction_type, amount, new_balance):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = {
            'timestamp': timestamp,
            'account_number': account.account_number,
            'account_type': account.__class__.__name__,
            'owner': account.owner,
            'transaction_type': transaction_type,
            'amount': amount,
            'new_balance': new_balance,
            'is_overdrawn': new_balance < 0
        }
        self.transactions.append(log_entry)
        print(f"📋 Audit Log [{timestamp}]")
        print(f"   Account: {account.account_number} ({account.__class__.__name__})")
        print(f"   Owner: {account.owner}")
        print(f"   {transaction_type.capitalize()}: {amount:.2f} ETB")
        print(f"   Balance: {new_balance:.2f} ETB")
        print("-" * 40)


# ============================================================================
# Core Account Classes
# ============================================================================

class Account:
    """A bank account with owner, account number, private balance, and transaction history."""
    
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self._observers: List[Observer] = []
        self._history: List[Dict] = []
        self.transfers: List[str] = []  # Track transfers to other accounts
    
    @property
    def balance(self):
        return self.__balance
    
    @property
    def history(self):
        return tuple(self._history)
    
    def subscribe(self, observer: Observer):
        if observer not in self._observers:
            self._observers.append(observer)
    
    def unsubscribe(self, observer: Observer):
        if observer in self._observers:
            self._observers.remove(observer)
    
    def _notify(self, transaction_type: str, amount: float):
        for observer in self._observers:
            observer.update(self, transaction_type, amount, self.__balance)
    
    def _record_transaction(self, transaction_type: str, amount: float):
        transaction = {
            'type': transaction_type,
            'amount': amount,
            'previous_balance': self.__balance - (amount if transaction_type == 'deposit' else -amount),
            'timestamp': datetime.datetime.now().isoformat(),
            'reversed': False
        }
        self._history.append(transaction)
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self._record_transaction('deposit', amount)
        self.__balance += amount
        self._notify('deposit', amount)
    
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.__balance:
            raise ValueError(f"Insufficient funds. Balance: {self.__balance:.2f} ETB")
        self._record_transaction('withdraw', amount)
        self.__balance -= amount
        self._notify('withdraw', amount)
    
    def transfer(self, amount, recipient_account):
        """
        Transfer money to another account.
        
        Args:
            amount: Amount to transfer
            recipient_account: The account to receive the money
        """
        # Validate amount
        if amount <= 0:
            raise ValueError("Transfer amount must be positive")
        
        # Withdraw from this account
        self.withdraw(amount)
        
        # Deposit to recipient
        recipient_account.deposit(amount)
        
        # Record transfer in both accounts
        self.transfers.append(recipient_account.account_number)
        recipient_account.transfers.append(self.account_number)
        
        # Notify of transfer
        print(f"🔄 Transfer of {amount:.2f} ETB from {self.account_number} to {recipient_account.account_number}")
    
    def undo_last(self) -> bool:
        if not self._history:
            return False
        
        transaction = self._history.pop()
        
        if transaction.get('reversed', False):
            self._history.append(transaction)
            raise ValueError("Transaction has already been reversed")
        
        transaction_type = transaction['type']
        amount = transaction['amount']
        
        if transaction_type == 'deposit':
            self.__balance -= amount
            print(f"↩️ Undo deposit of {amount:.2f} ETB")
        elif transaction_type == 'withdraw':
            self.__balance += amount
            print(f"↩️ Undo withdrawal of {amount:.2f} ETB")
        else:
            self._history.append(transaction)
            raise ValueError(f"Unknown transaction type: {transaction_type}")
        
        transaction['reversed'] = True
        transaction['reversal_time'] = datetime.datetime.now().isoformat()
        
        self._history.append({
            'type': 'reversal',
            'original_type': transaction_type,
            'amount': amount,
            'previous_balance': self.__balance - (amount if transaction_type == 'withdraw' else -amount),
            'timestamp': datetime.datetime.now().isoformat(),
            'reversed_transaction': transaction
        })
        
        self._notify('undo', amount)
        return True
    
    def get_transaction_count(self) -> int:
        return len(self._history)
    
    def get_transfer_count(self) -> int:
        return len(self.transfers)
    
    def statement(self):
        print(f"Account Type: Standard Account")
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance:.2f} ETB")
        print(f"Total Transactions: {len(self._history)}")
        print(f"Transfers: {len(self.transfers)}")
        print("-" * 40)


class SavingsAccount(Account):
    """A savings account that earns interest."""
    
    def __init__(self, owner, number, balance=0, rate=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.rate = rate if rate is not None else config.interest_rate
    
    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
        return interest
    
    def statement(self):
        print(f"Account Type: Savings Account (Rate: {self.rate*100:.1f}%)")
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance:.2f} ETB")
        print(f"Total Transactions: {len(self._history)}")
        print(f"Transfers: {len(self.transfers)}")
        print("-" * 40)


class CurrentAccount(Account):
    """A current account that allows overdraft up to a specified limit."""
    
    def __init__(self, owner, number, balance=0, overdraft_limit=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.overdraft_limit = overdraft_limit if overdraft_limit is not None else config.overdraft_limit
    
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.balance + self.overdraft_limit:
            raise ValueError(
                f"Withdrawal would exceed overdraft limit. "
                f"Balance: {self.balance:.2f} ETB, "
                f"Overdraft limit: {self.overdraft_limit:.2f} ETB, "
                f"Max withdrawal: {self.balance + self.overdraft_limit:.2f} ETB"
            )
        self._record_transaction('withdraw', amount)
        new_balance = self.balance - amount
        object.__setattr__(self, '_Account__balance', new_balance)
        self._notify('withdraw', amount)
    
    def undo_last(self) -> bool:
        if not self._history:
            return False
        
        transaction = self._history.pop()
        
        if transaction.get('reversed', False):
            self._history.append(transaction)
            raise ValueError("Transaction has already been reversed")
        
        transaction_type = transaction['type']
        amount = transaction['amount']
        
        if transaction_type == 'withdraw':
            self.__balance += amount
            print(f"↩️ Undo withdrawal of {amount:.2f} ETB")
        elif transaction_type == 'deposit':
            if self.__balance - amount < -self.overdraft_limit:
                self._history.append(transaction)
                raise ValueError(f"Cannot undo deposit of {amount:.2f} ETB - would exceed overdraft limit")
            self.__balance -= amount
            print(f"↩️ Undo deposit of {amount:.2f} ETB")
        else:
            self._history.append(transaction)
            raise ValueError(f"Unknown transaction type: {transaction_type}")
        
        transaction['reversed'] = True
        transaction['reversal_time'] = datetime.datetime.now().isoformat()
        
        self._history.append({
            'type': 'reversal',
            'original_type': transaction_type,
            'amount': amount,
            'previous_balance': self.__balance - (amount if transaction_type == 'withdraw' else -amount),
            'timestamp': datetime.datetime.now().isoformat(),
            'reversed_transaction': transaction
        })
        
        self._notify('undo', amount)
        return True
    
    def statement(self):
        print(f"Account Type: Current Account (Overdraft Limit: {self.overdraft_limit:.2f} ETB)")
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance:.2f} ETB")
        print(f"Available Funds: {self.balance + self.overdraft_limit:.2f} ETB")
        print(f"Total Transactions: {len(self._history)}")
        print(f"Transfers: {len(self.transfers)}")
        print("-" * 40)


# ============================================================================
# Factory Pattern - AccountFactory
# ============================================================================

class AccountFactory:
    """Factory class to create different types of accounts."""
    
    @staticmethod
    def create(kind, owner, number, balance=0, **kwargs):
        kind = kind.lower()
        if kind == 'savings':
            rate = kwargs.get('rate')
            return SavingsAccount(owner, number, balance, rate)
        elif kind == 'current':
            overdraft_limit = kwargs.get('overdraft_limit')
            return CurrentAccount(owner, number, balance, overdraft_limit)
        elif kind == 'standard':
            return Account(owner, number, balance)
        else:
            raise ValueError(f"Unknown account type: '{kind}'")


# ============================================================================
# Branch Class - Tree Data Structure
# ============================================================================

class Branch:
    """
    A branch in the bank's hierarchical tree structure.
    Represents a node in the tree with child branches and accounts.
    """
    
    def __init__(self, name):
        """
        Initialize a branch.
        
        Args:
            name (str): Name of the branch
        """
        self.name = name
        self.children: List['Branch'] = []  # Sub-branches
        self.accounts: List[Account] = []   # Accounts at this branch
    
    def add_child(self, branch: 'Branch'):
        """Add a child branch."""
        self.children.append(branch)
    
    def add_account(self, account: Account):
        """Add an account to this branch."""
        self.accounts.append(account)
    
    def total_balance(self) -> float:
        """
        Recursively calculate total balance of this branch and all sub-branches.
        
        Time Complexity: O(n) where n is the total number of accounts in the subtree
        
        Returns:
            float: Total balance of all accounts in this branch and sub-branches
        """
        # Sum balances of accounts at this branch
        total = sum(account.balance for account in self.accounts)
        
        # Recursively sum balances of child branches
        for child in self.children:
            total += child.total_balance()
        
        return total
    
    def get_account_count(self) -> int:
        """
        Recursively count all accounts in this branch and sub-branches.
        
        Returns:
            int: Total number of accounts in the subtree
        """
        count = len(self.accounts)
        for child in self.children:
            count += child.get_account_count()
        return count
    
    def get_accounts(self) -> List[Account]:
        """
        Get all accounts in this branch and all sub-branches.
        
        Returns:
            List of all accounts in the subtree
        """
        all_accounts = self.accounts.copy()
        for child in self.children:
            all_accounts.extend(child.get_accounts())
        return all_accounts
    
    def find_deepest_branch(self) -> int:
        """
        Find the maximum depth of this branch tree.
        
        Returns:
            int: Maximum depth (1 for leaf node)
        """
        if not self.children:
            return 1
        return 1 + max(child.find_deepest_branch() for child in self.children)
    
    def get_branch_summary(self, indent: int = 0) -> str:
        """
        Get a formatted summary of the branch and its structure.
        
        Args:
            indent: Indentation level for formatting
            
        Returns:
            str: Formatted summary
        """
        lines = []
        prefix = "  " * indent
        lines.append(f"{prefix}📁 {self.name}")
        lines.append(f"{prefix}   Accounts: {len(self.accounts)}")
        lines.append(f"{prefix}   Balance: {self.total_balance():.2f} ETB")
        lines.append(f"{prefix}   Sub-branches: {len(self.children)}")
        
        for child in self.children:
            lines.append(child.get_branch_summary(indent + 1))
        
        return "\n".join(lines)
    
    def print_hierarchy(self, indent: int = 0):
        """Print the branch hierarchy recursively."""
        prefix = "  " * indent
        print(f"{prefix}├── {self.name} (Balance: {self.total_balance():.2f} ETB, "
              f"Accounts: {len(self.accounts)})")
        
        for i, account in enumerate(self.accounts, 1):
            print(f"{prefix}│   {i}. {account.owner} ({account.account_number}) - "
                  f"{account.balance:.2f} ETB")
        
        for child in self.children:
            child.print_hierarchy(indent + 1)


# ============================================================================
# Account Registry with Search and Sort
# ============================================================================

def binary_search(sorted_list: List[str], target: str) -> int:
    """Perform binary search on a sorted list."""
    left, right = 0, len(sorted_list) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if sorted_list[mid] == target:
            return mid
        elif sorted_list[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1


def recursive_total_transactions(history: tuple, index: int = 0) -> float:
    """Recursively calculate the total amount of all transactions."""
    if index >= len(history):
        return 0.0
    transaction = history[index]
    if transaction['type'] == 'reversal':
        amount = 0.0
    else:
        amount = transaction['amount']
    return amount + recursive_total_transactions(history, index + 1)


class AccountRegistry:
    """Registry to store and manage accounts efficiently."""
    
    def __init__(self):
        self.by_number: Dict[str, Account] = {}
        self.order: List[str] = []
        self._sorted_numbers_cache: Optional[List[str]] = None
    
    def add(self, account: Account) -> None:
        if account.account_number in self.by_number:
            raise ValueError(f"Account {account.account_number} already exists")
        self.by_number[account.account_number] = account
        self.order.append(account.account_number)
        self._invalidate_cache()
    
    def find(self, number: str) -> Optional[Account]:
        return self.by_number.get(number)
    
    def find_by_number(self, number: str) -> Optional[Account]:
        sorted_numbers = self._get_sorted_numbers()
        index = binary_search(sorted_numbers, number)
        if index >= 0:
            return self.by_number[sorted_numbers[index]]
        return None
    
    def list_all(self) -> List[Account]:
        return [self.by_number[number] for number in self.order]
    
    def top_by_balance(self, n: int = 5) -> List[Account]:
        if n <= 0:
            return []
        sorted_accounts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )
        return sorted_accounts[:n]
    
    def bottom_by_balance(self, n: int = 5) -> List[Account]:
        if n <= 0:
            return []
        sorted_accounts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance
        )
        return sorted_accounts[:n]
    
    def total_transactions(self, number: str) -> float:
        account = self.find(number)
        if account is None:
            raise ValueError(f"Account {number} not found")
        return recursive_total_transactions(account.history)
    
    def remove(self, number: str) -> Optional[Account]:
        account = self.by_number.pop(number, None)
        if account:
            self.order.remove(number)
            self._invalidate_cache()
        return account
    
    def count(self) -> int:
        return len(self.by_number)
    
    def _get_sorted_numbers(self) -> List[str]:
        if self._sorted_numbers_cache is None:
            self._sorted_numbers_cache = sorted(self.by_number.keys())
        return self._sorted_numbers_cache
    
    def _invalidate_cache(self):
        self._sorted_numbers_cache = None
    
    def get_statistics(self) -> Dict[str, Any]:
        if self.count() == 0:
            return {
                'total_accounts': 0,
                'total_balance': 0,
                'average_balance': 0,
                'max_balance': 0,
                'min_balance': 0,
                'account_types': {},
                'total_transactions': 0
            }
        accounts = self.list_all()
        balances = [a.balance for a in accounts]
        total_transactions = sum(a.get_transaction_count() for a in accounts)
        account_types = {}
        for account in accounts:
            acc_type = account.__class__.__name__
            account_types[acc_type] = account_types.get(acc_type, 0) + 1
        return {
            'total_accounts': self.count(),
            'total_balance': sum(balances),
            'average_balance': sum(balances) / len(balances),
            'max_balance': max(balances),
            'min_balance': min(balances),
            'account_types': account_types,
            'total_transactions': total_transactions
        }


# ============================================================================
# BFS for Transfer Graph
# ============================================================================

def build_transfer_graph(accounts: List[Account]) -> Dict[str, List[str]]:
    """
    Build a transfer graph from a list of accounts.
    
    The graph shows relationships between accounts based on transfers.
    
    Args:
        accounts: List of Account objects
        
    Returns:
        Dict mapping account numbers to list of recipient account numbers
    """
    graph = {}
    for account in accounts:
        graph[account.account_number] = account.transfers.copy()
    return graph


def bfs(transfers_graph: Dict[str, List[str]], start: str) -> List[str]:
    """
    Perform BFS traversal on the transfer graph.
    
    Time Complexity: O(V + E) where V is vertices and E is edges
    
    Args:
        transfers_graph: Dictionary mapping account numbers to their transfer recipients
        start: Starting account number
        
    Returns:
        List of reachable account numbers (including the start node)
    """
    # Check if start exists in graph
    if start not in transfers_graph:
        return []
    
    # BFS implementation
    visited: Set[str] = set()
    queue: Deque[str] = deque([start])
    visited.add(start)
    
    while queue:
        current = queue.popleft()
        
        # Explore all neighbors (recipients of transfers)
        for neighbor in transfers_graph.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return list(visited)


def bfs_with_details(transfers_graph: Dict[str, List[str]], start: str) -> Dict[str, Any]:
    """
    Perform BFS and return detailed information about the traversal.
    
    Returns:
        Dict containing reachable nodes, levels, and edges traversed
    """
    if start not in transfers_graph:
        return {'reachable': [], 'levels': {}, 'edges': []}
    
    visited: Set[str] = set()
    queue: Deque[Tuple[str, int]] = deque([(start, 0)])  # (node, level)
    visited.add(start)
    levels = {start: 0}
    edges = []
    
    while queue:
        current, level = queue.popleft()
        
        for neighbor in transfers_graph.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, level + 1))
                levels[neighbor] = level + 1
                edges.append((current, neighbor))
    
    return {
        'reachable': list(visited),
        'levels': levels,
        'edges': edges,
        'max_depth': max(levels.values()) if levels else 0
    }


def print_transfer_graph(transfers_graph: Dict[str, List[str]], title: str = "Transfer Graph"):
    """Pretty print the transfer graph."""
    print(f"\n{'=' * 50}")
    print(f"{title}")
    print('=' * 50)
    
    if not transfers_graph:
        print("Empty graph")
        return
    
    for account, recipients in sorted(transfers_graph.items()):
        if recipients:
            print(f"{account} → {', '.join(recipients)}")
        else:
            print(f"{account} → (no outgoing transfers)")


# ============================================================================
# Demonstration
# ============================================================================

def build_bank_structure() -> Tuple[AccountRegistry, Branch, Dict[str, List[str]]]:
    """
    Build a complete bank structure with branches, accounts, and transfers.
    
    Returns:
        Tuple of (registry, head_branch, transfer_graph)
    """
    print("=" * 70)
    print("BUILDING ADDIS BANK HIERARCHICAL STRUCTURE")
    print("=" * 70)
    
    # 1. Create accounts
    print("\n1. Creating Accounts...")
    registry = AccountRegistry()
    accounts_data = [
        ('standard', 'Alice Johnson', 'A1001', 1000),
        ('savings', 'Bob Smith', 'S2001', 2000, 0.04),
        ('current', 'Carol White', 'C3001', 500, 1500),
        ('savings', 'David Brown', 'S2002', 3500, 0.055),
        ('current', 'Eve Davis', 'C3002', 100),
        ('savings', 'Frank Wilson', 'S2003', 5000, 0.045),
        ('standard', 'Grace Lee', 'A1002', 750),
        ('current', 'Henry Ford', 'C3003', 2500, 2000),
        ('savings', 'Ivy Chen', 'S2004', 4200, 0.05),
        ('standard', 'Jack Smith', 'A1003', 150),
        ('current', 'Karen Price', 'C3004', 800, 1000),
        ('savings', 'Leo Adams', 'S2005', 6000, 0.05),
        ('standard', 'Mia Wang', 'A1004', 1200),
        ('current', 'Noah Taylor', 'C3005', 300, 500),
        ('savings', 'Olivia Kim', 'S2006', 8000, 0.06),
    ]
    
    for data in accounts_data:
        if len(data) == 5:  # Savings account with rate
            acc = AccountFactory.create(data[0], data[1], data[2], data[3], rate=data[4])
        elif data[0] == 'current' and len(data) > 4:
            acc = AccountFactory.create(data[0], data[1], data[2], data[3], 
                                       overdraft_limit=data[4])
        else:
            acc = AccountFactory.create(data[0], data[1], data[2], data[3])
        
        registry.add(acc)
        print(f"  ✅ {acc.owner:15s} ({acc.account_number}) - "
              f"{acc.__class__.__name__} - {acc.balance:8.2f} ETB")
    
    print(f"\n  Total accounts: {registry.count()}")
    
    # 2. Create branch hierarchy
    print("\n2. Building Branch Hierarchy (Tree Structure)...")
    
    # Head Office (Level 1)
    head_office = Branch("Head Office")
    print(f"  📁 {head_office.name}")
    
    # Regions (Level 2)
    north_region = Branch("North Region")
    south_region = Branch("South Region")
    east_region = Branch("East Region")
    west_region = Branch("West Region")
    
    head_office.add_child(north_region)
    head_office.add_child(south_region)
    head_office.add_child(east_region)
    head_office.add_child(west_region)
    
    print(f"    📁 {north_region.name}")
    print(f"    📁 {south_region.name}")
    print(f"    📁 {east_region.name}")
    print(f"    📁 {west_region.name}")
    
    # Branches (Level 3) - North Region
    addis_ababa = Branch("Addis Ababa")
    bahir_dar = Branch("Bahir Dar")
    gondar = Branch("Gondar")
    north_region.add_child(addis_ababa)
    north_region.add_child(bahir_dar)
    north_region.add_child(gondar)
    
    print(f"      📁 {addis_ababa.name}")
    print(f"      📁 {bahir_dar.name}")
    print(f"      📁 {gondar.name}")
    
    # Branches (Level 3) - South Region
    hawassa = Branch("Hawassa")
    arba_minch = Branch("Arba Minch")
    south_region.add_child(hawassa)
    south_region.add_child(arba_minch)
    print(f"      📁 {hawassa.name}")
    print(f"      📁 {arba_minch.name}")
    
    # Branches (Level 3) - East Region
    dire_dawa = Branch("Dire Dawa")
    harar = Branch("Harar")
    east_region.add_child(dire_dawa)
    east_region.add_child(harar)
    print(f"      📁 {dire_dawa.name}")
    print(f"      📁 {harar.name}")
    
    # Branches (Level 3) - West Region
    jimma = Branch("Jimma")
    nekemte = Branch("Nekemte")
    west_region.add_child(jimma)
    west_region.add_child(nekemte)
    print(f"      📁 {jimma.name}")
    print(f"      📁 {nekemte.name}")
    
    # Sub-branches (Level 4) - Addis Ababa
    piassa = Branch("Piassa")
    bole = Branch("Bole")
    addis_ababa.add_child(piassa)
    addis_ababa.add_child(bole)
    print(f"        📁 {piassa.name}")
    print(f"        📁 {bole.name}")
    
    # Sub-branches (Level 4) - Dire Dawa
    kebele_01 = Branch("Kebele 01")
    kebele_02 = Branch("Kebele 02")
    dire_dawa.add_child(kebele_01)
    dire_dawa.add_child(kebele_02)
    print(f"        📁 {kebele_01.name}")
    print(f"        📁 {kebele_02.name}")
    
    # 3. Assign accounts to branches
    print("\n3. Assigning Accounts to Branches...")
    
    # Head Office has 3 accounts
    head_office.add_account(registry.find('A1001'))  # Alice
    head_office.add_account(registry.find('S2001'))  # Bob
    head_office.add_account(registry.find('C3001'))  # Carol
    print(f"  {head_office.name}: 3 accounts")
    
    # Piassa has 2 accounts
    piassa.add_account(registry.find('S2002'))  # David
    piassa.add_account(registry.find('C3002'))  # Eve
    print(f"  {piassa.name}: 2 accounts")
    
    # Bole has 2 accounts
    bole.add_account(registry.find('S2003'))  # Frank
    bole.add_account(registry.find('A1002'))  # Grace
    print(f"  {bole.name}: 2 accounts")
    
    # Bahir Dar has 2 accounts
    bahir_dar.add_account(registry.find('C3003'))  # Henry
    bahir_dar.add_account(registry.find('S2004'))  # Ivy
    print(f"  {bahir_dar.name}: 2 accounts")
    
    # Gondar has 1 account
    gondar.add_account(registry.find('A1003'))  # Jack
    print(f"  {gondar.name}: 1 account")
    
    # Hawassa has 2 accounts
    hawassa.add_account(registry.find('C3004'))  # Karen
    hawassa.add_account(registry.find('S2005'))  # Leo
    print(f"  {hawassa.name}: 2 accounts")
    
    # Arba Minch has 1 account
    arba_minch.add_account(registry.find('A1004'))  # Mia
    print(f"  {arba_minch.name}: 1 account")
    
    # Kebele 01 has 1 account
    kebele_01.add_account(registry.find('C3005'))  # Noah
    print(f"  {kebele_01.name}: 1 account")
    
    # Kebele 02 has 1 account
    kebele_02.add_account(registry.find('S2006'))  # Olivia
    print(f"  {kebele_02.name}: 1 account")
    
    # 4. Perform transfers to build graph
    print("\n4. Performing Transfers (Building Transfer Graph)...")
    
    # Get account objects
    a1001 = registry.find('A1001')  # Alice
    s2001 = registry.find('S2001')  # Bob
    c3001 = registry.find('C3001')  # Carol
    s2002 = registry.find('S2002')  # David
    c3002 = registry.find('C3002')  # Eve
    s2003 = registry.find('S2003')  # Frank
    a1002 = registry.find('A1002')  # Grace
    c3003 = registry.find('C3003')  # Henry
    s2004 = registry.find('S2004')  # Ivy
    a1003 = registry.find('A1003')  # Jack
    c3004 = registry.find('C3004')  # Karen
    s2005 = registry.find('S2005')  # Leo
    a1004 = registry.find('A1004')  # Mia
    c3005 = registry.find('C3005')  # Noah
    s2006 = registry.find('S2006')  # Olivia
    
    # Perform transfers
    print("  Alice → Bob: 100 ETB")
    a1001.transfer(100, s2001)
    
    print("  Bob → Carol: 50 ETB")
    s2001.transfer(50, c3001)
    
    print("  Carol → David: 200 ETB")
    c3001.transfer(200, s2002)
    
    print("  David → Eve: 75 ETB")
    s2002.transfer(75, c3002)
    
    print("  Eve → Frank: 30 ETB")
    c3002.transfer(30, s2003)
    
    print("  Frank → Grace: 150 ETB")
    s2003.transfer(150, a1002)
    
    print("  Grace → Henry: 80 ETB")
    a1002.transfer(80, c3003)
    
    print("  Henry → Ivy: 120 ETB")
    c3003.transfer(120, s2004)
    
    print("  Ivy → Jack: 60 ETB")
    s2004.transfer(60, a1003)
    
    print("  Jack → Karen: 90 ETB")
    a1003.transfer(90, c3004)
    
    print("  Karen → Leo: 110 ETB")
    c3004.transfer(110, s2005)
    
    print("  Leo → Mia: 40 ETB")
    s2005.transfer(40, a1004)
    
    print("  Mia → Noah: 70 ETB")
    a1004.transfer(70, c3005)
    
    print("  Noah → Olivia: 130 ETB")
    c3005.transfer(130, s2006)
    
    # 5. Build transfer graph
    print("\n5. Building Transfer Graph...")
    accounts_list = registry.list_all()
    transfer_graph = build_transfer_graph(accounts_list)
    
    return registry, head_office, transfer_graph


if __name__ == "__main__":
    build_bank_structure()