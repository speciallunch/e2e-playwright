import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React App/);
});

test("has text", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page.locator("#root")).toHaveText(/Vue/);
});

test("get started link", async ({ page, context }) => {
  await page.goto("http://localhost:3000/");

  // Start waiting for new page before clicking. Note no await.
  const pagePromise = context.waitForEvent("page");

  // Click the get started link.
  await page.getByRole("link", { name: "Learn React" }).click();
  const linkPage = await pagePromise;
  await linkPage.waitForLoadState();
  console.log(await linkPage.title());

  // Expects the URL to contain intro.
  await expect(linkPage).toHaveURL(/react.dev/);
});
