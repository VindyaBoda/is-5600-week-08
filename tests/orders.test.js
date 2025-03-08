const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
  let createdOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  test('should list orders', async () => {
    const orders = await list();
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeGreaterThan(4);
  });

  test('should create an order', async () => {
    createdOrder = await create(orderData);
    expect(createdOrder).toBeDefined();
    expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
  });

  test('should get an order by id', async () => {
    const order = await get(createdOrder._id);
    expect(order).toBeDefined();
    expect(order._id).toBe(createdOrder._id);
  });

  test('should edit an order', async () => {
    const change = { status: 'SHIPPED' }; // ✅ Use valid status
    const editedOrder = await edit(createdOrder._id, change);
    expect(editedOrder).toBeDefined();
    expect(editedOrder.status).toBe('SHIPPED'); // ✅ Ensuring enum match
  });
});
