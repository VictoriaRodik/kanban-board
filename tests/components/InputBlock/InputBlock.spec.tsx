import React from "react";
import InputBlock from "../../../src/components/InputBlock/InputBlock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("antd", async () => {
    const actual = await vi.importActual("antd")
    return {
      ...actual,
      Flex: vi.fn(({ children }) => <div>{children}</div>),
      Input: vi.fn(({ children }) => <input>{children}</input>),
      Button: vi.fn(({ children }) => <button>{children}</button>),
    }
  })

describe("InputBlock component", () => {
  const mockedOnLoadissues =  vi.fn();
  const mockSetRepoURL = vi.fn();

  beforeEach(() => {
    render(<InputBlock onLoadIssues={mockedOnLoadissues} setRepoURL={mockSetRepoURL} />);
  });

  it("should render the elements ", () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeTruthy;
    const button = screen.getByText("Load Issues");
    expect(button).toBeTruthy;
    const links = screen.getAllByRole("button");
    expect(links.length).toEqual(4);

  });
});
