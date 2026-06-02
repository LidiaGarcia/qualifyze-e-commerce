import { test, expect } from '../helpers/fixtures';
import { users } from '../helpers/testdata';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
});
test.describe('Purchase feature', () => {
    test('User should be able to place an order @test-4 @smoke', async ({ productCatalogPage, cartPage, checkoutPage, cartTasks }) => {
        const product1 = 'Sauce Labs Bike Light';
        const product2 = 'Sauce Labs Onesie';

        await cartTasks.addItemToCartAndVerify(product1, 1);
        await cartTasks.addItemToCartAndVerify(product2, 2);

        await productCatalogPage.cartButton().click();
        await cartPage.checkoutButton().click();
        await checkoutPage.fillUserInfoForm(users.standard.firstName, users.standard.lastName, users.standard.postalCode);
        await checkoutPage.verifyItems([product1, product2])
        await expect(checkoutPage.priceTotal()).toHaveText('Total: $19.42');
        await checkoutPage.finishOrdenButton().click()
        await expect(checkoutPage.checkoutCompleteMessage()).toHaveText('Thank you for your order!');
        await expect(productCatalogPage.cartBadgeValue()).not.toBeVisible();
    });

    test('User should be able to remove item added to cart @test-5 @smoke', async ({ productCatalogPage, cartPage, checkoutPage, cartTasks }) => {
        const product = 'Sauce Labs Backpack';

        await cartTasks.addItemToCartAndVerify(product, 1);
        await productCatalogPage.cartButton().click();
        await cartPage.removeProductButton(product).click();
        await cartPage.verifyItemNotVisible(product);
        await expect(productCatalogPage.cartBadgeValue()).not.toBeVisible();
    });
});