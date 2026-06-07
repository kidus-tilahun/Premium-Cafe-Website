import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EventsPage from "../pages/Events";

describe("Events page — inquiry form", () => {
  test("name and email inputs reflect typed values", () => {
    render(<EventsPage />);
    const nameInput = screen.getByTestId(
      "input-events-name",
    ) as HTMLInputElement;
    const emailInput = screen.getByTestId(
      "input-events-email",
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });

    expect(nameInput.value).toBe("Jane Doe");
    expect(emailInput.value).toBe("jane@example.com");
  });

  test("Continue button shows disabled state when required fields are empty", () => {
    render(<EventsPage />);
    const nextBtn = screen.getByTestId("btn-events-next");
    expect(nextBtn.className).toContain("opacity-30");
  });

  test("Continue button activates when step-0 required fields are filled", () => {
    render(<EventsPage />);
    fireEvent.change(screen.getByTestId("input-events-name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByTestId("input-events-email"), {
      target: { value: "jane@example.com" },
    });
    expect(screen.getByTestId("btn-events-next").className).toContain(
      "opacity-100",
    );
  });
});
