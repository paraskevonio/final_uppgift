import { Page, Locator, expect } from '@playwright/test';

export class ReceiptPage {
  readonly page: Page;
  readonly purchaseModalLabel: Locator;
  readonly finalReceipt: Locator;
  readonly receiptItem: Locator;
  readonly thankYouMessage: Locator;
  readonly shippingAddress: Locator;
  readonly receiptTotal: Locator;
  readonly receiptVAT: Locator;
  readonly grandTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.purchaseModalLabel = page.locator('#purchaseModalLabel');
    this.finalReceipt = page.locator('#finalReceipt');
    this.receiptItem = page.getByRole('listitem');
    this.thankYouMessage = page.locator('#name');
    this.shippingAddress = page.locator('#address');
    this.receiptTotal = page.locator('#receiptTotal');
    this.receiptVAT = page.locator('#receiptVAT');
    this.grandTotal = page.locator('#receiptGrandTotal');
  }

  async verifyFinalizePurchaseModal() {
    await expect(this.purchaseModalLabel).toContainText('Finalize Purchase');
  }

  async verifyReceipt() {
    await expect(this.finalReceipt).toContainText('Receipt');
  }

  async verifyReceiptDetails(quantity: string, productName: string, price: string) {
    const expectedText = `${quantity} x ${productName} - $${price} `;
    await expect(this.receiptItem).toContainText(expectedText);
  }

  async verifyThankYouMessage(name: string) {
    await expect(this.thankYouMessage).toContainText(`Thank you for your purchase, ${name}`);
  }

  async verifyShippingAddress(address: string) {
    await expect(this.shippingAddress).toContainText(`It will be shipped to: ${address}`);
  }

  async verifyReceiptTotal(amount: string) {
    await expect(this.receiptTotal).toContainText(amount);
  }

  async verifyReceiptVAT(vat: string) {
    await expect(this.receiptVAT).toContainText(vat);
  }

  async verifyGrandTotal(total: string) {
    await expect(this.grandTotal).toContainText(total);
  }
}
