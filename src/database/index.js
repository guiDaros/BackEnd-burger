import { Sequelize, Model, DataTypes } from "sequelize";
import mongoose from "mongoose";

import Product from "../app/models/Products.js";
import User from "../app/models/User.js";
import Category from "../app/models/Category.js";

import configDatabase from "../config/database.js";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase);

    models.forEach((model) => {
      model.init(this.connection);
    });

    // Define associations
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }

  async mongo() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/codeburguer', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connection established successfully!');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }

    const db = mongoose.connection;

    db.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    db.on('error', (error) => {
      console.error('Error in MongoDB connection:', error);
    });

    db.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });
  }
}

export default new Database();




