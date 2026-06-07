import { test, expect } from "@playwright/test";

test.describe("Visual responsiveness — homepage", () => {
  test("loads at mobile viewport (390px) with HTTP 200 and no runtime errors", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto("/");

    expect(response?.status()).toBe(200);
    expect(errors).toHaveLength(0);
    await expect(page.locator('[data-testid="utility-hours"]')).toBeVisible();
  });

  test("loads at desktop viewport (1440px) with HTTP 200 and no runtime errors", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto("/");

    expect(response?.status()).toBe(200);
    expect(errors).toHaveLength(0);
    await expect(page.locator('[data-testid="utility-hours"]')).toBeVisible();
  });
});
