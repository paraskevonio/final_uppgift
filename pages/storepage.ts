import { Locator, Page } from "@playwright/test";

export class StorePage {
    readonly page: Page;
    readonly usernameText : Locator;
    readonly header: Locator;
    readonly usernameDisplay : Locator;
    
    
    constructor(page: Page){
        this.page= page;
        this.usernameText = page.getByTestId('username') 
        this.usernameDisplay = page.locator('#usernameDisplay');
        this.header = page.locator('h1')      

    }
    
}
