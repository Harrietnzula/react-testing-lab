import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  { id: 1, date: "2024-01-01", description: "Groceries", category: "Food", amount: 50.00 },
];

const newTransaction = {
  id: 2,
  date: "2024-01-03",
  description: "New Purchase",
  category: "Shopping",
  amount: 100.00,
};

beforeEach(() => {
  global.setFetchResponse(mockTransactions);
});

describe("Add Transactions", () => {
  it("adds a new transaction to the frontend after form submission", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
    });

    // Set mock BEFORE submitting
    global.setFetchResponse(newTransaction);

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "New Purchase", name: "description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Shopping", name: "category" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: 100, name: "amount" },
    });

    // Submit the form directly instead of clicking button
    fireEvent.submit(screen.getByRole("button", { name: "Add Transaction" }).closest("form"));

    await waitFor(() => {
      expect(screen.getByText("New Purchase")).toBeInTheDocument();
    });
  });

  it("makes a POST request when a new transaction is submitted", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
    });

    global.setFetchResponse(newTransaction);

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "New Purchase", name: "description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Shopping", name: "category" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: 100, name: "amount" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Add Transaction" }).closest("form"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/transactions",
        expect.objectContaining({ method: "POST" })
      );
    });
  });
});