import { test, expect } from '@playwright/test';

// const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

test.describe('HomePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display product cards', async ({ page }) => {
    // Wait for product cards to be rendered
    const count = await page.locator('.products-grid .product-card').count();
    expect(count).toBeGreaterThan(0);
  });

  test('should paginate products', async ({ page }) => {
    const productsOnPage1 = await page.locator('.products-grid .product-card').allTextContents();
    // await wait(10000); // Wait before navigation

    await page.getByRole('button', { name: /next/i }).click();
    // await wait(10000); // Wait before navigation

    const productsOnPage2 = await page.locator('.products-grid .product-card').allTextContents();
    // await wait(10000); // Wait before navigation

    // Check that the content has changed
    expect(productsOnPage2).not.toEqual(productsOnPage1);
  });

  test('should go back to previous page', async ({ page }) => {
    await page.getByRole('button', { name: /next/i }).click();
    const page2Products = await page.locator('.products-grid .product-card').allTextContents();

    await page.getByRole('button', { name: /previous/i }).click();
    const page1Products = await page.locator('.products-grid .product-card').allTextContents();

    expect(page1Products).not.toEqual(page2Products);
  });

  test('shows message when no products match search', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search by name..."]');
    await searchInput.fill('this value does not exist'); // unlikely to match any product

    await expect(page.locator('.no-products')).toBeVisible();
  });
});
