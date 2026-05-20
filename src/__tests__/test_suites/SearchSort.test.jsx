import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  { id: 1, date: "2024-01-01", description: "Groceries", category: "Food", amount: 50.00 },
  { id: 2, date: "2024-01-02", description: "Netflix", category: "Entertainment", amount: 15.00 },
  { id: 3, date: "2024-01-03", description: "Amazon", category: "Shopping", amount: 75.00 },
];

beforeEach(() => {
  global.setFetchResponse(mockTransactions);
});

describe("Search and Sort Transactions", () => {
  it("filters transactions when search input changes", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      { target: { value: "Netflix" } }
    );

    await waitFor(() => {
      expect(screen.getByText("Netflix")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });

  it("shows all transactions when search is cleared", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      { target: { value: "Netflix" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      { target: { value: "" } }
    );

    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
      expect(screen.getByText("Netflix")).toBeInTheDocument();
    });
  });

  it("returns no results for a non-matching search term", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      { target: { value: "zzzzz" } }
    );

    await waitFor(() => {
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
      expect(screen.queryByText("Netflix")).not.toBeInTheDocument();
    });
  });
});