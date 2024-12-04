import { expect, test } from "@playwright/test"
import { StorePage } from "../pages/storepage"
import { CartPage } from "../pages/cartpage"
import { ReceiptPage } from "../pages/receiptpage"

let name = "Vivi"
let address = "Testgatan 4"
let quantity = "2"

test('Buy two cups of coffee ', async ({page}) => {
    const storePage = new StorePage(page)
    const cartPage = new CartPage(page)
    const receiptPage = new ReceiptPage(page)

    await page.goto("https://hoff.is/store2/?username=vivi&role=consumer")    

    //await storePage.purchaseProduct('8', '2', 'vivi', 'testgatan 4');
    await storePage.selectProduct('8');
    await storePage.fillAmount(quantity);
    await storePage.addToCart();

    //Verify that the cart has the correct product
    const productName = await cartPage.getProductName();
    const productQuantity = await cartPage.getProductQuantity();
    const productPrice = await cartPage.getProductPrice();
    console.log("The product name added to the cart is ", productName)
    console.log("The product quantity added to the cart is ", productQuantity)
    console.log("The product price added to the cart is ", productPrice)
    expect (productName).toBe("Cup of Coffee")
    expect (productQuantity).toBe(quantity)
    expect (productPrice).toBe("58")
    
    //Buy the product
    await storePage.clickBuy();
    //Fill in the name and the address
    await storePage.fillName(name);
    await storePage.fillAddress(address);
    await storePage.confirmPurchase();

    //Verify the reciept
    await receiptPage.verifyFinalizePurchaseModal()
    await receiptPage.verifyReceipt()
    await receiptPage.verifyReceiptDetails(quantity, 'Cup of Coffee', '58')
    await receiptPage.verifyThankYouMessage(name)
    await receiptPage.verifyShippingAddress(address)
    await receiptPage.verifyGrandTotal("69")

    await storePage.closeModal();    
    
})
