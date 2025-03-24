import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import SignupForm from "../SignupForm";
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

describe("SignupForm", () => {
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

  it("renders the signup form correctly", () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );

    expect(screen.getByText(/sign up your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  it("validates form fields on submission", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );

    // Submit without filling any fields
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    // Check for validation errors
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please confirm your password/i),
    ).toBeInTheDocument();
  });

  it("validates password matching", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );

    // Fill form with non-matching passwords
    await user.type(screen.getByLabelText(/your name/i), "Test User");
    await user.type(
      screen.getByLabelText(/email address/i),
      "test@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.type(
      screen.getByLabelText(/confirm password/i),
      "differentpassword",
    );
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    // Check for validation error
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it("submits the form successfully and calls the signup API", async () => {
    // Setup mocks
    const mockUserSignup = vi
      .spyOn(authApi, "userSignup")
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
        <SignupForm />
      </BrowserRouter>,
    );

    // Fill and submit the form
    await user.type(screen.getByLabelText(/your name/i), "Test User");
    await user.type(
      screen.getByLabelText(/email address/i),
      "test@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");

    // Mock the file input
    const fileInput = screen.getByLabelText(/upload your photo/i);
    const testFile = new File(["test"], "test.png", { type: "image/png" });
    await user.upload(fileInput, testFile);

    await user.click(screen.getByRole("button", { name: /sign up/i }));

    // Verify API was called with FormData
    await waitFor(() => {
      expect(mockUserSignup).toHaveBeenCalled();
      expect(mockSetUserInfo).toHaveBeenCalledWith(mockUser);
    });
  });

  it("handles API errors gracefully", async () => {
    // Mock an API error
    vi.spyOn(authApi, "userSignup").mockRejectedValue(
      new Error("Signup failed"),
    );

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );

    // Fill and submit the form
    await user.type(screen.getByLabelText(/your name/i), "Test User");
    await user.type(
      screen.getByLabelText(/email address/i),
      "test@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    // Verify that the loading state is set back to false after error
    await waitFor(() => {
      // The button should not be in loading state anymore
      expect(
        screen.getByRole("button", { name: /sign up/i }),
      ).not.toBeDisabled();
    });
  });
});
