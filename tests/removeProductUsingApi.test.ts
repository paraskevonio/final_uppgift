import { expect, test } from "@playwright/test";
import { StorePage } from "../pages/storepage";
import { CartPage } from "../pages/cartpage";

// Variable to store product details for the second test
let selectedProduct: { id: number; name: string; price: number; vat: number } | null = null;

test('Verify API responses for product IDs 1 to 10', async ({ request }) => {
  const productList: Array<{ id: number; name: string; price: number; vat: number }> = [];

  // Loop through product IDs 1 to 10
  for (let productId = 1; productId <= 10; productId++) {
    const apiResponse = await request.get(`https://hoff.is/store2/api/v1/price/${productId}`);

    // Check if the API response is OK (status 200)
    expect(apiResponse.status()).toBe(200);

    // Parse the response body
    const responseBody = await apiResponse.json();

    // Validate response structure and data types
    expect(responseBody).toHaveProperty('id', productId);
    expect(responseBody).toHaveProperty('price');
    expect(typeof responseBody.price).toBe('number');
    expect(responseBody).toHaveProperty('vat');
    expect(typeof responseBody.vat).toBe('number');
    expect(responseBody).toHaveProperty('name');
    expect(typeof responseBody.name).toBe('string');
    expect(responseBody.name.trim().length).toBeGreaterThan(0);

    // Log the response
    console.log(`Product ${productId}:`, responseBody);

    // Store product details in an array
    productList.push(responseBody);
  }

  // Randomly select a product for the next test
  const randomIndex = Math.floor(Math.random() * productList.length);
  selectedProduct = productList[randomIndex];
  console.log(`Selected product for next test:`, selectedProduct);
});

test('Add and remove product from cart', async ({ page }) => {
  const storePage = new StorePage(page);
  const cartPage = new CartPage(page);

  if (!selectedProduct) {
    throw new Error("No product data available for the test.");
  }

  await page.goto("https://hoff.is/store2/?username=vivi&role=consumer");

  await storePage.selectProduct(selectedProduct.id.toString());
  await storePage.fillAmount('1');
  await storePage.addToCart();

  // Verify cart details
  const productName = await cartPage.getProductName();
  const productQuantity = await cartPage.getProductQuantity();
  const productPrice = await cartPage.getProductPrice();

  console.log("Product added to the cart:", productName);
  expect(productName).toBe(selectedProduct.name);
  expect(productQuantity).toBe("1");
  expect(productPrice).toBe(selectedProduct.price.toString());

  // Remove product from cart
  await cartPage.removeProduct();
  await page.waitForTimeout(5000);

  // Verify cart is empty
  await cartPage.verifyCartIsEmpty();
  await cartPage.verifyGrandTotal('0');
  await cartPage.verifyTotalSum('0');
  await cartPage.verifyVat('0');
});
