const mockProducts = [
    { _id: 'mockProductId', description: 'Product 1' },
    { _id: 'mockProductId2', description: 'Product 2' }
  ];
  
  const mockQuery = {
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(mockProducts),
    then: function (resolve) { resolve(mockProducts); }
  };
  
  const mockModel = {
    find: jest.fn().mockReturnValue(mockQuery),
    findById: jest.fn().mockResolvedValue(mockProducts[0]),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
  };
  
  const mockDb = {
    model: jest.fn().mockReturnValue(mockModel)
  };
  
  module.exports = {
    mockDb, mockProducts, mockModel, mockQuery
  };
  