import { test, expect } from '@playwright/test';

test.describe('UI Tests - Singlish to Sinhala Translator', () => {

  test('Pos_UI_0001 - Real-time display', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    const inputBox = page.locator('textarea').first();
    const outputBox = page.locator(
      'div.w-full.h-80.whitespace-pre-wrap.bg-slate-50'
    );

    await inputBox.waitFor({ state: 'visible' });

    // Type slowly to simulate real-time typing
    await inputBox.type('nimal', { delay: 200 });

    // Real-time UI update validation
    await expect.poll(async () => {
      const text = await outputBox.innerText();
      return text.trim();
    }, { timeout: 10000 }).toContain('නිමල්');
  });

  test('Neg_UI_0002 - Undo button does not restore both input and output', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    const inputBox = page.locator('textarea').first();
    const outputBox = page.locator(
      'div.w-full.h-80.whitespace-pre-wrap.bg-slate-50'
    );

    const undoButton = page.getByRole('button', { name: /undo/i });

    await inputBox.waitFor({ state: 'visible' });

    // First input
    await inputBox.fill('nimal');
    await expect(outputBox).toContainText('නිමල්');

    // Second input
    await inputBox.fill('mama gedhara yanavaa');
    await expect(outputBox).toContainText('මම');

    // Click Undo
    await undoButton.click();

    // UI NEGATIVE validation
    const inputTextAfterUndo = await inputBox.inputValue();
    const outputTextAfterUndo = await outputBox.innerText();

    // Input box is empty (unexpected behavior)
    expect(inputTextAfterUndo.trim()).toBe('');

    // Output box still contains Sinhala translation
    expect(outputTextAfterUndo.trim().length).toBeGreaterThan(0);
  });

});
