import { test as base } from '@playwright/test';
import { ProductCatalogPage } from '../pages/ProductCatalogPage';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type Fixtures = {
    loginPage: LoginPage;
    productCatalogPage: ProductCatalogPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productCatalogPage: async ({ page }, use) => {
        await use(new ProductCatalogPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    }
});

export { expect } from '@playwright/test';