import { expect } from '@playwright/test';

export default class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder("First Name");
        this.lastNameInput = page.getByPlaceholder("Last Name");
        this.zipCodeInput = page.getByPlaceholder("Zip/Postal Code");
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.cartItems = page.locator('.cart_item');
        this.summarySubtotal = page.locator('.summary_subtotal_label');
        this.summaryTax = page.locator('.summary_tax_label');
        this.summaryTotal = page.locator('.summary_total_label');
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.checkOutCompleteText = page.locator('.complete-header');
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
        this.shoppingCartLink = page.locator('.shopping_cart_link');

    }

    async expectCheckoutStepOnePage() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    }
    
    async fillCheckoutInformation(firstName, lastName, zipCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async expectCheckoutStepTwoPage() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
    }

    async expectCartItemCount(count) {
        await expect(this.cartItems).toHaveCount(count);
    }

    async expectCartItemVisible(itemName) {
        await expect(this.cartItems.filter({ hasText: itemName })).toBeVisible();
    }

    async expectCartItemPriceVisible(itemName) {
        const itemPriceLocator = this.cartItems.filter({ hasText: itemName }).locator('.inventory_item_price');
        await expect(itemPriceLocator).toBeVisible();
        return await itemPriceLocator.textContent();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }

    async expectOrderCompletePage() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
        await expect(this.checkOutCompleteText).toHaveText('Thank you for your order!');
    }

    async clickBackHomeButton() {
        await this.backHomeButton.click();
    }

    async expectInventoryPage() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
    }

    async expectShoppingCartCount(count) {
        await expect(this.shoppingCartLink).toHaveText(count.toString());
    }





    

}