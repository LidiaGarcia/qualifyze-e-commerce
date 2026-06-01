import { Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) { }

    nameField() {
        return this.page.getByTestId('username');
    }
    passwordField() {
        return this.page.getByTestId('password');
    }
    loginButton() {
        return this.page.getByTestId('login-button');
    }

    loginErrorContainer(){
        return this.page.locator('.error-message-container')
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.nameField().fill(username);
        await this.passwordField().fill(password);
        await this.loginButton().click();
    }
}