import React from "react";
import IssueCard from "../../../src/components/IssueCard/IssueCard";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";


vi.mock("antd", async () => {
  const actual = await vi.importActual("antd")
  return {
    ...actual,
    Flex: vi.fn(({ children }) => <div>{children}</div>),
    Card: vi.fn(({ children }) => <div>{children}</div>)
  }
})



describe("IssueCard component", () => {
  const mockedIssue = {
    id: 1,
    title: "issue title",
    number: 1,
    comments: 5,
    user: { login: "User" },
    created_at: new Date(Date.now()),
    opened: "1 day ago",
    assignee: null,
    state: "opened",
  };

  beforeEach(() => {
    render(<IssueCard issue={mockedIssue} />);
  });

  it("should render issue props", () => {
    const title = screen.getByText("issue title");
    expect(title).toBeTruthy;

    const number = screen.getByText("#1");
    expect(number).toBeTruthy;

    const user = screen.getByText("User");
    expect(user).toBeTruthy;

    const comments = screen.getByText("| Comments: 5");
    expect(comments).toBeTruthy;
  });
});
