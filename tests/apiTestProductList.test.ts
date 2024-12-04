import { test, expect } from "@playwright/test";

interface Product {
    id: number;
    name: string;    
  }
  
  test('Verify product list API', async ({ request }) => {
    // Make the API request
    const response = await request.get('https://hoff.is/store2/api/v1/product/list');
  
    // Verify the request was successful
    expect(response.status()).toBe(200);  // Check HTTP status code
  
    // Parse the response body as JSON
    const responseJson: { products: Product[] } = await response.json();
  
    // Verify the response structure
    expect(responseJson).toBeTruthy();  // Ensure the response is not empty
    expect(responseJson).toHaveProperty('products');  // Verify the 'products' node exists
    expect(Array.isArray(responseJson.products)).toBe(true);  // Ensure 'products' is an array
    expect(responseJson.products.length).toBe(10) //Verify that we get 10 products in the response
    console.log(`Number of products in the list: ${responseJson.products.length}`);

  
    // Loop through all products and validate 'id' and 'name'
    for (const product of responseJson.products) {
        // Log each product's details
        console.log(`Product ID: ${product.id}, Name: ${product.name}`);
    
        // Check that 'id' exists, is a number, and is not null
        expect(product).toHaveProperty('id');
        expect(typeof product.id).toBe('number');
        expect(product.id).not.toBeNull();
    
        // Check that 'name' exists, is a string, and is not null
        expect(product).toHaveProperty('name');
        expect(typeof product.name).toBe('string');
        expect(product.name).not.toBeNull();
        expect(product.name.trim().length).toBeGreaterThan(0);  // Ensure 'name' is not an empty string
        
    }

  });