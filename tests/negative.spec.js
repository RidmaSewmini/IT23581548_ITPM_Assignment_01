import { test, expect } from '@playwright/test';

test.describe('Negative Functional Tests - Singlish to Sinhala', () => {

  async function translate(page, inputText) {
    await page.goto('https://www.swifttranslator.com/');

    const inputBox = page.locator('textarea').first();
    await inputBox.waitFor({ state: 'visible' });
    await inputBox.fill(inputText);

    const outputBox = page.locator(
      'div.w-full.h-80.whitespace-pre-wrap.bg-slate-50'
    );

    // Firefox-safe wait
    await expect.poll(async () => {
      const text = await outputBox.innerText();
      return text.trim().length;
    }, { timeout: 20000 }).toBeGreaterThan(0);

    return outputBox;
  }

  test('Neg_Fun_0001 - Joined words without spaces causes failure', async ({ page }) => {
    const output = await translate(page, 'mamahetayanavaa');
    const text = await output.innerText();

    expect(text).not.toContain('මම හෙට යනවා');
  });

  test('Neg_Fun_0002 - Unsupported symbol in middle of sentence', async ({ page }) => {
    const output = await translate(page, 'mama @ gedhara');
    const text = await output.innerText();

    expect(text).toContain('@');
  });

  test('Neg_Fun_0003 - Joined words without spaces', async ({ page }) => {
    const output = await translate(page, 'mamagedharayanavaa');
    const text = await output.innerText();

    expect(text).toContain('mamagedharayanavaa');
  });

  test('Neg_Fun_0004 - All capital sentence input', async ({ page }) => {
    const output = await translate(page, 'MAMA YANAVAA');
    const text = await output.innerText();

    expect(text).toContain('MAMA');
  });

  test('Neg_Fun_0005 - Foreign language input', async ({ page }) => {
    const output = await translate(page, 'Bonjour');
    const text = await output.innerText();

    expect(text).not.toBe('මම ගෙදර යනවා');
  });

  test('Neg_Fun_0006 - Alphanumeric input v3da', async ({ page }) => {
    const output = await translate(page, 'v3da');
    const text = await output.innerText();

    expect(text).toContain('3');
  });

  test('Neg_Fun_0007 - Random numbers appended to Singlish words input', async ({ page }) => {
    const output = await translate(page, 'mama gedha4a yanavaa');
    const text = await output.innerText();

    expect(text).toContain('4');
  });

  test('Neg_Fun_0008 - Leading punctuation', async ({ page }) => {
    const output = await translate(page, '...mama yanavaa');
    const text = await output.innerText();

    expect(text.startsWith('...')).toBeTruthy();
  });

  test('Neg_Fun_0009 - Special symbols only', async ({ page }) => {
    const output = await translate(page, 'mama@#$%^&*');
    const text = await output.innerText();

    expect(text).toContain('@#$%^&*');
  });

  test('Neg_Fun_0010 - Extreme length input', async ({ page }) => {
    const longText =
      'mama gedhara yanavaa saha paadam karanavaa. '.repeat(20);

    const output = await translate(page, longText);
    const text = await output.innerText();

    expect(text.length).toBeGreaterThan(100);
  });

});
