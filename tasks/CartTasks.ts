import { Page, expect } from '@playwright/test';
import { ProductCatalogPage } from '../pages/ProductCatalogPage';
import { CartPage } from '../pages/CartPage';

export class CartTasks {

    constructor(
        private productCatalogPage: ProductCatalogPage,
        private cartPage: CartPage
    ) { }

    async addItemToCartAndVerify(productName: string, expectedBadgeCount: number) {
        await this.productCatalogPage.addProductToCartButton(productName).click();
        await expect(this.productCatalogPage.cartBadgeValue()).toHaveText(expectedBadgeCount.toString());
        await this.productCatalogPage.cartButton().click();
        await this.cartPage.verifyItems([productName]);
        await this.cartPage.continueShoppingButton().click();
    }
}