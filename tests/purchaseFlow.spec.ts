import { test, expect } from '../helpers/fixtures';
import { users } from '../helpers/testdata';

let cartItems = 0;

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
});

test('User should be able to place an order', async ({ productCatalogPage, cartPage, checkoutPage }) => {
    const item1= 'Sauce Labs Bike Light';
    const item2= 'Sauce Labs Onesie';

    await productCatalogPage.addProductToCartButton(item1).click();
    cartItems += 1;
    await expect(productCatalogPage.cartBadgeValue()).toHaveText(cartItems.toString());
    await productCatalogPage.addProductToCartButton(item2).click();
    cartItems += 1;
    await expect(productCatalogPage.cartBadgeValue()).toHaveText(cartItems.toString());
//todo maybe hacer una interaction para añadir varios products en una misma llamada 
 
    await productCatalogPage.cartBadgeValue().click();
    //todo comprobar datos carrito?
    await cartPage.checkoutButton().click();
    await checkoutPage.fillUserInfoForm(users.standard.firstName, users.standard.lastName, users.standard.postalCode);
    //todo comprobar datos carrito?
    await expect(checkoutPage.priceTotal()).toHaveText('Total: $19.42');
    await checkoutPage.finishOrdenButton().click()
    await expect(checkoutPage.checkoutCompleteMessage()).toHaveText('Thank you for your order!');
});

