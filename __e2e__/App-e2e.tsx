const timeout = 15000; 
beforeAll(async () => {await page.goto('https://google.com', {waitUntil: 'domcontentloaded'});
  
}); 
describe('Test page title and header', () => { 
  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google');
  });

});