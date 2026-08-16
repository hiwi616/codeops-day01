# Day 6 — SOLID Principles & Design Patterns

Python exercises covering SOLID principles and common design patterns, culminating in a menu-driven mini project.

## Files

- **`basic.py`** — SRP (Employee refactor), OCP (bonus calculation via subclasses), LSP (Bird/Penguin fix), and identifying SOLID violations in a given snippet.
- **`intermidiate.py`** — SRP + DIP (Account with injected Notifier/Repository), Factory Pattern (`AccountFactory`), Observer Pattern (large withdrawal alerts), and ISP (`InterestBearing` interface).
- **`advanced.py`** — Full SOLID refactor of a "god class" Account, combining Factory + Observer + Singleton (`BankConfig`), and a refactoring challenge adding `InvestmentAccount` without touching existing code.
- **`mini_project.py`** — **Clean Addis Bank System**: a menu-driven console banking app that ties everything together — `AccountFactory` for account creation, `BankConfig` (Singleton) for bank-wide rules, Observer pattern for large-withdrawal SMS/audit alerts, and a bonus "apply interest to all accounts" feature added without breaking existing code. Includes input validation and error handling.

## Run

```bash
python3 basic.py
python3 intermidiate.py
python3 advanced.py
python3 mini_project.py   # interactive menu
```

Each file's `demo_*()` functions (or the interactive menu in `mini_project.py`) show the concepts in action, with comments throughout explaining the "before" (violation) and "after" (fix) for each principle.
