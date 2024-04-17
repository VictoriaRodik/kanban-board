import React from "react";
import Column from "../../../src/components/Column/Column";
import { render, screen } from "@testing-library/react";
import { Props } from "../../../src/components/Column/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { describe, it, beforeEach, expect, vi } from "vitest";

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

describe("Column component", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      columnTitle: "Test Column",
      columnId: "1",
      filteredIssues: [
        {
          id: 1,
          title: "issue title",
          number: 1,
          comments: 5,
          user: { login: "User" },
          created_at: new Date(Date.now()),
          opened: "1 day ago",
          assignee: null,
          state: "opened",
        },
        {
          id: 2,
          title: "title",
          number: 2,
          comments: 3,
          user: { login: "User" },
          created_at: new Date(Date.now()),
          opened: "1 day ago",
          assignee: null,
          state: "opened",
        },
      ],
    };
  });

  it("should render column title correctly", () => {
    render(
      <DragDropContext onDragEnd={vi.fn()}>
        <Droppable droppableId="1">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Column {...props} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );

    expect(screen.getByText("Test Column")).toBeTruthy();

  });

  it("should render issues", () => {
    render(
      <DragDropContext onDragEnd={vi.fn()}>
        <Droppable droppableId="1">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Column {...props} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );

    props.filteredIssues.forEach((issue) => {
      expect(screen.getAllByText(issue.title)).toBeTruthy();
    });
  });
});
