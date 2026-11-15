
import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

const standardUser = {
  username: 'standard_user',
  password: 'secret_sauce',
};

test('Complete e-commerce checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);

  await expect(page).toHaveURL(/inventory.html/);

  await inventoryPage.addBackpackToCart();
  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.openCart();
  await expect(cartPage.backpackItem).toBeVisible();

  await cartPage.checkout();
  await checkoutPage.completeCheckout({
    firstName: 'Test',
    lastName: 'Customer',
    postalCode: '560001',
  });

  await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
});


test('Reject invalid login credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('invalid_user', 'wrong_password');

  await expect(loginPage.errorMessage).toContainText('Username and password do not match');
});

test('Add and remove product from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);

  await inventoryPage.addBackpackToCart();
  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.removeBackpackFromCart();
  await expect(inventoryPage.cartBadge).toHaveCount(0);
});
