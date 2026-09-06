# SauceDemo Playwright Automation

[![Playwright Tests](https://github.com/gian-aguilar/saucedemo-playwright-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/gian-aguilar/saucedemo-playwright-framework/actions/workflows/playwright.yml)

End-to-end test automation for [SauceDemo](https://www.saucedemo.com/) using Playwright Test and JavaScript.

## Project Summary

This project is a maintainable end-to-end automation framework for the SauceDemo web application. It uses Playwright Test with JavaScript to validate critical user journeys, including login, product sorting, shopping cart operations, checkout calculations, order completion, and logout.

The framework follows the Page Object Model pattern. Reusable page classes separate browser interactions from test scenarios, while shared test data keeps users, products, and checkout information organized. The tests run in Chromium using a headless configuration suitable for local execution and continuous integration.

The project also includes GitHub Actions integration. Every push or pull request targeting `main` or `master` runs the Playwright test suite on Ubuntu, installs the required browser dependencies, and uploads the generated HTML report as an artifact. A workflow status badge in this README provides a live indication of whether the latest automation run passed or failed.

### What Was Implemented

- Built login, inventory, cart, and checkout page objects.
- Added positive and negative login test scenarios.
- Added inventory, cart, checkout, pricing, order completion, and logout coverage.
- Centralized test data and supported credential overrides through environment variables.
- Configured headless Chromium execution with screenshots and failure traces.
- Added HTML reporting and GitHub Actions artifact publishing.
- Added a GitHub Actions workflow for automated test execution on pushes and pull requests.
- Added documentation for local setup, test execution, GitHub publishing, and CI reports.

## Prerequisites

- Node.js 20 or newer
- npm

## Installation

Install the project dependencies:

```bash
npm install
```

Install the Playwright Chromium browser:

```bash
npx playwright install chromium
```

## Running Tests

Run all tests:

```bash
npx playwright test tests
```

Run an individual test suite:

```bash
npx playwright test tests/login.spec.js
npx playwright test tests/inventory.spec.js
npx playwright test tests/e2eCheckout.spec.js
```

Run a specific test by name:

```bash
npx playwright test tests/e2eCheckout.spec.js -g "Finish checkout"
```

The project is configured to run Chromium in headless mode by default, which is suitable for CI and local validation. To display the browser during a run, use:

```bash
npx playwright test tests --headed
```

## Reports and Diagnostics

Open the HTML report after a test run:

```bash
npx playwright show-report
```

Playwright is configured to capture screenshots and retain traces when tests fail. View a trace with:

```bash
npx playwright show-trace test-results/<trace-file>.zip
```

Generated reports and test results are excluded from Git.

### GitHub Actions Report

View the latest workflow runs on the [Playwright Tests Actions page](https://github.com/gian-aguilar/saucedemo-playwright-framework/actions/workflows/playwright.yml). Open a completed run, then download the `playwright-report` artifact from the **Artifacts** section to inspect the HTML report.

## GitHub Actions

The workflow in `.github/workflows/playwright.yml` runs automatically when code is pushed to, or a pull request targets, the `main` or `master` branch. It installs dependencies and Playwright browsers, runs the full test suite on Ubuntu, and uploads the HTML report as a workflow artifact.

To publish this project to a new GitHub repository, create an empty repository on GitHub, then run these commands from the project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repository>.git
git push -u origin main
```

After the push, open the repository on GitHub and select the **Actions** tab to view the test run. For later changes:

```bash
git add .
git commit -m "Describe the change"
git push
```

When a workflow finishes, download the `playwright-report` artifact from the workflow summary to inspect the report. Do not commit credentials, `node_modules`, test results, or generated reports.

## Test Coverage

### Login

- Standard user login
- Locked-out user validation
- Empty credential validation

### Inventory

- Product sorting
- Adding products to the cart
- Verifying cart contents

### Checkout

- Product sorting and cart operations
- Checkout item verification
- Checkout total and tax calculations
- Order completion
- Logout

## Project Structure

```text
.
├── data/                 Test data and user credentials
├── pageObjects/          Page Object Model classes
├── tests/                Playwright test suites
├── playwright.config.js  Playwright configuration
└── package.json          Project dependencies
```

## Test Data and Credentials

The default SauceDemo standard-user credentials are used automatically. You can override them with environment variables:

PowerShell:

```powershell
$env:SAUCE_STANDARD_USER = "standard_user"
$env:SAUCE_STANDARD_PASSWORD = "secret_sauce"
```

Command Prompt:

```cmd
set SAUCE_STANDARD_USER=standard_user
set SAUCE_STANDARD_PASSWORD=secret_sauce
```

Do not commit real credentials or sensitive values to the repository.

## Authentication Behavior

The login and inventory tests currently perform the standard-user login through the `LoginPage` page object before exercising authenticated functionality. The checkout suite also logs in before each test, keeping each test isolated with a fresh browser context.

## Page Object Model

Reusable browser interactions are kept in `pageObjects/`:

- `LoginPage.js` handles login and login validation.
- `Inventory.js` handles products, sorting, and the shopping cart.
- `CartPage.js` handles cart assertions and checkout navigation.
- `CheckoutPage.js` handles checkout details, totals, and order completion.
