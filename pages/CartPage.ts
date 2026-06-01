import { Page } from '@playwright/test';

export class CartPage {
    constructor(private page: Page){}

    checkoutButton(){
        return this.page.locator('[data-test="checkout"]')
    }

}