import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../LoginForm";
import * as authApi from "../../../api/auth";
import * as UserContext from "../../../contexts/UserContext";

// Mock the modules
vi.mock("../../../api/auth");
vi.mock("../../../contexts/UserContext", () => ({
  default: vi.fn(() => ({
    setUserInfo: vi.fn(),
  })),
}));

// Mock the useNavigate hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("LoginForm", () => {
  const mockUser = {
    _id: "user123",
    name: "Test User",
    email: "test@example.com",
    photo: "test.jpg",
    role: "user",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the login form correctly", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    expect(screen.getByText(/log into your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("validates form fields on submission", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    // Submit without filling any fields
    await user.click(screen.getByRole("button", { name: /login/i }));

    // Check for validation errors
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    // Enter invalid email
    await user.type(screen.getByLabelText(/email address/i), "invalid-email");
    await user.click(screen.getByRole("button", { name: /login/i }));

    // Check for validation error
    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it("validates password length", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    // Enter short password
    await user.type(
      screen.getByLabelText(/email address/i),
      "test@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "short");
    await user.click(screen.getByRole("button", { name: /login/i }));

    // Check for validation error
    expect(
      screen.getByText(/password must be at least 8 characters/i),
    ).toBeInTheDocument();
  });

  it("submits the form successfully and calls the login API", async () => {
    // Setup mocks
    const mockUserLogin = vi
      .spyOn(authApi, "userLogin")
      .mockResolvedValue(mockUser);
    const mockSetUserInfo = vi.fn();
    vi.mocked(UserContext.default).mockReturnValue({
      setUserInfo: mockSetUserInfo,
      userInfo: { _id: "", name: "", email: "", photo: "", role: "user" },
      isUserLoggedIn: false,
      removeUser: vi.fn(),
    });

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    // Fill and submit the form
    await user.type(
      screen.getByLabelText(/email address/i),
      "test@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password12345");
    await user.click(screen.getByRole("button", { name: /login/i }));

    // Verify API was called with correct parameters
    await waitFor(() => {
      expect(mockUserLogin).toHaveBeenCalledWith(
        "test@example.com",
        "password12345",
      );
      expect(mockSetUserInfo).toHaveBeenCalledWith(mockUser);
    });
  });

  it("handles API errors gracefully", async () => {
    // Mock an API error
    vi.spyOn(authApi, "userLogin").mockRejectedValue(new Error("Login failed"));

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    // Fill and submit the form
    await user.type(
      screen.getByLabelText(/email address/i),
      "test@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password12345");
    await user.click(screen.getByRole("button", { name: /login/i }));

    // Verify that the loading state is set back to false after error
    await waitFor(() => {
      // The button should not be in loading state anymore
      expect(screen.getByRole("button", { name: /login/i })).not.toBeDisabled();
    });
  });
});
