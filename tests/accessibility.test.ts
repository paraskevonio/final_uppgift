import { test, expect } from '@playwright/test';
import * as axe from 'axe-core';  // Import axe-core

// Inject axe-core into the page
async function injectAxe(page: any) {
  await page.addScriptTag({ content: axe.source }); // Adds axe-core to the page
}

// Run axe-core accessibility check
async function runAccessibilityCheck(page: any) {
  const results = await page.evaluate(() => {
    // Run axe-core in the page context
    return axe.run();
  });
  return results;
}

test('The page should have no accessibility violations', async ({ page }) => {
  // Go to the page you want to test
  await page.goto('https://hoff.is/store2/?username=vivi&role=consumer');  

  // Inject axe-core into the page
  await injectAxe(page);

  // Run accessibility check using axe-core
  const results = await runAccessibilityCheck(page);
  // If violations are found, print them to the console
  if (results.violations.length > 0) {
    console.log('Accessibility violations found:');
    results.violations.forEach((violation: any) => {
      console.log(`- Rule: ${violation.id}`);
      console.log(`  Description: ${violation.description}`);
      console.log(`  Impact: ${violation.impact}`);
      console.log(`  Nodes affected:`);
      violation.nodes.forEach((node: any) => {
        console.log(`    - HTML: ${node.html}`);
        console.log(`      Target: ${node.target}`);
      });
      console.log('---');
    });
  } else {
    console.log('No accessibility violations found!');
  }

  // Ensure that there are no violations
  expect(results.violations.length).toBe(0); // No accessibility violations should be present
});