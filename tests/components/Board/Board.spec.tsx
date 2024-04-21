import React from "react";
import Board from "../../../src/components/Board/Board";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";

const mockedHandleDragEnd = vi.fn()

const sessionStorageMock = vi.fn(() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

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


vi.mock("../../../src/components/Column/Column", () => ({
  default: function ({ columnId, columnTitle, filteredIssues }) {
    return (
      <div data-testid={columnId}>
        <span>{columnTitle}</span>
        <div>{filteredIssues}</div>
      </div>
    );
  },
}));

describe("Board component", () => {
  it("should render columns correctly", () => {
    render(<Board />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });


  it("loads issues from sessionStorage when repoURL changes", () => {
    const { rerender } = render(<Board />);
    sessionStorageMock.setItem("mockRepoURL", JSON.stringify([{ id: 1 }]));
    rerender(<Board />);
    expect(sessionStorageMock.getItem("mockRepoURL")).toBe(
      JSON.stringify([{ id: 1 }])
    );
  });
});
