"""
Day 3 Exercises - Collections, Files & Errors
Level 3: Advanced

Covers:
8. File Reading & Writing
9. Error Handling

(Exercise 10, the Inventory Manager mini project, lives in
day3_mini_project.py)
"""

# ============================================================
# 8. File Reading & Writing
# ============================================================
print("=== 8. File Reading & Writing ===")

STUDENTS_FILE = "students.txt"

students = [
    ("Selam", 88),
    ("Abebe", 76),
    ("Marta", 92),
    ("Dawit", 65),
    ("Hana", 81),
]


def write_students_to_file(filename, students_list):
    """Writes each student's name and score to the file, one per line."""
    with open(filename, "w") as f:
        for name, score in students_list:
            f.write(f"{name},{score}\n")
    print(f"Wrote {len(students_list)} students to {filename}")


def read_students_and_average(filename):
    """Reads the file back and prints the average score.
    Handles the case where the file doesn't exist."""
    try:
        with open(filename, "r") as f:
            lines = f.readlines()
    except FileNotFoundError:
        print(f"Error: '{filename}' does not exist.")
        return

    scores = []
    for line in lines:
        name, score = line.strip().split(",")
        scores.append(int(score))
        print(f" - {name}: {score}")

    if scores:
        average = sum(scores) / len(scores)
        print(f"Average score: {average:.2f}")
    else:
        print("No student records found in the file.")


write_students_to_file(STUDENTS_FILE, students)
read_students_and_average(STUDENTS_FILE)

# Demonstrate the "file doesn't exist" case with a bogus filename
print("\nTrying to read a file that doesn't exist:")
read_students_and_average("does_not_exist.txt")


# ============================================================
# 9. Error Handling
# ============================================================
print("\n=== 9. Error Handling ===")


def divide_two_numbers():
    """Asks the user for two numbers and divides them,
    handling ValueError and ZeroDivisionError."""
    try:
        first_input = input("Enter the first number: ")
        second_input = input("Enter the second number: ")

        first_number = float(first_input)
        second_number = float(second_input)

        result = first_number / second_number
        print(f"Result: {first_number} / {second_number} = {result}")

    except ValueError:
        print("Error: please enter valid numeric values.")
    except ZeroDivisionError:
        print("Error: cannot divide by zero.")
    finally:
        print("Calculation attempt completed.")


divide_two_numbers()
