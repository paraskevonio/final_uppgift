import { Locator, Page } from "@playwright/test";

export class StorePage {
    readonly page: Page;
    readonly usernameText : Locator;
    readonly header: Locator;
    readonly productSelect: Locator;
    readonly amountInput: Locator;
    readonly addToCartButton: Locator;
    readonly buyButton: Locator;
    readonly nameInput: Locator;
    readonly addressInput: Locator;
    readonly confirmPurchaseButton: Locator;
    readonly closeButton: Locator;
    
    
    
    constructor(page: Page){
        this.page= page;
        this.usernameText = page.getByTestId('username')  
        this.header = page.locator('h1')
        this.productSelect = page.getByTestId('select-product');
        this.amountInput = page.getByLabel('Amount');
        this.addToCartButton = page.getByTestId('add-to-cart-button');
        this.buyButton = page.getByRole('button', { name: 'Buy' });
        this.nameInput = page.getByLabel('Name:');
        this.addressInput = page.getByLabel('Address:');
        this.confirmPurchaseButton = page.getByRole('button', { name: 'Confirm Purchase' });
        this.closeButton = page.getByText('Close');      

    }
    // New method to purchase a product
    async purchaseProduct(productValue: string, amount: string, name: string, address: string) {
        await this.productSelect.selectOption(productValue)
        await this.amountInput.fill(amount);
        await this.addToCartButton.click();
        await this.buyButton.click();
        await this.nameInput.fill(name);
        await this.addressInput.fill(address);
        await this.confirmPurchaseButton.click();
        await this.closeButton.click();

    }

    // Methods for individual steps
    
    async selectProduct(productValue: string) {
        await this.productSelect.selectOption(productValue);
    }

    async fillAmount(amount: string) {
        await this.amountInput.fill(amount);
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async clickBuy() {
        await this.buyButton.click();
    }

    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async fillAddress(address: string) {
        await this.addressInput.fill(address);
    }

    async confirmPurchase() {
        await this.confirmPurchaseButton.click();
    }

    async closeModal() {
        await this.closeButton.click();
    }
    
}
