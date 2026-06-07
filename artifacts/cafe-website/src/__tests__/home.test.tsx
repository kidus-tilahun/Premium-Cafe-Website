import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Router } from "wouter";
import Home from "../pages/Home";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Router>{children}</Router>
);

describe("Home page", () => {
  test("renders hero section with utility bar", () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByTestId("utility-hours")).toBeInTheDocument();
    expect(screen.getByText(/Open Until 7 PM/i)).toBeInTheDocument();
  });

  test("renders Footer component with social links", () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByTestId("link-social-instagram")).toBeInTheDocument();
    expect(screen.getByTestId("link-social-twitter")).toBeInTheDocument();
  });

  test("hero CTA buttons are present and linked", () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByTestId("link-order-now")).toBeInTheDocument();
    expect(screen.getByTestId("link-view-menu")).toBeInTheDocument();
  });
});
