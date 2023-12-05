import multer from 'multer'
import { fileURLToPath } from 'url';
import { dirname, extname, resolve } from 'path';
import { v4 } from 'uuid'; // Importando a função v4 corretamente

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            return callback(null, v4() + extname(file.originalname)); // Usando a função v4 e extname corretamente
        }
    })
};

