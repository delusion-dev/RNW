describe('Create session', function () {
  it('should search by text', async () => {
    const text = await client.getElementByText('Lorem ipsum');
    expect(await text.isDisplayed()).toBeTruthy();
  });

  it('should search by substring', async () => {
    const text = await client.getElementByTextContains('Lorem i');
    expect(await text.isDisplayed()).toBeTruthy();
  });

  it('should correctly navigate between pages', async () => {

    const link1 = await client.getElementByTestId('HELLO-WORLD');
    expect(await link1.isDisplayed()).toBeTruthy();
    await link1.click();

    const page1 = await client.getElementByTestId('HELLO-WORLD-PAGE');
    expect(await page1.isDisplayed()).toBeTruthy();

    const link2 = await client.getElementByTestId('HOME');
    expect(await link2.isDisplayed()).toBeTruthy();
    await link2.click();

    const page2 = await client.getElementByTestId('HOME-PAGE');
    expect(await page2.isDisplayed()).toBeTruthy();
   });

  if (client.isMobile) {  // || client.isIOS || client.isAndroid
    it('should run mobile specific test', async () => {
    });
  }

  it('should show result message', async () => {
    const input = await client.getElementByTestId('TEXT-INPUT');
    expect(await input.isDisplayed()).toBeTruthy();
    await input.setValue("Typing in the input");
    
    const button = await client.getElementByTestId('SUBMIT-BUTTON');
    expect(await button.isDisplayed()).toBeTruthy();
    await button.click();

    const result = await client.getElementByTestId('RESULT-TEXT');
    expect(await result.isDisplayed()).toBeTruthy();
    expect(await result.getText()).toBe("You have typed: Typing in the input!");
  });

  it('should close dialog', async () => {
    const result = await client.getElementByTestId('RESULT-TEXT');
    expect(await result.isDisplayed()).toBeTruthy();
    expect(await result.getText()).toBe("You have typed: Typing in the input!");

    const okButton = await client.getElementByTestId('SUBMIT-MODAL');
    expect(await okButton.isDisplayed()).toBeTruthy();
    await okButton.click();

    const disappearedWithin1sec = await result.waitForExist({timeout: 1000, reverse: true})
    expect(disappearedWithin1sec).toBeTruthy();
  });
});