import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../contexts/UserContext";

// Add any providers here
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <UserProvider>{children}</UserProvider>
    </BrowserRouter>
  );
};

// Custom render function with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing-library
export * from "@testing-library/react";

// Override render method
export { customRender as render };
