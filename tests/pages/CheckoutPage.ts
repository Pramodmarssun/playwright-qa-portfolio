import { Locator, Page } from '@playwright/test';

export interface CheckoutDetails {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage {
  readonly confirmationMessage: Locator;

  constructor(private readonly page: Page) {
    this.confirmationMessage = page.getByTestId('complete-header');
  }

  async completeCheckout(details: CheckoutDetails): Promise<void> {
    await this.page.getByTestId('firstName').fill(details.firstName);
    await this.page.getByTestId('lastName').fill(details.lastName);
    await this.page.getByTestId('postalCode').fill(details.postalCode);
    await this.page.getByTestId('continue').click();
    await this.page.getByTestId('finish').click();
  }
}
