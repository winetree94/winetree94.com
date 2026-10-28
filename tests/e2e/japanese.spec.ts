import { expect, test } from "@playwright/test";

test("Japanese home page renders translated content", async ({ page }) => {
  await page.goto("/ja/");

  await expect(page).toHaveTitle(/winetree94/i);
  await expect(
    page.getByText("こんにちは！韓国のフロントエンド開発者です。"),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
});

test("Japanese article links to the other translations", async ({ page }) => {
  await page.goto("/ja/article/vector-optimizer/");

  await expect(
    page.getByRole("heading", {
      name: "ユーザーのペン入力を自然に、Vector Optimizer",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("この記事は他の言語でも読めます。"),
  ).toBeVisible();

  await page.getByRole("link", { name: "English" }).first().click();

  await expect(page).toHaveURL("/en/article/vector-optimizer/");
  await expect(
    page.getByRole("heading", {
      name: "Vector Optimizer: Enhancing Natural Pen Input",
    }),
  ).toBeVisible();
});
