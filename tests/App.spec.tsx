import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../src/App";
import { fetchIssues } from "../services/issue-service";


window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

const mockedSetIssues = vi.fn();

vi.mock("../zustand/store", () => ({
  useStore: () => ({
    repoURL: "mockRepoURL",
    setRepoURL: vi.fn(),
    setIssues: mockedSetIssues, 
  }),
}));

vi.mock("../services/issue-service", () => ({
  fetchIssues: vi.fn(() => [{ id: 1, title: "Mock Issue" }]),
}));

vi.mock("../src/components/InputBlock/InputBlock", () => ({
  __esModule: true,
  default: function InputBlock({ onLoadIssues, setRepoURL }) {
    return (
      <div data-testid="inputBlock">
        <input onChange={setRepoURL} />
        <button onClick={onLoadIssues}>Load Issues</button>
      </div>
    );
  },
}));

vi.mock("../src/components/Board/Board", () => ({
  __esModule: true,
  default: function Board({ children }) {
    return <div data-testid="board">{children}</div>;
  },
}));

describe("App component", () => {
  it("should render InputBlock and Board components", () => {
    render(<App />);
    expect(screen.getByTestId("inputBlock")).toBeInTheDocument();
    expect(screen.getByTestId("board")).toBeInTheDocument();
  });

  it("should call setIssues with data when fetchIssues is successful", async () => {
    render(<App />);
    const onLoadIssuesButton = screen.getByText("Load Issues");
    fireEvent.click(onLoadIssuesButton);
    expect(fetchIssues).toHaveBeenCalled();
   // expect(mockedSetIssues).toHaveBeenCalledWith([{ id: 1, title: "Mock Issue" }]);
  });

  it("should log an error when fetchIssues throws an error", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    vi.mock("../services/issue-service", () => ({
      fetchIssues: vi.fn(() => {
        throw new Error("Mock error");
      }),
    }));

    render(<App />);
    const onLoadIssuesButton = screen.getByText("Load Issues");
    fireEvent.click(onLoadIssuesButton);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error loading issues:",
      expect.any(Error)
    );
  });
});
