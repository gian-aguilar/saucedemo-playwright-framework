import { expect } from '@playwright/test';

export default class ProductPage {
    constructor(page) {
        this.page = page;
        //Verify product sorting
        this.productSortDropdown = page.getByRole('combobox');
        this.inventoryItemPrice = page.locator('.inventory_item_price');

        //Add item to cart
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        //Go to cart and verify items
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
    }

    async expectInventoryPage() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
    }

    async selectProductSortOption(option) {
        await this.productSortDropdown.selectOption(option);
    }
    
    async getInventoryItemPriceTexts() {
        return await this.inventoryItemPrice.allTextContents();
    }

    itemCard(itemName) {
        return this.inventoryItems.filter({ hasText: itemName });
    }

    async addToCart(itemName) {
        await this.itemCard(itemName).getByRole('button', { name: /add to cart/i }).click();
    }

    async expectShoppingCartBadgeCount(count) {
        await expect(this.shoppingCartBadge).toHaveText(count.toString());
    }

    async shoppingCartLinkClick() {
        await this.shoppingCartLink.click();
    }

    async clickOpenMenuButton() {
        await this.openMenuButton.click();
    }

    async clickLogoutLink() {
        await this.logoutLink.click();
    }

    async expectLoginPage() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/");
    }


}