import { expect } from '@playwright/test';

export default class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
                
    }

    async expectCartPage() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");
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

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}