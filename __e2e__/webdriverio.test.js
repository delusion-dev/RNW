const timeout = 10000;

describe('Create session', function () {
  it('should correctly navigate between pages', async () => {

    const link1 = await client.$('~HELLO-WORLD');
    expect(await link1.waitForExist({ timeout })).toBe(true);
    await link1.click();

    const page1 = await client.$('~HELLO-WORLD-PAGE');
    expect(await page1.waitForExist({ timeout })).toBe(true);

    const link2 = await client.$('~HOME');
    expect(await link2.waitForExist({ timeout })).toBe(true);
    await link2.click();

    const page2 = await client.$('~HOME-PAGE');
    expect(await page2.waitForExist({ timeout })).toBe(true);
  });
});
