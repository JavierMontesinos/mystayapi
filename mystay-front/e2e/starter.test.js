describe('Login screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Login form should be visible', async () => {
    await expect(element(by.id('dni-login'))).toBeVisible();
    await expect(element(by.id('nhab-login'))).toBeVisible();
    await expect(element(by.id('btn-login'))).toBeVisible();
  });

  
  it('should login with provided credentials', async () => {
    // Check if elements exist
    await element(by.id('dni-login')).typeText('12345');
    await element(by.id('nhab-login')).typeText('101');

    await waitFor(element(by.id('btn-login'))).toBeVisible().withTimeout(5000);


    // Click on login button
    await element(by.id('btn-login')).tap();
  });

});
