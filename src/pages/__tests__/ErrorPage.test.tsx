import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ErrorPage from "../ErrorPage";
import * as pageHeadUtils from "../../utils/pageHead";

// Mock the setPageTitle function
vi.mock("../../utils/pageHead", () => ({
  setPageTitle: vi.fn(),
}));

describe("ErrorPage", () => {
  const errorMessage = "Test error message";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the error page with the provided message", () => {
    render(<ErrorPage message={errorMessage} />);

    // Check for heading
    expect(
      screen.getByText(/Uh oh! Something went wrong!/i),
    ).toBeInTheDocument();

    // Check for emoji
    expect(screen.getByText(/😢 🤯/i)).toBeInTheDocument();

    // Check for the error message
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    // Check that the main error container exists
    const errorContainer = screen.getByText(errorMessage).closest(".error");
    expect(errorContainer).toBeInTheDocument();
  });

  it("sets the page title on component mount", () => {
    const mockSetPageTitle = vi.mocked(pageHeadUtils.setPageTitle);

    render(<ErrorPage message={errorMessage} />);

    // Check if setPageTitle was called with the correct argument
    expect(mockSetPageTitle).toHaveBeenCalledTimes(1);
    expect(mockSetPageTitle).toHaveBeenCalledWith("Natours");
  });

  it("renders inside a main container with correct class", () => {
    render(<ErrorPage message={errorMessage} />);

    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass("main");
  });

  it("applies correct CSS classes to the error components", () => {
    render(<ErrorPage message={errorMessage} />);

    // Check heading class
    const heading = screen.getByText(/Uh oh! Something went wrong!/i);
    expect(heading).toHaveClass("heading-secondary");
    expect(heading).toHaveClass("heading-secondary--error");

    // Check emoji class
    const emoji = screen.getByText(/😢 🤯/i);
    expect(emoji).toHaveClass("error__emoji");

    // Check error message class
    const message = screen.getByText(errorMessage);
    expect(message).toHaveClass("error__msg");
  });
});
