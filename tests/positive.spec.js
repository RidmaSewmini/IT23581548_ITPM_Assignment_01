import { test, expect } from '@playwright/test';

test.describe('Positive Functional Tests - Singlish to Sinhala (Updated)', () => {

  // Reusable helper
    async function translate(page, inputText) {
    await page.goto('https://www.swifttranslator.com/');

    const inputBox = page.locator('textarea').first();
    await inputBox.fill(inputText);

    const outputBox = page.locator(
        'div.w-full.h-80.whitespace-pre-wrap.bg-slate-50'
    );

    // 🔥 Firefox-safe wait: wait until text length > 3
    await expect.poll(async () => {
        const text = await outputBox.innerText();
        return text.trim().length;
    }, {
        timeout: 15000
    }).toBeGreaterThan(3);

    return await outputBox.innerText();
    }

  test('Pos_Fun_0001 - Simple daily sentence', async ({ page }) => {
    const output = await translate(page, 'mama heta gedhara yanavaa.');
    expect(output).toContain('ගෙදර');
  });

  test('Pos_Fun_0002 - Compound sentence', async ({ page }) => {
    const output = await translate(
      page,
      'maQQ adha iskoole gihin aevith gedhara vaeda karaa.'
    );
    expect(output).toContain('ඉස්කෝලෙ');
  });

  test('Pos_Fun_0003 - Interrogative form', async ({ page }) => {
    const output = await translate(page, 'oyaata badaginidha?');
    expect(output).toContain('?');
  });

  test('Pos_Fun_0004 - Complex sentence', async ({ page }) => {
    const output = await translate(page, 'vaessa unath api yanna epaeyi.');
    expect(output).toContain('වැස්ස');
  });

  test('Pos_Fun_0005 - Imperative command', async ({ page }) => {
    const output = await translate(page, 'vahaama methaenin ayin venna.');
    expect(output).toContain('වහාම');
  });

  test('Pos_Fun_0006 - Positive sentence', async ({ page }) => {
    const output = await translate(page, 'mama eeka karanavaa');
    expect(output).toContain('කරනවා');
  });

  test('Pos_Fun_0007 - Negative sentence', async ({ page }) => {
    const output = await translate(page, 'mama eeka karanne nae');
    expect(output).toContain('නැ');
  });

  test('Pos_Fun_0008 - Greeting', async ({ page }) => {
    const output = await translate(page, 'suBha udhaeesanak !');
    expect(output).toContain('සුභ');
  });

  test('Pos_Fun_0009 - Polite request', async ({ page }) => {
    const output = await translate(
      page,
      'karuNaakaralaa ehaa putuven vaadivenna puluvandha?'
    );
    expect(output).toContain('කරුණා');
  });

  test('Pos_Fun_0010 - Informal phrase', async ({ page }) => {
    const output = await translate(page, 'eeyi kaLuvo, mehaata varen.');
    expect(output).toContain('ඒයි');
  });

  test('Pos_Fun_0011 - Day-to-day expression', async ({ page }) => {
    const output = await translate(page, 'mata mahansiyi.');
    expect(output).toContain('මහන්සි');
  });

  test('Pos_Fun_0012 - Multi-word expression', async ({ page }) => {
    const output = await translate(
      page,
      'mata heta vaeda godaak thiyenavaa eeka nisaa mata heta oyaalage gedhara enna venne naee.'
    );
    expect(output).toContain('වැඩ');
  });

  test('Pos_Fun_0013 - Proper spacing', async ({ page }) => {
    const output = await translate(
      page,
      'mata eya kiyapu dhee theerunee naee. eeka nisaa mata ee vaedee karanna vidhiyak naee.'
    );
    expect(output).toContain('තේරුනේ');
  });

  test('Pos_Fun_0014 - Repetition for emphasis', async ({ page }) => {
    const output = await translate(
      page,
      'vaessa nisaa apee gamana chuttak chuttak nathara vuNaa.'
    );
    expect(output).toContain('චුට්ටක්');
  });

  test('Pos_Fun_0015 - Past tense', async ({ page }) => {
    const output = await translate(
      page,
      'mama iiyee poth pradharshanayakata sahaBhaagii vunaa.'
    );
    expect(output).toContain('ඊයේ');
  });

  test('Pos_Fun_0016 - Present tense', async ({ page }) => {
    const output = await translate(page, 'mama dhaen bath kanavaa.');
    expect(output).toContain('දැන්');
  });

  test('Pos_Fun_0017 - Complex sentence with singular pronoun', async ({ page }) => {
    const output = await translate(
      page,
      'nimal adha thamaa mulinma rassaavata yana dhavasa.'
    );
    expect(output).toContain('නිමල්');
  });

  test('Pos_Fun_0018 - Narrative with plural pronouns', async ({ page }) => {
    const output = await translate(
      page,
      'api yamu, api kathaa karamu, api hari vidhiyata apee anaagathaya venuven mee vaeda tika karamu.'
    );
    expect(output).toContain('අපි');
  });

  test('Pos_Fun_0019 - Multiple polite requests', async ({ page }) => {
    const output = await translate(
      page,
      'karuNakaralaa mee aachchita putuva dhenavadha?'
    );
    expect(output).toContain('පුටුව');
  });

  test('Pos_Fun_0020 - Mixed formal and informal conversation', async ({ page }) => {
    const output = await translate(
      page,
      'aa nimal oyaa iiye panthi giyaadha? mata enna baeri unaane baQQ.'
    );
    expect(output).toContain('පන්ති');
  });

  test('Pos_Fun_0021 - Mixed punctuation', async ({ page }) => {
    const output = await translate(page, 'ayiyo! mokadha unee?');
    expect(output).toContain('!');
  });

  test('Pos_Fun_0022 - English technical terms', async ({ page }) => {
    const output = await translate(
      page,
      'mama thava two hours valin shop ekata enavaa.'
    );
    expect(output).toContain('two hours');
  });

  test('Pos_Fun_0023 - Place names', async ({ page }) => {
    const output = await translate(
      page,
      'heta Andrew gee birth day eka, ee nisaa api adelaide vala yanavaa.'
    );
    expect(output).toContain('Andrew');
  });

  test('Pos_Fun_0024 - English abbreviations', async ({ page }) => {
    const output = await translate(
      page,
      'Heta SLIIT ekee undergraduate kenek 2022 idhalaa.'
    );
    expect(output).toContain('SLIIT');
  });

});
