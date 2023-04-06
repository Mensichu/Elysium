"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;

var _products = require("../controllers/products.controller");

var queries = {
  getAllProduct: 'SELECT * FROM Products',
  addNewProduct: 'INSERT INTO Products (name,description,quantity) VALUES (@name,@description,@quantity)',
  getProductById: 'SELECT * FROM Products WHERE Id=@Id',
  deleteProduct: 'DELETE FROM [db_test].[dbo].[Products] WHERE Id= @Id',
  getTotalProducts: 'SELECT COUNT(*) FROM [db_test].[dbo].[Products]',
  updateProductsById: 'UPDATE [db_test].[dbo].[Products] SET Name=@name, Description=@description, Quantity=@quantity WHERE Id=@id'
};
exports.queries = queries;