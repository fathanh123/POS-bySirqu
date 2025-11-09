// models/productImage.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Products = require('./products');

class ProductImages extends Model {}

ProductImages.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productsId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products', // Pastikan nama model produk sesuai dengan yang ada
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'productImages',
  tableName: 'productimages',
  timestamps: true,
  paranoid: true,
});

// Definisikan relasi
ProductImages.belongsTo(Products, { foreignKey: 'productsId' });
Products.hasMany(ProductImages, { foreignKey: 'productsId' });

module.exports = ProductImages;
