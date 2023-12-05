


import * as Yup from 'yup';
import Product from '../models/Products.js';
import Category from '../models/Category.js';
import Order from '../schemas/Order.js';
import User from '../models/User.js';
import { response } from 'express';

class OrderController {
    async store(request, response) {
        const schema = Yup.object().shape({
            products: Yup.array().required().of(
                Yup.object().shape({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ),
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            console.error('Erro de validação:', err); // Registre erros de validação
            return response.status(400).json({ errors: err.errors.map(error => error) });
        }

        const productsId = request.body.products.map(product => product.id);

        try {
            // const updatedProducts = await Product.findAll({
            //     where: {
            //         id: productsId,
            //     },
            //     include: [
            //         {
            //             model: Category,
            //             as: 'category',
            //             attributes: ['name'],
            //         },
            //     ],
            // });

            const updatedProducts = await Product.findAll({
                where: {
                    id: productsId,
                },
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['name'],
                    },
                ],
            });

            updatedProducts.forEach(product => { });

            const editedProduct = updatedProducts.map(product => {
                const productIndex = request.body.products.findIndex(
                    (requestProduct) => requestProduct.id === product.id
                );

                const newProduct = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category.name,
                    url: product.url,
                    quantity: request.body.products[productIndex].quantity,
                };

                return newProduct;
            });

            const order = {
                user: {
                    id: request.userId,
                    name: request.userName,
                },
                products: editedProduct,
                status: 'Pedido realizado',
            };

            if (request.body.products.length === 0) {
                return response.status(400).json({ error: 'O pedido não contém produtos.' });
            }

            try {
                const orderResponse = await Order.create(order);
                return response.status(201).json(orderResponse);

            } catch (error) {
                console.error('Erro ao criar a ordem:', error);
                return response.status(500).json({ error: 'Erro ao criar a ordem' });
            }

        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return response.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    }

    async index(request, response) {
        const orders = await Order.find()

        return response.json(orders)
    }

    async update(request, response) {

        const schema = Yup.object().shape({
            status: Yup.string().required()
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            console.error('Erro de validação:', err); // Registre erros de validação
            return response.status(400).json({ errors: err.errors.map(error => error) });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json("unauthorized")
        }


        const { id } = request.params
        const { status } = request.body

        try{
            await Order.updateOne({ _id: id }, { status })
        }catch(error){
            return response.status(400).json({error: error.message})
        }

        

        return response.json({message: "Status updated with sucess"})
    }
}

export default new OrderController();
