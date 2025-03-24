import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Login from "../Login";
import * as UserContext from "../../contexts/UserContext";

// Mock the LoginForm component
vi.mock("../../components/auth/LoginForm", () => ({
  default: () => <div data-testid="mock-login-form">LoginForm Mock</div>,
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

describe("Login Page", () => {
  it("renders the login page with LoginForm component", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    // Check if the main container is rendered
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass("main");

    // Check if the login form container is rendered
    const loginFormContainer =
      screen.getByTestId("mock-login-form").parentElement;
    expect(loginFormContainer).toBeInTheDocument();
    expect(loginFormContainer).toHaveClass("login-form");

    // Check if the mocked LoginForm is rendered
    const loginForm = screen.getByTestId("mock-login-form");
    expect(loginForm).toBeInTheDocument();
    expect(loginForm).toHaveTextContent("LoginForm Mock");
  });
});
