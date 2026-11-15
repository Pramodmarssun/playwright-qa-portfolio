import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async addBackpackToCart(): Promise<void> {
    await this.page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  }

  async removeBackpackFromCart(): Promise<void> {
    await this.page.getByTestId('remove-sauce-labs-backpack').click();
  }

  async openCart(): Promise<void> {
    await this.page.getByTestId('shopping-cart-link').click();
  }
}
