"""
Day 3 Exercises - Collections, Files & Errors
Level 1: Basic

Covers:
1. Lists & Tuples
2. Dictionaries
3. Sets
"""

# ============================================================
# 1. Lists & Tuples
# ============================================================
print("=== 1. Lists & Tuples ===")

# Create a list of 6 favorite foods
favorite_foods = ["Doro Wat", "Shiro", "Injera", "Tibs", "Kitfo", "Pasta"]
print("Favorite foods:", favorite_foods)

# Print the first and last "city" (interpreting as first/last item of the list,
# matching the pattern from the reading sheet)
print("First food:", favorite_foods[0])
print("Last food:", favorite_foods[-1])

# Add a new food using .append()
favorite_foods.append("Pizza")
print("After append:", favorite_foods)

# Remove the second food using .pop()
removed_food = favorite_foods.pop(1)
print(f"Removed '{removed_food}' using pop(1). List is now:", favorite_foods)

# Create a tuple of coordinates for Ethiopia and unpack it into two variables
ethiopia_coordinates = (9.145, 40.4897)  # (latitude, longitude)
latitude, longitude = ethiopia_coordinates
print(f"Ethiopia coordinates -> latitude: {latitude}, longitude: {longitude}")


# ============================================================
# 2. Dictionaries
# ============================================================
print("\n=== 2. Dictionaries ===")

student = {
    "name": "Selamawit Tesfaye",
    "age": 21,
    "grade": "A",
    "city": "Addis Ababa",
    "department": "Computer Science",
}

# Print the student's name, department, and grade
print("Name:", student["name"])
print("Department:", student["department"])
print("Grade:", student["grade"])

# Add a new key phone
student["phone"] = "0987654321"
print("After adding phone:", student)

# Update the grade
student["grade"] = "A+"
print("After updating grade:", student)


# ============================================================
# 3. Sets
# ============================================================
print("\n=== 3. Sets ===")

# Create a list with duplicate names
names_with_duplicates = ["Abebe", "Kebede", "Abebe", "Marta", "Kebede", "Hana"]
print("Original list with duplicates:", names_with_duplicates)

# Convert it to a set to remove duplicates
unique_names = set(names_with_duplicates)
print("Unique names (set):", unique_names)

# Add a new name to the set
unique_names.add("Dawit")
print("After adding a new name:", unique_names)
