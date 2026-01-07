const { test, expect } = require('@playwright/test');
const {customtest} = require('../Utils/test-base');
const { POManager } = require('./pageobjects.js/POManager');
const dataset = require('../Utils/placeorderTestData.json');

for (const data of dataset) {

  test(`Client App login for ${data.productName}`, async ({ page }) => {

    const poManager = new POManager(page);

    // Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    // Dashboard
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    // Cart validation
    await expect(
      page.locator(".cartSection h3", { hasText: data.productName })
    ).toBeVisible();

    // Checkout
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const options = dropdown.locator("button");
    for (let i = 0; i < await options.count(); i++) {
      const text = (await options.nth(i).textContent())?.trim();
      if (text === "India") {
        await options.nth(i).click();
        break;
      }
    }

    // User validation
    await expect(
      page.locator(".user__name [type='text']").first()
    ).toHaveText(data.username);

    // Place order
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary"))
      .toHaveText(" Thankyou for the order. ");

    // Order history validation
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  });
}


 customtest(`Order using fixture data App login`, async ({ page ,testDataForOrder}) => {

    const poManager = new POManager(page);

    // Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    // Dashboard
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
   });
