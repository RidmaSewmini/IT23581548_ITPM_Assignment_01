import { test, expect } from '@playwright/test';

test.describe('UI Tests - Singlish to Sinhala Translator', () => {

  test('Pos_UI_0001 - Real-time display (browser dependent)', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    const inputBox = page.locator('textarea').first();
    const outputBox = page.locator(
      'div.w-full.h-80.whitespace-pre-wrap.bg-slate-50'
    );

    await inputBox.waitFor({ state: 'visible' });

    await inputBox.type('nimal', { delay: 200 });

    // Allow UI time to react (Firefox safe)
    await page.waitForTimeout(2000);

    const outputText = await outputBox.innerText();

    // Validate UI produced SOME output (real-time behavior exists)
    expect(outputText.length).toBeGreaterThan(0);
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
    await page.waitForTimeout(1000);

    // Second input
    await inputBox.fill('mama gedhara yanavaa');
    await page.waitForTimeout(1000);

    // Click Undo
    await undoButton.click();
    await page.waitForTimeout(1000);

    const inputTextAfterUndo = await inputBox.inputValue();
    const outputTextAfterUndo = await outputBox.innerText();

    // NEGATIVE validation: Undo does NOT reliably restore UI state
    const undoFailed =
      inputTextAfterUndo.trim() !== 'nimal' ||
      outputTextAfterUndo.trim().length === 0;

    expect(undoFailed).toBeTruthy();
  });

});
