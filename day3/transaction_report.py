totals = {}

try:
    # Read the transaction file
    with open("transactions.txt", "r") as file:
        for line in file:
            name, amount = line.strip().split(",")
            amount = float(amount)

            if name in totals:
                totals[name] += amount
            else:
                totals[name] = amount

    # Sort customers by total spending (highest first)
    sorted_totals = sorted(
        totals.items(),
        key=lambda item: item[1],
        reverse=True
    )

    # Print results
    print("Customer Summary")
    print("----------------")

    for name, total in sorted_totals:
        print(f"{name}: {total} ETB")

    # Write results to report.txt
    with open("report.txt", "w") as report:
        report.write("Customer Summary\n")
        report.write("----------------\n")

        for name, total in sorted_totals:
            report.write(f"{name}: {total} ETB\n")

    print("\nReport saved to report.txt")
except FileNotFoundError:
    print("Error: transactions.txt not found.")