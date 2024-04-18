import React from "react";
import Board from "../../../src/components/Board/Board";
import { render, screen } from "@testing-library/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

const columns = [
  { columnId: "1", columnTitle: "To Do" },
  { columnId: "2", columnTitle: "In Progress" },
  { columnId: "3", columnTitle: "Done" },
];

const mockedHandleDragEnd = vi.fn();
const mockedSaveToSessionStorage = vi.fn();
const mockedSetIssues = vi.fn();

const mockIssues = [
  { id: "1", state: "open", assignee: null },
  { id: "2", state: "open", assignee: null },
];

vi.mock("antd", async () => {
  const actual = await vi.importActual("antd");
  return {
    ...actual,
    Row: vi.fn(({ children }) => <div>{children}</div>),
    Col: vi.fn(({ children }) => <div>{children}</div>),
  };
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
      <div data-testid="column">
        <span>{columnTitle}</span>
        <div>{filteredIssues}</div>
      </div>
    );
  },
}));

describe("Board component", () => {
  beforeEach(() => {
    render(<Board />);
  });

  beforeEach(() => {
    const sessionStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, "sessionStorage", {
      value: sessionStorageMock,
      writable: true,
    });
  });

  it("should render columns", () => {
    const columnElements = screen.getAllByTestId("column");
    expect(columnElements.length).toBe(columns.length);
  });

  it("should render column titles", () => {
    columns.forEach((column) => {
      expect(screen.getByText(column.columnTitle)).toBeInTheDocument();
    });
  });

  // it("should pass filtered issues to columns", () => {
  //   columns.forEach((column) => {
  //     const columnElement = screen.getByText(column.columnTitle);
  //     const filteredIssuesElement = screen.getByText();
  //     expect(filteredIssuesElement).not.toBeNull();
  //   });
  // });

//   it("should save data to session storage", () => {
//     const key = "test-key";
//     const data = [
//       { id: "1", title: "Issue 1" },
//       { id: "2", title: "Issue 2" },
//     ];

//     expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
//       key,
//       JSON.stringify(data)
//     );
//   });

//   it("should handle drag end and update issues", () => {
//     const draggableId = "1";
//     const source = { droppableId: "1", index: 0 };
//     const destination = { droppableId: "2", index: 0 };
//     fireEvent.dragEnd(screen.getByText("To Do"), {
//       draggableId,
//       source,
//       destination,
//     });

//     expect(mockedSetIssues).toHaveBeenCalled();
//     expect(mockedSaveToSessionStorage).toHaveBeenCalled();
//   });
});
