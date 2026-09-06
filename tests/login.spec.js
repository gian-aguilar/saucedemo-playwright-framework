import { test } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';
import { users } from '../data/testData';

test('Standard User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
        users.standard.username,
        users.standard.password
    );
    await loginPage.expectInventoryPage();
});

test('Locked Out User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
        users.lockedOut.username,
        users.lockedOut.password
    );
    await loginPage.expectErrorMessage('Epic sadface: Sorry, this user has been locked out.');
});

test('Empty login credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('', '');
    await loginPage.expectErrorMessage('Epic sadface: Username is required');
});