import React from "react";
import InputBlock from "../../../src/components/InputBlock/InputBlock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

const mockedOnLoadissues = vi.fn();
const mockSetRepoURL = vi.fn();

vi.mock("../../../src/zustand/store", () => ({
  useStore: vi.fn(() => ({
    repoURL: "https://github.com/facebook/react",
  })),
}));

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
    expect(links.length).toEqual(2);
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

  it("should render links if url is not empty", () => {
    const symbol = screen.getByText(/>/);
    const react = screen.getByText(/react/i);
    const facebook = screen.getByText(/facebook/i);
    expect(symbol).toBeInTheDocument();
    expect(react).toBeInTheDocument();
    expect(facebook).toBeInTheDocument();
  });
});
