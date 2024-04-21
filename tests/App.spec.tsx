import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../src/App";

const mockedSetIssues = vi.fn();
const mockedFetchIssues =vi.fn(() => [{ id: 1, title: "Mock Issue" }])

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

vi.mock("../../../src/zustand/store", () => ({
  useStore: vi.fn(() => ({
    repoURL: "https://github.com/facebook/react",
  })),
}));

vi.mock("../src/services/issue-service", () => {
  return {
    __esModule: true,
    fetchIssues: mockedFetchIssues,
  };
});

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


  it("should log an error when fetchIssues throws an error", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    vi.mock("../src/services/issue-service", () => ({
      __esModule: true,
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
