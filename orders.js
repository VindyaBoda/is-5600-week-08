const cuid = require('cuid');
const db = require('./db');

const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{
    type: String,
    ref: 'Product', // Automatically fetches associated products
    index: true,
    required: true
  }],
  status: {
    type: String,
    index: true,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'SHIPPED', 'COMPLETED', 'CANCELLED'] // Added 'SHIPPED' and 'CANCELLED'
  }
});

/**
 * List orders with optional filtering
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options;

  const query = {};
  if (productId) query.products = productId;
  if (status) query.status = status;

  return await Order.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);
}

/**
 * Get an order by ID
 */
async function get(_id) {
  if (!_id) throw new Error('Order ID is required');
  
  const order = await Order.findById(_id).populate('products').exec();
  
  if (!order) throw new Error(`Order with ID ${_id} not found`);

  return order;
}

/**
 * Edit an order
 */
async function edit(_id, changes) {
  if (!_id) throw new Error('Order ID is required');
  if (!changes || Object.keys(changes).length === 0) throw new Error('No changes provided');

  const order = await get(_id);
  if (!order) throw new Error(`Order with ID ${_id} not found`);

  // Validate status before updating
  if (changes.status && !Order.schema.path('status').enumValues.includes(changes.status)) {
    throw new Error(`Invalid status: ${changes.status}. Allowed values: ${Order.schema.path('status').enumValues.join(', ')}`);
  }

  Object.assign(order, changes);
  await order.save();
  return order;
}

/**
 * Create a new order
 */
async function create(fields) {
  if (!fields.buyerEmail || !fields.products?.length) {
    throw new Error('buyerEmail and products are required');
  }

  const order = new Order(fields);
  await order.save();
  await order.populate('products');

  return order;
}

module.exports = {
  create,
  get,
  list,
  edit
};
