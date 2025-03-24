import { render, screen } from "@testing-library/react";
import FormGroup from "../FormGroup";
import { describe, expect, it } from "vitest";

describe("FormGroup", () => {
  it("renders label and input correctly", () => {
    render(
      <FormGroup
        id="test-input"
        label="Test Label"
        type="text"
        placeholder="Enter test value"
      />,
    );

    const label = screen.getByText("Test Label");
    const input = screen.getByPlaceholderText("Enter test value");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("id", "test-input");
  });

  it("displays error message when provided", () => {
    render(
      <FormGroup
        id="error-input"
        label="Error Field"
        type="text"
        error="This field has an error"
      />,
    );

    const errorMessage = screen.getByText("This field has an error");
    const input = screen.getByLabelText("Error Field");

    expect(errorMessage).toBeInTheDocument();
    expect(input).toHaveClass("form__input--error");
  });

  it("passes additional props to input element", () => {
    render(
      <FormGroup
        id="props-input"
        label="Props Test"
        type="password"
        data-testid="custom-input"
        required
        maxLength={10}
      />,
    );

    const input = screen.getByLabelText("Props Test");

    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("data-testid", "custom-input");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("maxLength", "10");
  });
});
