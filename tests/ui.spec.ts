import { test, expect } from '@playwright/test';

test('Main screen renders correctly', async ({ page }) => {
  const response = await page.goto('http://localhost:3000');
  expect(response?.ok()).toBeTruthy(); // ← ודא שהדף אכן נטען
  await page.pause();
  // עכשיו תמשיך
  await expect(page.getByRole('heading', { name: /Numbers 1 to 10/i })).toBeVisible();
  await page.pause();
  // Check that number buttons 0-9 are present
  for (let i = 0; i <= 9; i++) {
    await expect(page.getByRole('button', { name: `${i}` })).toBeVisible();
  }
  await page.pause();
  // Check that the input boxes are present
  const inputBoxes = await page.locator('[data-testid="answer-box"]');
  await expect(inputBoxes).toHaveCount(10);

  // Check that the reference series is visible
  const referenceNumbers = await page.locator('[data-testid="reference-number"]');
  await expect(referenceNumbers).toHaveCount(10);
}); 