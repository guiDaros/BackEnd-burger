// import { fileURLToPath } from 'url';

// import express from "express";
// import routes from './routes.js'
// import resolve from 'path'

// import './database/index.js'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// class App {
//     constructor(){
//         this.app = express()

//         this.middlewares()
//         this.routes()
//     }

//     middlewares(){
//         this.app.use(express.json())
//         this.app.use('/product-file', express.static(resolve(__dirname,'..','uploads' )))
//     }

//     routes(){
//         this.app.use(routes)
//     }
// }

// const appInstance = new App().app;
// const port = 3011; 

// appInstance.listen(port, () => {
//     console.log(`🚀  server has been launched on port ${port}`);
// });

// export default new App().app


import { fileURLToPath } from 'url';
import express from 'express';
import path, { dirname } from 'path'; // Importando 'path' e 'dirname'
import routes from './routes.js';
import './database/index.js';
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
    //origin: 'https://front-end-burger.vercel.app/login',
    origin: '*', // Isso permite todas as origens
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

class App {
    constructor() {
        this.app = express();
        this.app.use(cors(corsOptions))

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(
            '/product-file', 
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );

        this.app.use(
            '/category-file', 
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );
    }

    routes() {
        this.app.use(routes);
    }
}

const appInstance = new App().app;
const port = process.env.PORT || 3011;

appInstance.listen(port, () => {
    console.log(`🚀  server has been launched on port ${port}`);
});

export default appInstance; // Exportando a instância única do aplicativo




