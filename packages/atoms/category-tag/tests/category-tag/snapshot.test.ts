import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Navigate to your test page
  await page.goto('category-tag');
});

test.describe("@budget/category-tag visual regression", () => {
  test('default snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot();
  });
})
