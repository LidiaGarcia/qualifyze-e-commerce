import { Page } from '@playwright/test';
import { OrderSummaryPage } from './OrderSummaryPage';

export class CheckoutPage extends OrderSummaryPage{
    constructor(page: Page) {
        super(page)
    }

    // Checkout User info
    firstNameInput() {
        return this.page.getByTestId('firstName')
    }

    lastNameInput() {
        return this.page.getByTestId('lastName')
    }

    postalCodeInput(){
        return this.page.getByTestId('postalCode')
    }

    continueCheckoutButton(){
        return this.page.getByTestId('continue')
    }

    //Checkout Overview 
    priceTotal(){
        return this.page.getByTestId('total-label');
    }

    finishOrdenButton(){
        return this.page.getByTestId('finish')
    }

    //Checkout Complete

    checkoutCompleteMessage(){
        return this.page.locator('#checkout_complete_container').getByRole('heading');
    }

    //Interactions

    async fillUserInfoForm(firstName: string, lastName: string, postalCode: string){
        await this.firstNameInput().fill(firstName);
        await this.lastNameInput().fill(lastName);
        await this.postalCodeInput().fill(postalCode);
        await this.continueCheckoutButton().click();
    }
}