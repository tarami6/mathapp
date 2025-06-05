import { test, expect } from '@playwright/test';

// עוזר למלא תיבות ריקות במספרים מ-1 עד 10
async function fillMissingInputs(page) {
  const boxes = page.locator('[data-testid="answer-box"]');
  const boxCount = await boxes.count();
  let currentNumber = 1;

  for (let i = 0; i < boxCount; i++) {
    const box = boxes.nth(i);
    const isFilled = await box.getAttribute('data-filled');
    if (isFilled === 'true') {
      currentNumber += 1
      continue;
    };

    if (currentNumber === 10) {
      await page.getByRole('button', { name: '1' }).click();
      await page.getByRole('button', { name: '0' }).click();
    } else {
      await page.getByRole('button', { name: String(currentNumber) }).click();
    }

    currentNumber !== 10 && await expect(box).toHaveText(String(currentNumber));
    currentNumber !== 10 && await expect(box).toHaveAttribute('data-filled', 'true');
    currentNumber++;
  }
}

test.describe('Game stage progression up to stage 9', () => {
  test('should correctly advance through stages 0 to 9', async ({ page }) => {
    await page.goto('http://localhost:3000');

    for (let stage = 0; stage <= 9; stage++) {
      // ודא שהמסך מציג את הכותרת
      await expect(page.getByRole('heading', { name: 'Numbers 1 to 10' })).toBeVisible();

      const boxes = page.locator('[data-testid="answer-box"]');
      await expect(boxes).toHaveCount(10);

      // ספר כמה תיבות מלאות יש
      const filledBoxes = page.locator('[data-testid="answer-box"][data-filled="true"]');
      const filledCount = await filledBoxes.count();

      // ודא שהתיבות המלאות אכן מכילות מספרים
      for (let i = 0; i < filledCount; i++) {
        const filledBox = filledBoxes.nth(i);
        await expect(filledBox).not.toBeEmpty();
      }

      // מלא את שאר התיבות
      await fillMissingInputs(page);

      // המתן קצר לטרנזישן לשלב הבא
      await page.waitForTimeout(400);
    }
  });
});
