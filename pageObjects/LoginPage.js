import { expect } from '@playwright/test';
import { users } from '../data/testData';

export default class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole('button', {name: "Login"});
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async open() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginAsStandardUser() {
        await this.open();
        await this.login(
            users.standard.username,
            users.standard.password
        );
        await this.expectInventoryPage();
    }

    async expectErrorMessage(message) {
        await expect(this.errorMessage).toContainText(message);
    }

    async expectInventoryPage() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }
}
