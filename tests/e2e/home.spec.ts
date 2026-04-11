import { expect, test } from "@playwright/test";

test("English home page renders with the main intro content", async ({
  page,
}) => {
  await page.goto("/en/");

  await expect(page).toHaveTitle(/winetree94/i);
  await expect(
    page.getByText("Hello! I'm a front-end developer from South Korea."),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "한국어" })).toBeVisible();
});
