import { test, expect } from '@playwright/test';


//Positiiviset testit
test.describe('Successful Dog Image Fetch', () => {
    test('should fetch dog image, when page is loaded successfully', async ({ page }) => {
        // Navigate to the app
        await page.goto('/');
        // Wait for the API response to complete
        const responsePromise = page.waitForResponse('**/api/dogs/random');
        // find dog div by alt text and get its src value
        const output = await page.getByAltText('Random dog').getAttribute('src');
        //Check, if src value contains string "https://"
        await expect(output).toContain('https:\/\/')

    });

    test('should fetch dog image, when button on page is clicked', async ({ page }) => {
        // Navigate to the app
        await page.goto('/');
        // Wait for the API response to complete on page load
        const responsePromise = page.waitForResponse('**/api/dogs/random');
        //now that the page is loaded, find and click button
        await page.getByRole('button', { name: 'Get Another Dog' }).click();
        // wait for the api response again
        await responsePromise;
        // find dog div by alt text and get its src value
        const output = await page.getByAltText('Random dog').getAttribute('src');
        //Check, if src value contains string "https://"
        await expect(output).toContain('https:\/\/')

    });
});

//Negatiivinen testi
test.describe('Error Handling', () => {
    test('should show error on API failure', async ({ page }) => {
        // Mock API to fail
        await page.route('**/api/dogs/random', async (route) => {
            await route.abort();
        });
        // Navigate to the app
        await page.goto('/');
        // Expect page to have an element, that contains the word error
        await expect(page.getByText('Error')).toHaveText(/Error/)

        // Expect page to have element visible that has the word error
        await expect(page.getByText('Error')).toBeVisible();
    });
  });
