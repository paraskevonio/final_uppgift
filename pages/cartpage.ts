import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productQuantity: Locator;
  readonly productPrice: Locator;
  readonly cartItems: Locator;
  readonly removeButton: Locator;
  readonly totalSum: Locator;
  readonly vatSum: Locator;
  readonly grandTotalSum: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('tbody#cartItems tr td').nth(0);
    this.productQuantity = page.locator('tbody#cartItems tr td').nth(1);
    this.productPrice = page.locator('tbody#cartItems tr td').nth(2);
    this.removeButton = page.locator('button', { hasText: 'Remove' });
    this.totalSum = page.locator('#totalSum');
    this.vatSum = page.locator('#totalVAT');
    this.grandTotalSum = page.locator('#grandTotal');
    this.cartItems = page.locator('#cartItems');
  }  

  // Get the product name
  async getProductName() {
    return await this.productName.textContent();
  } 

  // Get the product quantity
  async getProductQuantity() {
    return await this.productQuantity.textContent();
  }

  // Get the product price
  async getProductPrice() {
    return await this.productPrice.textContent();
  }
  
  // Method to verify that the cart table is empty
  async verifyCartIsEmpty() {
    const rowCount = await this.cartItems.locator('tr').count(); // Count the rows inside tbody
    expect(rowCount).toBe(0); // Ensure that there are no rows in the table
  }

  // Method to remove the product
  async removeProduct() {
    await this.removeButton.click();
  }
  // Method to verify the grand total value
  async verifyGrandTotal(expectedTotal: string) {
    await expect(this.grandTotalSum).toHaveText(expectedTotal);
  }
  // Method to verify the total value
  async verifyTotalSum (expectedTotalSum: string) {
    await expect(this.totalSum).toHaveText(expectedTotalSum);
  }

  // Method to verify the  vat
  async verifyVat (vat: string) {
    await expect(this.vatSum).toHaveText(vat);
  }

}
