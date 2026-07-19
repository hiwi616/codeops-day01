
# ---------------------------------------
# Day 2 Level 3 Exercises
# ---------------------------------------

# 9. Tip Calculator

def calculate_tip(bill, percent):
    return bill * percent / 100

def total_per_person(total, people):
    return total / people

bill = float(input("Enter bill amount: "))
tip_percent = int(input("Enter tip percentage (10, 15, 20): "))
people = int(input("Number of people: "))

tip = calculate_tip(bill, tip_percent)
total = bill + tip
each = total_per_person(total, people)

print(f"Tip Amount: {tip}")
print(f"Total Amount: {total}")
print(f"Each Person Pays: {each}")

print()

# 10. Simple Quiz Game

def ask(question, answer):
    user = input(question + " ")
    return user.lower() == answer.lower()

score = 0

if ask("1. Capital of Ethiopia?", "Addis Ababa"):
    score += 1

if ask("2. 5 + 5?", "10"):
    score += 1

if ask("3. What color is the sky?", "Blue"):
    score += 1

if ask("4. Largest continent?", "Asia"):
    score += 1

if ask("5. Python is a programming __?", "Language"):
    score += 1

print(f"\nFinal Score: {score}/5")

if score == 5:
    print("Excellent!")
elif score >= 3:
    print("Good Job!")
else:
    print("Keep Practicing!")

print()

# 11. Function with Default & Return

def calculate_final_price(price, tax_rate=0.15, discount=0):
    tax = price * tax_rate
    final_price = price + tax - discount
    return final_price

print(calculate_final_price(100))
print(calculate_final_price(100, discount=20))
print(calculate_final_price(100, tax_rate=0.18, discount=10))