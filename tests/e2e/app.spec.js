const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

test.describe('Data Structure Visualizer E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test.describe('Home Page', () => {
    test('should display home page with title and cards', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Visualize Data Structures' })).toBeVisible();
        await expect(page.getByText('An interactive way to understand complex data structures. Choose one to get')).toBeVisible();
        await expect(page.getByText('Binary Tree A tree where each')).toBeVisible();
        await expect(page.getByText('Trie An efficient tree for')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Visualize Algorithms' })).toBeVisible();
        await expect(page.getByText('An interactive way to understand complex algorithms. Choose one to get started.')).toBeVisible();
        await expect(page.getByText('Binary Search Animated step-')).toBeVisible();
        await expect(page.getByText('Breadth First Search Level-')).toBeVisible();
    });

    test('should open and close about modal', async ({ page }) => {
      await page.locator('#home-about-btn').click();
      await expect(page.locator('#about-modal')).toHaveClass(/show/);
      
      await page.locator('#close-about-modal').click();
      await page.waitForTimeout(500);
      await expect(page.locator('#about-modal')).toHaveClass(/opacity-0/);
    });

    test('should open search modal and search', async ({ page }) => {
      await page.locator('#home-search-btn').click();
      await expect(page.locator('#search-modal')).toHaveClass(/show/);
      
      await page.locator('#search-input').fill('binary');
      await page.waitForTimeout(300);
      await expect(page.locator('#search-results .result-item')).toHaveCount(3); // Binary Tree, BST, Binary Search
      
      await page.locator('#search-close-btn').click();
      await expect(page.locator('#search-modal')).toHaveClass(/hidden/);
    });

    test('should navigate to sections via navbar', async ({ page }) => {
      // Click DS button
      await page.locator('#nav-ds-btn').click();
      await page.waitForTimeout(500);
      
      // Should scroll to data structures section
      const dsCard = page.locator('.card[data-type="BT"]');
      await expect(dsCard).toBeInViewport();
    });
  });

  test.describe('Binary Tree Visualizer', () => {
    test('should navigate to binary tree visualizer', async ({ page }) => {
      await page.locator('.card[data-type="BT"]').click();
      await expect(page).toHaveURL(/.*binarytree/);
      await expect(page.locator('#visualizer-title')).toContainText('Binary Tree');
      await expect(page.locator('#visualizer-page')).not.toHaveClass(/hidden/);
    });

    test('should visualize binary tree with valid input', async ({ page }) => {
      await page.locator('.card[data-type="BT"]').click();
      
      await page.locator('#tree-input').fill('1, 2, 3, 4, 5, 6, 7');
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(1000);
      await expect(page.locator('#canvas .node')).toHaveCount(7);
      await expect(page.locator('#toast-container')).toContainText('Visualization complete!');
    });

    test('should show error for invalid input', async ({ page }) => {
      await page.locator('.card[data-type="BT"]').click();
      
      await page.locator('#tree-input').fill('1, abc, 3');
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(500);
      await expect(page.locator('#toast-container')).toContainText('Invalid input');
    });

    test('should navigate back to home', async ({ page }) => {
      await page.locator('.card[data-type="BT"]').click();
      await expect(page).toHaveURL(/.*binarytree/);
      
      await page.locator('#back-btn').click();
      await expect(page).toHaveURL(BASE_URL + '/');
      await expect(page.locator('#home-page')).not.toHaveClass(/hidden/);
    });

    test('should open DS info modal', async ({ page }) => {
      await page.locator('.card[data-type="BT"]').click();
      
      await page.locator('#visualizer-info-btn').click();
      await expect(page.locator('#ds-info-modal')).toHaveClass(/show/);
      await expect(page.locator('#ds-info-title')).toContainText('Binary Tree');
      
      await page.locator('#close-ds-info-modal').click();
      await page.waitForTimeout(500);
      await expect(page.locator('#ds-info-modal')).toHaveClass(/opacity-0/);
    });
  });

  test.describe('Binary Search Tree Visualizer', () => {
    test('should visualize BST and show balance button', async ({ page }) => {
      await page.locator('.card[data-type="BST"]').click();
      
      await page.locator('#tree-input').fill('8, 3, 10, 1, 6, 14, 4, 7, 13');
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(1000);
      await expect(page.locator('#canvas .node')).toHaveCount(9);
      await expect(page.locator('#balance-bst-btn')).toBeVisible();
      await expect(page.locator('#generate-py-btn')).toBeVisible();
    });

    test('should balance BST', async ({ page }) => {
      await page.locator('.card[data-type="BST"]').click();
      
      await page.locator('#tree-input').fill('1, 2, 3, 4, 5, 6, 7');
      await page.locator('#visualize-btn').click();
      await page.waitForTimeout(1000);
      
      await page.locator('#balance-bst-btn').click();
      await page.waitForTimeout(1000);
      await expect(page.locator('#toast-container')).toContainText('BST has been balanced!');
    });

    test('should reject duplicate values', async ({ page }) => {
      await page.locator('.card[data-type="BST"]').click();
      
      await page.locator('#tree-input').fill('5, 3, 7, 3, 9');
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(500);
      await expect(page.locator('#toast-container')).toContainText('duplicate');
    });

    test('should generate Python code', async ({ page }) => {
      await page.locator('.card[data-type="BST"]').click();
      
      await page.locator('#tree-input').fill('8, 3, 10');
      await page.locator('#visualize-btn').click();
      await page.waitForTimeout(1000);
      
      await page.locator('#generate-py-btn').click();
      await expect(page.locator('#code-modal')).toBeVisible();
      await expect(page.locator('#python-code-detailed')).toContainText('TreeNode');
      
      await page.locator('#close-modal-btn').click();
      await expect(page.locator('#code-modal')).toHaveClass(/hidden/);
    });
  });

  test.describe('Trie Visualizer', () => {
    test('should visualize trie with words', async ({ page }) => {
      await page.locator('.card[data-type="TRIE"]').click();
      
      await page.locator('#tree-input').fill('apple, app, apply, apt, ape');
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(1000);
      await expect(page.locator('#canvas .node')).toHaveCount(9, { timeout: 2000 }); // root + characters
    });
  });

  test.describe('M-ary Tree Visualizer', () => {
    test('should visualize M-ary tree with custom M value', async ({ page }) => {
      await page.locator('.card[data-type="MARY"]').click();
      
      await expect(page.locator('#m-value-container')).toBeVisible();
      await page.locator('#m-value-input').fill('3');
      await page.locator('#tree-input').fill('1, 2, 3, 4, 5, 6, 7, 8, 9');
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(1000);
      await expect(page.locator('#canvas .node')).toHaveCount(9);
    });

    test('should reject invalid M values', async ({ page }) => {
      await page.locator('.card[data-type="MARY"]').click();
      
      await page.locator('#m-value-input').fill('1');
      await page.locator('#tree-input').fill('1, 2, 3');
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(500);
      await expect(page.locator('#toast-container')).toContainText('M value must be between 2 and 10');
    });
  });

  test.describe('Graph Visualizer', () => {
    test('should visualize undirected graph with edge list', async ({ page }) => {
      await page.locator('.card[data-type="GRAPH"]').click();
      
      await expect(page.locator('#graph-controls')).toBeVisible();
      await page.locator('#tree-input').fill('A-B, B-C, C-D, D-A');
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(1000);
      await expect(page.locator('#canvas .node')).toHaveCount(4);
    });

    test('should switch to directed graph', async ({ page }) => {
      await page.locator('.card[data-type="GRAPH"]').click();
      
      await page.locator('#directed-btn').click();
      await page.locator('#tree-input').fill('A-B, B-C');
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(1000);
      // Check for arrow indicators (directed graph should have polygon elements)
      await expect(page.locator('#canvas polygon')).toHaveCount(2);
    });

    test('should validate graph input', async ({ page }) => {
      await page.locator('.card[data-type="GRAPH"]').click();
      
      await page.locator('#tree-input').fill('A-B-C'); // Invalid format
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(500);
      await expect(page.locator('#toast-container')).toContainText('Invalid');
    });
  });

  test.describe('Binary Search Algorithm', () => {
    test('should run binary search simulation', async ({ page }) => {
      await page.locator('.card[data-type="ALG"][data-alg="BINARY_SEARCH"]').click();
      
      await expect(page.locator('#algo-target-container')).toBeVisible();
      await expect(page.locator('#generate-default-array-btn')).toBeVisible();
      
      // Generate default array
      await page.locator('#generate-default-array-btn').click();
      await page.waitForTimeout(500);
      await expect(page.locator('#tree-input')).not.toBeEmpty();
      
      // Set target
      await page.locator('#algo-target-input').fill('12');
      
      // Start simulation
      await page.locator('#start-simulation-btn').click();
      
      // Wait for simulation to start
      await page.waitForTimeout(2000);
      
      // Check that array cells are rendered
      await expect(page.locator('#canvas .array-cell')).toHaveCount(50, { timeout: 1000 });
    });
  });

  test.describe('DFS Algorithm', () => {
    test('should run DFS simulation', async ({ page }) => {
      await page.locator('.card[data-type="ALG"][data-alg="DFS"]').click();
      
      await page.locator('#generate-default-array-btn').click();
      await page.waitForTimeout(500);
      
      await page.locator('#visualize-btn').click();
      await page.waitForTimeout(1000);
      await expect(page.locator('#toast-container')).toContainText('Tree ready for simulation');
      
      await page.locator('#algo-target-input').fill('12');
      await page.locator('#start-simulation-btn').click();
      
      // Wait for first step
      await page.waitForTimeout(2000);
      await expect(page.locator('#canvas .node')).toHaveCount(17, { timeout: 2000 });
    });
  });

  test.describe('Tree Traversals Algorithm', () => {
    test('should show traversal controls', async ({ page }) => {
      await page.locator('.card[data-type="ALG"][data-alg="TRAVERSAL"]').click();
      
      await expect(page.locator('#traversal-controls')).toBeVisible();
      await expect(page.locator('#preorder-btn')).toBeVisible();
      await expect(page.locator('#inorder-btn')).toBeVisible();
      await expect(page.locator('#postorder-btn')).toBeVisible();
    });

    test('should switch traversal types', async ({ page }) => {
      await page.locator('.card[data-type="ALG"][data-alg="TRAVERSAL"]').click();
      
      // Default is preorder
      await expect(page.locator('#preorder-btn')).toHaveClass(/bg-cyan-600/);
      
      // Switch to inorder
      await page.locator('#inorder-btn').click();
      await expect(page.locator('#inorder-btn')).toHaveClass(/bg-cyan-600/);
      await expect(page.locator('#preorder-btn')).toHaveClass(/bg-slate-700/);
    });
  });

  test.describe('Routing and Deep Links', () => {
    test('should support direct navigation to visualizers', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.evaluate(() => {
        history.pushState(null, '', '/binarysearchtree');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      await expect(page.locator('#visualizer-title')).toContainText('Binary Search Tree');
      await expect(page.getByRole('heading', { name: ' Controls' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Input' })).toBeVisible();
      await expect(page.getByRole('button', { name: ' Visualize' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Balance the Tree' })).toBeVisible();
      await expect(page.locator('#canvas')).toBeVisible();
      await page.getByRole('button', { name: '' }).click();
      await expect(page.getByText('A Binary Search Tree (BST) is')).toBeVisible();
    });

    test('should support browser back/forward', async ({ page }) => {
      await page.locator('.card[data-type="BT"]').click();
      await expect(page).toHaveURL(/.*binarytree/);
      
      await page.goBack();
      await expect(page).toHaveURL(BASE_URL + '/');
      await expect(page.locator('#home-page')).not.toHaveClass(/hidden/);
      
      await page.goForward();
      await expect(page).toHaveURL(/.*binarytree/);
      await expect(page.locator('#visualizer-page')).not.toHaveClass(/hidden/);
    });

    test('should maintain state when navigating via search', async ({ page }) => {
      await page.locator('#home-search-btn').click();
      await page.locator('#search-input').fill('graph');
      await page.waitForTimeout(300);
      
      await page.locator('#search-results .result-item').first().click();
      await expect(page).toHaveURL(/.*graph/);
      await expect(page.locator('#visualizer-title')).toContainText('Graph');
    });
  });

  

  test.describe('Error Handling', () => {
    test('should handle empty input gracefully', async ({ page }) => {
      await page.locator('.card[data-type="BT"]').click();
      
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(500);
      // Should not crash, just show empty canvas
      await expect(page.locator('#canvas .node')).toHaveCount(0);
    });

    test('should handle malformed input', async ({ page }) => {
      await page.locator('.card[data-type="GRAPH"]').click();
      
      await page.locator('#tree-input').fill('@@##$$%%');
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(500);
      await expect(page.locator('#toast-container')).toContainText(/Invalid|empty/i);
    });
  });

  test.describe('Performance', () => {
    test('should handle large binary tree', async ({ page }) => {
      await page.locator('.card[data-type="BT"]').click();
      
      // Create input for tree with 31 nodes (5 levels)
      const input = Array.from({ length: 31 }, (_, i) => i + 1).join(', ');
      await page.locator('#tree-input').fill(input);
      await page.locator('#visualize-btn').click();
      
      await page.waitForTimeout(2000);
      await expect(page.locator('#canvas .node')).toHaveCount(31, { timeout: 3000 });
    });
  });
});