import { Page } from "@playwright/test";
export class ProductCatalogPage {
    constructor(private page: Page) { }

    cartButton() {
        return this.page.getByTestId('shopping-cart-link')
    }

    getProduct(productName: string) {
        return this.page.getByTestId('inventory-item-description').filter({ hasText: productName });
    }

    addProductToCartButton(productName: string) {
        return this.getProduct(productName).getByRole('button', { name: 'Add to cart' })
    }

    cartBadgeValue() {
        return this.page.getByTestId('shopping-cart-badge')
    }

} 