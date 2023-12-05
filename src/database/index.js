// import { Sequelize } from "sequelize";
// import mongoose from "mongoose";

// import Product from "../app/models/Products.js";
// import User from "../app/models/User.js";
// import Category from "../app/models/Category.js";

// import configDatabase from "../config/database.js";

// const models = [User, Product, Category]

// class Database {
//     constructor() {
//         this.init()
//         //this.mongo()
//     }

//     init() {
//         this.connection = new Sequelize(configDatabase);
//         models
//             .map((model) => model.init(this.connection))
//             .map(model => model.associate && model.associate(this.connection.models))
//     }

//     // mongo(){
//     //     this.mongoConnection = mongoose.connect(
//     //         'mongodb://localhost:3011/codeburguer',
//     //     {
//     //         useNewUrlParser: true,
//     //         useUnifiedTopology:true,
//     //     }
//     //     )
//     // }
// }








// mongoose.connect('mongodb://localhost/27017', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log('Conexão com o MongoDB estabelecida com sucesso!');
//     })
//     .catch((error) => {
//         console.error('Erro ao conectar ao MongoDB:', error);
//     });

// const db = mongoose.connection;

// db.on('connected', () => {
//     console.log('Conectado ao MongoDB');
// });

// db.on('error', (error) => {
//     console.error('Erro na conexão com o MongoDB:', error);
// });

// db.on('disconnected', () => {
//     console.log('Desconectado do MongoDB');
// });





// export default new Database()

//CODIGO CERTO

// import { Sequelize, Model } from "sequelize";
// import mongoose from "mongoose";

// import Product from "../app/models/Products.js";
// import User from "../app/models/User.js";
// import Category from "../app/models/Category.js";

// import configDatabase from "../config/database.js";

// const models = [User, Product, Category];

// class Database {
//     constructor() {
//         this.init();
//         this.mongo();
//     }

//     init() {
//         this.connection = new Sequelize(configDatabase);
//         models.forEach((model) => model.init(this.connection));
//         models.forEach((model) => {
//             if (model.associate) {
//                 model.associate(this.connection.models);
//             }
//         });
//     }

//     mongo() {
//         mongoose.connect('mongodb://localhost:27017/codeburguer', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//             .then(() => {
//                 console.log('MongoDB connection established successfully!');
//             })
//             .catch((error) => {
//                 console.error('Error connecting to MongoDB:', error);
//             });

//         const db = mongoose.connection;

//         db.on('connected', () => {
//             console.log('Connected to MongoDB');
//         });

//         db.on('error', (error) => {
//             console.error('Error in MongoDB connection:', error);
//         });

//         db.on('disconnected', () => {
//             console.log('Disconnected from MongoDB');
//         });
//     }
// }

// export default new Database();


// Import necessary modules and models
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
    this.connection = new Sequelize(
      //configDatabase
      'postgresql://postgres:G64fEgf-125gb1DcC2CdFf-A-DCcAadc@monorail.proxy.rlwy.net:37364/railway'
      );

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
      await mongoose.connect(
        //'mongodb://127.0.0.1:27017/codeburguer',
        'mongodb://mongo:aG26abfaH36Bg5f3E6d4FDC2F2-4caA5@roundhouse.proxy.rlwy.net:28119',
        {
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




