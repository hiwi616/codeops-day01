#variables and Data Types
full_name = "Hiwot Ketema"
age = 26
height = 1.70
is_student = False
favorite_food = "injera"
print("====My Information ====")
print(f"My name is {full_name}.")
print(f"I am {age} Years old.")
print(f"My height is {height} meters.")
print(f"Am I a student?{is_student}")
print(f"My favorite food is {favorite_food}.")
print()

# 2. Artimatic Operations
print("====Arithmetic Operations====")
num1 = float(input("Enter first number: "))
num2 = float(input("enter second number: "))

print(f"Sum = {num1 + num2}")
print(f"Difference = {num1 - num2}")
print(f"Product = {num1 * num2}") 
print(f"division = {num1/num2}")
print(f"Floor Division = {num1//num2}")
print(f"Remainder = {num1 % num2}")
print()

# 3 .Type Conversion
birth_year = int(input("Enter Your birth year: "))
current_year = 2026
user_age = current_year - birth_year
print(f"you are {user_age} years old.")
print()


# 4. Simple Decision

score = int(input("enter your score(0-100): "))
if score >= 50:
    print("pass")
else:
    print("fail")
    