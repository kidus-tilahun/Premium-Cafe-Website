import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import MenuPage from "../pages/Menu";
import { MENU_ITEMS } from "../data/menu";

// AnimatePresence holds DOM nodes during exit animations (jsdom has no real
// animation loop). Mock it as an immediate passthrough so exit tests are
// deterministic: when children evaluate to null/false the node disappears.
vi.mock("framer-motion", async (importOriginal) => {
  const fm = await importOriginal<typeof import("framer-motion")>();
  return {
    ...fm,
    AnimatePresence: ({ children }: { children?: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children ?? null),
  };
});

describe("Menu page", () => {
  test("renders first and last menu item cards", () => {
    render(<MenuPage />);
    expect(
      screen.getByTestId(`card-menu-item-${MENU_ITEMS[0].id}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`card-menu-item-${MENU_ITEMS.at(-1)!.id}`),
    ).toBeInTheDocument();
  });

  test("clicking a menu card mounts the item detail modal", async () => {
    render(<MenuPage />);
    fireEvent.click(
      screen.getByTestId(`card-menu-item-${MENU_ITEMS[0].id}`),
    );
    expect(await screen.findByTestId("btn-add-to-order")).toBeInTheDocument();
    expect(screen.getByTestId("btn-close-modal")).toBeInTheDocument();
    expect(screen.getByTestId("btn-cancel-order")).toBeInTheDocument();
  });

  test("closing the modal via the X button unmounts it", async () => {
    render(<MenuPage />);
    fireEvent.click(
      screen.getByTestId(`card-menu-item-${MENU_ITEMS[0].id}`),
    );
    const closeBtn = await screen.findByTestId("btn-close-modal");
    fireEvent.click(closeBtn);
    await waitFor(() =>
      expect(
        screen.queryByTestId("btn-add-to-order"),
      ).not.toBeInTheDocument(),
    );
  });
});
