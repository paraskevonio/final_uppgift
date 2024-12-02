import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { StorePage } from "../pages/storepage";

test('Login with Vivi', async ({page}) => {
    const loginPage = new LoginPage(page)
    const storePage = new StorePage(page)

    await page.goto("https://hoff.is/login")

    await loginPage.login("Vivi", "sup3rs3cr3t","consumer")

    const header = await storePage.header.textContent()

    expect(header).toBe("Store")
    
})

test('Login with wrong password', async ({page}) => {
    const loginPage = new LoginPage(page)
    
    await page.goto("https://hoff.is/login")

    await loginPage.login("Vivi", "tralala","consumer")
    const message = await loginPage.errorMessage.textContent()

    expect(message).toBe("Incorrect password")    
    
})

