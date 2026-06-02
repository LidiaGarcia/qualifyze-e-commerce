import { Page, expect } from '@playwright/test';

export class OrderSummaryPage {

    constructor(protected page: Page) { }

    async verifyItems(productNames: string[]) {
        for (const productName of productNames) {
            await expect(this.page.getByTestId('inventory-item').filter({ hasText: productName })).toBeVisible();
        }
    }
}