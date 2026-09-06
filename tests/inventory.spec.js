import { test, expect } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';
import InventoryPage from '../pageObjects/Inventory';
import CartPage from '../pageObjects/CartPage';
import {products} from '../data/testData';

test.beforeEach(async({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsStandardUser();
});

test('Verify product sorting', async({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.selectProductSortOption('lohi');

    const priceTexts = await inventoryPage.getInventoryItemPriceTexts();
    const firstPriceValue = parseFloat(priceTexts[0].replace('$', ''));
    const lastPriceValue = parseFloat(priceTexts[priceTexts.length - 1].replace('$', ''));

    expect(firstPriceValue).toBeLessThanOrEqual(lastPriceValue);
});

test('Add item to cart', async({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.itemCard(products.product1);
    await inventoryPage.itemCard(products.product2);

    await inventoryPage.addToCart(products.product1);
    await inventoryPage.addToCart(products.product2);

    await inventoryPage.expectShoppingCartBadgeCount('2');
});

test('Verify items in the cart', async({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.itemCard(products.product1);
    await inventoryPage.itemCard(products.product2);

    await inventoryPage.addToCart(products.product1);
    await inventoryPage.addToCart(products.product2);

    await inventoryPage.shoppingCartLinkClick();
    await cartPage.expectCartPage();
    await cartPage.expectCartItemCount(2);
    await cartPage.expectCartItemVisible(products.product1);
    await cartPage.expectCartItemVisible(products.product2);
    await cartPage.expectCartItemPriceVisible(products.product1);
    await cartPage.expectCartItemPriceVisible(products.product2);
});