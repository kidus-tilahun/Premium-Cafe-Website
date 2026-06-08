import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EventsPage from "../pages/Events";

vi.mock("@workspace/api-client-react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@workspace/api-client-react")>();
  return {
    ...actual,
    useCreateEventInquiry: () => ({
      mutate: vi.fn(),
      isPending: false,
      isError: false,
      isSuccess: false,
      error: null,
      reset: vi.fn(),
    }),
  };
});

function renderEventsPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <EventsPage />
    </QueryClientProvider>,
  );
}

describe("Events page — inquiry form", () => {
  test("name and phone inputs reflect typed values", () => {
    renderEventsPage();
    const nameInput = screen.getByTestId(
      "input-events-name",
    ) as HTMLInputElement;
    const phoneInput = screen.getByTestId(
      "input-events-phone",
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(phoneInput, { target: { value: "+251911234567" } });

    expect(nameInput.value).toBe("Jane Doe");
    expect(phoneInput.value).toBe("+251911234567");
  });

  test("Continue button shows disabled state when required fields are empty", () => {
    renderEventsPage();
    const nextBtn = screen.getByTestId("btn-events-next");
    expect(nextBtn.className).toContain("opacity-30");
  });

  test("Continue button activates when step-0 required fields are filled", () => {
    renderEventsPage();
    fireEvent.change(screen.getByTestId("input-events-name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByTestId("input-events-phone"), {
      target: { value: "+251911234567" },
    });
    expect(screen.getByTestId("btn-events-next").className).toContain(
      "opacity-100",
    );
  });
});
