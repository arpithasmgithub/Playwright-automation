const base = require('@playwright/test');

exports.customtest = base.test.extend({
  testDataForOrder: async ({}, use) => {
    await use({
      username: "arpitha@gmail.com",
      password: "Linked@1995",
      productName: "ZARA COAT 3"
    });
  }
});
