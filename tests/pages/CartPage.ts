import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly backpackItem: Locator;

  constructor(private readonly page: Page) {
    this.backpackItem = page.getByTestId('inventory-item-name').filter({
      hasText: 'Sauce Labs Backpack',
    });
  }

  async checkout(): Promise<void> {
    await this.page.getByTestId('checkout').click();
  }
}
