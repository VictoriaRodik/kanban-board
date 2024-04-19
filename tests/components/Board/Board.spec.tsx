import React from "react";
import Board from "../../../src/components/Board/Board";
import { render, screen } from "@testing-library/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";


const mockedHandleDragEnd = vi.fn()

const sessionStorageMock = (() => {
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

const mockedDragEnd = (
  getByTestId: any,
  draggableId: string,
  destination: { droppableId: string; index: number }
) => {
  const draggable = getByTestId(draggableId);
  fireEvent.dragStart(draggable);
  const droppable = getByTestId(destination.droppableId);
  fireEvent.dragEnter(droppable);
  fireEvent.dragOver(droppable);
  fireEvent.drop(droppable);
  fireEvent.dragEnd(draggable);
};

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

vi.mock("antd", async () => {
  const actual = await vi.importActual("antd");
  return {
    ...actual,
    Row: vi.fn(({ children }) => <div>{children}</div>),
    Col: vi.fn(({ children }) => <div>{children}</div>),
  };
});

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

  it("should drag and drop an issue and save the new order", () => {
    render(
      <DragDropContext onDragEnd={mockedHandleDragEnd}>
        <Board />
      </DragDropContext>
    );
  
    const draggableId = "1";
    const destination = { droppableId: "2", index: 0 };
    const draggableElement = screen.getByTestId(draggableId);
  
    fireEvent.dragStart(draggableElement);
    fireEvent.drop(draggableElement);
  
    expect(mockedHandleDragEnd).toHaveBeenCalled();
    expect(mockedHandleDragEnd).toHaveBeenCalledWith({
      draggableId,
      destination,
    });
  
    expect(sessionStorageMock.setItem).toHaveBeenCalled();
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
