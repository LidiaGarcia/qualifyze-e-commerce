import { test, expect } from '../helpers/fixtures';
import { users } from '../helpers/testdata';

test.describe('Login feature', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

        test('User should be able to login successfully @test-1 @smoke', async ({ page, loginPage, productCatalogPage }) => {
        await loginPage.login(users.standard.username, users.standard.password)

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(productCatalogPage.cartButton()).toBeVisible();
    });

    test('Blocked user should not be able to login @test-2', async ({ page, loginPage }) => {
        await loginPage.login(users.locked.username, users.locked.password)

        await expect(loginPage.loginErrorContainer()).toHaveText('Epic sadface: Sorry, this user has been locked out.')
        await expect(page).toHaveURL('https://www.saucedemo.com')
    });

    test('User should not be able to login with invalid credentials @test-3', async ({ page, loginPage }) => {
        await loginPage.login(users.invalid_data.username, users.invalid_data.password)
        
        await expect(loginPage.loginErrorContainer()).toHaveText('Epic sadface: Username and password do not match any user in this service')
        await expect(page).toHaveURL('https://www.saucedemo.com')
    });
});
