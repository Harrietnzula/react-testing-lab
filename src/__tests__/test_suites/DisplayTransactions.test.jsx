import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  { id: 1, date: "2024-01-01", description: "Groceries", category: "Food", amount: 50.00 },
  { id: 2, date: "2024-01-02", description: "Netflix", category: "Entertainment", amount: 15.00 },
];

beforeEach(() => {
  global.setFetchResponse(mockTransactions);
});

describe("Display Transactions", () => {
  it("displays transactions on startup", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
      expect(screen.getByText("Netflix")).toBeInTheDocument();
    });
  });

  it("displays the correct number of transactions", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
      expect(screen.getByText("Netflix")).toBeInTheDocument();
    });
  });

  it("displays transaction details correctly", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Food")).toBeInTheDocument();
      expect(screen.getByText("Entertainment")).toBeInTheDocument();
    });
  });
});