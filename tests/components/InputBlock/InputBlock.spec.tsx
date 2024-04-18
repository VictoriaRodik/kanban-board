import React from "react";
import InputBlock from "../../../src/components/InputBlock/InputBlock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockedOnLoadissues = vi.fn();
const mockSetRepoURL = vi.fn();

vi.mock("antd", async () => {
  const actual = await vi.importActual("antd");
  return {
    ...actual,
    Flex: vi.fn(({ children }) => <div>{children}</div>),
  };
});

describe("InputBlock component", () => {
  beforeEach(() => {
    render(
      <InputBlock
        onLoadIssues={mockedOnLoadissues}
        setRepoURL={mockSetRepoURL}
      />
    );
  });

  it("should render the elements ", () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    const button = screen.getByText("Load Issues");
    expect(button).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links.length).toEqual(1);
  });

  it("should render links if url is not empty", () => {
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Load Issues");
  
    expect(screen.queryByText(">")).not.toBeInTheDocument();
  
    fireEvent.change(input, { target: { value: "https://github.com/facebook/react" } });
    fireEvent.click(button);
  
    const linkButton = screen.getByText(">");
    expect(linkButton).toBeInTheDocument();
  });

  it("should not render links if url is empty", () => {
    const links = screen.getAllByRole("link");
    links.forEach((link) => expect(link).toBeEmptyDOMElement());
  });

  it("should call the setRepoURL function ", () => {
    const input = screen.getByRole("textbox");
    const url = "https://github.com/facebook/react";

    fireEvent.change(input, { target: { value: url } });
    expect(mockSetRepoURL).toHaveBeenCalledWith(url);
  });

  it("should call the loadIssues function ", () => {
    const button = screen.getByText("Load Issues");
    fireEvent.click(button);
    expect(mockedOnLoadissues).toHaveBeenCalled();
  });
});
