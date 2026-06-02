import { Page , expect} from '@playwright/test';
import { OrderSummaryPage } from './OrderSummaryPage';

export class CartPage extends OrderSummaryPage{
    constructor(page: Page){
        super(page);
    }

    checkoutButton(){
        return this.page.getByTestId('checkout');
    }

    continueShoppingButton(){
        return this.page.getByTestId('continue-shopping');
    }

    removeProductButton(productName: string){
        return this.page.getByTestId('inventory-item').filter({ hasText: productName }).getByRole('button', { name: 'Remove' });
    }

    // Interactions

    async goto() {
        await this.page.goto('/cart.html');
    }

    async verifyItemNotVisible(productName: string) {
        await expect(this.page.getByTestId('inventory-item').filter({ hasText: productName })).not.toBeVisible();
    }
}