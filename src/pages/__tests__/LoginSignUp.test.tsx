import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import LoginSignUp from "../LoginSignUp";
import * as UserContext from "../../contexts/UserContext";

// Mock the child components
vi.mock("../../components/auth/LoginForm", () => ({
  default: () => <div data-testid="mock-login-form">LoginForm Mock</div>,
}));

vi.mock("../../components/auth/SignupForm", () => ({
  default: () => <div data-testid="mock-signup-form">SignupForm Mock</div>,
}));

// Mock the UserContext
vi.mock("../../contexts/UserContext", () => ({
  default: vi.fn(() => ({
    setUserInfo: vi.fn(),
    userInfo: { _id: "", name: "", email: "", photo: "", role: "user" },
    isUserLoggedIn: false,
    removeUser: vi.fn(),
  })),
}));

describe("LoginSignUp Page", () => {
  it("renders with login form initially", () => {
    render(
      <BrowserRouter>
        <LoginSignUp />
      </BrowserRouter>,
    );

    // Check if main container is rendered
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass("main");

    // Check if login form is initially visible
    expect(screen.getByTestId("mock-login-form")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-signup-form")).not.toBeInTheDocument();

    // Check if both login and signup tabs are rendered
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  it("switches between login and signup forms when tabs are clicked", () => {
    render(
      <BrowserRouter>
        <LoginSignUp />
      </BrowserRouter>,
    );

    // Initially login form should be visible
    expect(screen.getByTestId("mock-login-form")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-signup-form")).not.toBeInTheDocument();

    // Click the signup tab
    const signupTab = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(signupTab);

    // Now signup form should be visible
    expect(screen.getByTestId("mock-signup-form")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-login-form")).not.toBeInTheDocument();

    // Click the login tab again
    const loginTab = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginTab);

    // Login form should be visible again
    expect(screen.getByTestId("mock-login-form")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-signup-form")).not.toBeInTheDocument();
  });

  it("highlights the active tab correctly", () => {
    render(
      <BrowserRouter>
        <LoginSignUp />
      </BrowserRouter>,
    );

    const loginTab = screen.getByRole("button", { name: /login/i });
    const signupTab = screen.getByRole("button", { name: /sign up/i });

    // Initially login tab should be active
    expect(loginTab).toHaveClass("active");
    expect(signupTab).not.toHaveClass("active");

    // Click the signup tab
    fireEvent.click(signupTab);

    // Now signup tab should be active
    expect(signupTab).toHaveClass("active");
    expect(loginTab).not.toHaveClass("active");

    // Click the login tab again
    fireEvent.click(loginTab);

    // Login tab should be active again
    expect(loginTab).toHaveClass("active");
    expect(signupTab).not.toHaveClass("active");
  });
});
