const { When, Then,Given } = require('@cucumber/cucumber')
//const { POManager } = require('././pageobjects.js/POManager');

const { POManager } = require('../../tests/pageobjects.js/POManager');


const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');


 Given('a login to Ecommerce application with {string} and {string}',{timeout : 100*1000},async function (username, password) {
           // Write code here that turns the phrase above into concrete actions
       
    
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
         });

When('Add {string} to Cart',async function (productName) {
           // Write code here that turns the phrase above into concrete actions
           
            this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
         });
         Then('Verify {string} is displayed in the Cart', async function (productName) {
           // Write code here that turns the phrase above into concrete actions
          const cartPage = this.poManager.getCartPage();
          await cartPage.VerifyProductIsDisplayed(productName);
        await cartPage.Checkout();
         });
         
         When('Enter valid details and Place the Order',async function () {
           // Write code here that turns the phrase above into concrete actions

          const orderReviewPage = this.poManager.getOrdersReviewPage();
          await orderReviewPage.searchCountryAndSelect("ind","India");
          this.orderId = await orderReviewPage.SubmitAndGetOrderId();
          console.log(this.orderId);
         });
         Then('Verify order in present in the OrderHistory',async function () {
           // Write code here that turns the phrase above into concrete actions
           await this.dashboardPage.navigateToOrders();
           const OrderHistoryPage = this.poManager.getOrdersHistoryPage();
           await OrderHistoryPage.searchOrderAndSelect(this.orderId);
           expect(this.orderId.includes(await OrderHistoryPage.getOrderId())).toBeTruthy();
         });
