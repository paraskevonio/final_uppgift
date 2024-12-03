import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { StorePage } from "../pages/storepage";

let password: string
test('Login with Vivi', async ({page}) => {
    const loginPage = new LoginPage(page)
    const storePage = new StorePage(page)

    if (process.env.PASSWORD !== undefined) {
        password = process.env.PASSWORD
    }

    await page.goto("https://hoff.is/login")

    await loginPage.login("Vivi", password,"consumer")

    const header = await storePage.header.textContent() 
    //console.log(storePage.getUsername())  

    
    expect(header).toBe("Store")
    //expect(storePage.getUsername()).toContain('vivi');
    
})

test('Login with wrong password', async ({page}) => {
    const loginPage = new LoginPage(page)
    
    await page.goto("https://hoff.is/login")

    await loginPage.login("Vivi", "tralala","consumer")
    const message = await loginPage.errorMessage.textContent()

    expect(message).toBe("Incorrect password")    
    
})

