# Playwright QA Automation Portfolio

A TypeScript end-to-end test automation project built with Playwright and the Page Object Model (POM) pattern. It exercises the public [SauceDemo](https://www.saucedemo.com/) application and is intended to demonstrate maintainable UI automation practices for QA automation engagements.

## Technologies

- TypeScript
- Playwright Test
- Node.js
- GitHub Actions

## Test coverage

The suite runs the same scenarios in Chromium, Firefox, and WebKit:

1. Successful SauceDemo login and e-commerce checkout.
2. Rejection of invalid login credentials.
3. Adding a product to, then removing it from, the shopping cart.

The tests use SauceDemo's public demo credentials and data only.

## Project structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml       # Continuous-integration workflow
├── tests/
│   ├── pages/                   # Reusable Page Object Model classes
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── InventoryPage.ts
│   │   └── LoginPage.ts
│   ├── tests/
│   │   └── saucedemo.spec.ts    # SauceDemo scenarios
│   └── example.spec.ts          # Playwright example test
├── playwright.config.ts          # Browser projects and HTML reporter
├── package.json
└── package-lock.json
```

## Prerequisites

- Node.js (current LTS recommended)
- npm

## Installation

```bash
npm ci
```

Use `npm install` if you intentionally need to update the lockfile.

## Install Playwright browsers

```bash
npx playwright install
```

For the Linux GitHub Actions runner, the existing workflow uses:

```bash
npx playwright install --with-deps
```

## Run tests

Run the SauceDemo portfolio scenarios across all configured browsers:

```bash
npx playwright test tests/saucedemo.spec.ts
```

Run the complete test suite:

```bash
npx playwright test
```

Run a single browser project when debugging:

```bash
npx playwright test tests/saucedemo.spec.ts --project=chromium
```

## HTML reports

The Playwright configuration uses the HTML reporter. After a test run, open the generated local report with:

```bash
npx playwright show-report
```

Generated `playwright-report/` and `test-results/` folders are intentionally ignored by Git.

## GitHub Actions

The workflow at `.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master`. It installs dependencies with `npm ci`, installs Playwright browsers, executes `npx playwright test`, and uploads the HTML report as a workflow artifact for 30 days.

Once this project is connected to a GitHub repository, the workflow will run automatically for those events. Open the relevant workflow run in the repository's **Actions** tab to download the `playwright-report` artifact.

## Security and demo data

This project is designed for public demonstration. Do not commit real credentials, `.env` files, private keys, or client data. The SauceDemo login data in the test suite is public demo data supplied by SauceDemo.
