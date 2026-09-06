import {test, expect} from '@playwright/test'
import LoginPage from '../pageObjects/LoginPage'
import InventoryPage from '../pageObjects/Inventory'
import CartPage from '../pageObjects/CartPage'
import CheckoutPage from '../pageObjects/CheckoutPage'
import {products} from '../data/testData'
import {checkoutInformation} from '../data/testData'

test('Login with standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsStandardUser();
});

test.describe('Checkout E2E tests', () => {
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

    test('Checkout and verify items', async({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

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

        await cartPage.clickCheckoutButton();
        await checkoutPage.expectCheckoutStepOnePage();
        await checkoutPage.fillCheckoutInformation(checkoutInformation.firstName, checkoutInformation.lastName, checkoutInformation.postalCode);
        await checkoutPage.clickContinueButton();
        await checkoutPage.expectCheckoutStepTwoPage();
        await checkoutPage.expectCartItemCount(2);
        await checkoutPage.expectCartItemVisible(products.product1);
        await checkoutPage.expectCartItemVisible(products.product2);
        await checkoutPage.expectCartItemPriceVisible(products.product1);
        await checkoutPage.expectCartItemPriceVisible(products.product2);
    });


    test('Verify total price', async({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

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

        await cartPage.clickCheckoutButton();
        await checkoutPage.expectCheckoutStepOnePage();
        await checkoutPage.fillCheckoutInformation(checkoutInformation.firstName, checkoutInformation.lastName, checkoutInformation.postalCode);
        await checkoutPage.clickContinueButton();
        await checkoutPage.expectCheckoutStepTwoPage();
        await checkoutPage.expectCartItemCount(2);
        await checkoutPage.expectCartItemVisible(products.product1);
        await checkoutPage.expectCartItemVisible(products.product2);
        await checkoutPage.expectCartItemPriceVisible(products.product1);
        await checkoutPage.expectCartItemPriceVisible(products.product2);

        //new line to verify total price
        const itemPrice1 = await checkoutPage.expectCartItemPriceVisible(products.product1);
        const itemPrice2 = await checkoutPage.expectCartItemPriceVisible(products.product2);
        const itemPrice1Value = parseFloat(itemPrice1.replace('$', ''));
        const itemPrice2Value = parseFloat(itemPrice2.replace('$', ''));
        const totalPriceValue = Number((itemPrice1Value + itemPrice2Value).toFixed(2));

        const subTotalPriceText = await checkoutPage.summarySubtotal.textContent();
        const totalPriceTextValue = Number(parseFloat(subTotalPriceText.replace('Item total: $', '')).toFixed(2));
        expect(totalPriceValue).toBe(totalPriceTextValue);

        const taxPriceText = await checkoutPage.summaryTax.textContent();
        const taxPriceTextValue = Number(parseFloat(taxPriceText.replace('Tax: $', '')).toFixed(2));
        const totalPriceWithTaxValue = Number((totalPriceValue + taxPriceTextValue).toFixed(2));

        const totalPriceWithTaxText = await checkoutPage.summaryTotal.textContent();
        const totalPriceWithTaxTextValue = Number(parseFloat(totalPriceWithTaxText.replace('Total: $', '')).toFixed(2));
        expect(totalPriceWithTaxValue).toBe(totalPriceWithTaxTextValue);

    });

    test('Finish checkout and verify order completion', async({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

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

        await cartPage.clickCheckoutButton();
        await checkoutPage.expectCheckoutStepOnePage();
        await checkoutPage.fillCheckoutInformation(checkoutInformation.firstName, checkoutInformation.lastName, checkoutInformation.postalCode);
        await checkoutPage.clickContinueButton();
        await checkoutPage.expectCheckoutStepTwoPage();
        await checkoutPage.expectCartItemCount(2);
        await checkoutPage.expectCartItemVisible(products.product1);
        await checkoutPage.expectCartItemVisible(products.product2);
        await checkoutPage.expectCartItemPriceVisible(products.product1);
        await checkoutPage.expectCartItemPriceVisible(products.product2);

        //new line to finish checkout and verify order completion
        await checkoutPage.clickFinishButton();
        await checkoutPage.expectOrderCompletePage();

        await checkoutPage.clickBackHomeButton();
        await checkoutPage.expectInventoryPage();
        await checkoutPage.expectShoppingCartCount("");
    });

    test('Logout', async({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.clickOpenMenuButton();
        await inventoryPage.clickLogoutLink();
        await inventoryPage.expectLoginPage();
    });

});