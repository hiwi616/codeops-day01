# Day2 Level 2 Exercises
#---------------------------------------------------

# 5. Grade Classifier

score = int(input("Enter your score:"))

if 90 <= score <= 100:
    print("Excellent.")
elif 80 <= score <=89:
    print("Very Good.")
elif 70 <= score <=79:
    print("Good:")
elif 50 <= score <= 69:
    print("pass.")
else:
    print("Fail.")
    
    print()

    # 6 . Number Pattern

    print("Numbers from 1 to 20")

    for number in range(1, 21):
        if number % 2 != 0:
         print(f"{number} is odd")
        if number % 5 == 0:
            print(f"{number} is divisible by 5")
    print()

    # 7 . While Loop Practice

    total = 0
    while True:
        number = float(input("Enter a positive number (0 to stop):"))
        if number == 0:
            break
        total += number
    print(f"Total sum = {total}")
    print()
# 8. Function Practice

def greet(name):
    print(f"Welcome, {name}!")
def square(number):
    return number * number
def is_even(number):
    return number % 2 == 0

greet("Hiwot") 
print(f"square of 66 is {square(6)}")
print(f"Is 8 even? {is_even(8)}")  


