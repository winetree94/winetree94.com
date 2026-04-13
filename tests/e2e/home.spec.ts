import { expect, test, type Page } from "@playwright/test";

async function getBodyFontFamily(page: Page) {
  return page.evaluate(() => getComputedStyle(document.body).fontFamily);
}

test("root route redirects to the English home page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL("/en/");
  await expect(
    page.getByText("Hello! I'm a front-end developer from South Korea."),
  ).toBeVisible();

  await page.reload();

  await expect(page).toHaveURL("/en/");
});

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

test("pages apply the language-specific font stack", async ({ page }) => {
  await page.goto("/en/");

  await expect.poll(() => getBodyFontFamily(page)).toContain("Agave");

  await page.goto("/ko/");

  await expect
    .poll(() => getBodyFontFamily(page))
    .toContain("IBM Plex Sans KR");
});
