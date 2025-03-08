const productTestHelper = require('./test-utils/productTestHelper');
const { list, get, destroy, create } = require('../products');

describe('Product Module', () => {
  let testProduct;

  beforeAll(async () => {
    await productTestHelper.setupTestData();
    const products = await list();
    testProduct = products[0]; // Use a real product ID
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  test('should list all products', async () => {
    const products = await list();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  test('should get a product by id', async () => {
    const product = await get(testProduct._id); // ✅ Fetch real product
    expect(product).toBeDefined();
    expect(product.description).toBe(testProduct.description);
  });

  test('should delete a product', async () => {
    await destroy(testProduct._id); // ✅ Delete real product
    const product = await get(testProduct._id);
    expect(product).toBeNull(); // ✅ Ensure it was deleted
  });
});
