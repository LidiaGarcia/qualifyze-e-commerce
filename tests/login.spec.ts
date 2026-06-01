import { test, expect } from '../helpers/fixtures';
import { users } from '../helpers/testdata';

test.describe('Login feature', () => {
    test('User should be able to login successfully', async ({ page, loginPage, productCatalogPage }) => {

        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password)

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(productCatalogPage.cartButton()).toBeVisible();
    });

    test('Blocked user should not be able to login', async ({ page, loginPage }) => {

        await loginPage.goto();
        await loginPage.login(users.locked.username, users.locked.password)

        await expect(page).toHaveURL('https://www.saucedemo.com')
        await expect(loginPage.loginErrorContainer()).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    });
});
