// import * as Yup from 'yup';
// import Category from '../models/Category.js'
// import User from '../models/User.js'

// class CategoryController {
//     async store(request, response) {
//         const schema = Yup.object().shape({
//             name: Yup.string().required(),
//         });

//         try {
//             await schema.validateSync(request.body, { abortEarly: false });
//         } catch (err) {
//             return response.status(400).json({ error: err.errors });
//         }

//         const { admin: isAdmin } = await User.findByPk(request.userId)

//         if (!isAdmin) {
//             return response.status(401).json("unauthorized")
//         }

//         const { name } = request.body;

//         const { filename, path } = request.file;

//         const categoryExists = await Category.findOne({
//             where: {
//                 name,
//             },
//         })

//         if (categoryExists) {
//             return response.status(400).json({ error: 'Category already exists' })
//         }

//         const { id } = await Category.create({ name, path });

//         return response.json({ id, name });
//     }


//     async index(request, response) {
//         const category = await Category.findAll()

//         return response.json(category)
//     }



//     async update(request, response) {
//         const schema = Yup.object().shape({
//             name: Yup.string().required(),
//         });

//         try {
//             await schema.validateSync(request.body, { abortEarly: false });
//         } catch (err) {
//             return response.status(400).json({ error: err.errors });
//         }

//         const { admin: isAdmin } = await User.findByPk(request.userId)

//         if (!isAdmin) {
//             return response.status(401).json("unauthorized")
//         }

//         const { name } = request.body;


//         const { id } = request.params

//         const category = await Category.findByPk(id)

//         if (!category) {
//             return response.status(401).json({ error: "Make sure your category ID is correct" })
//         }

//         let path
//         if (request.file) {
//             path = request.file.filename
//         }


//         await Category.update({ name, path }, { where: { id } });

//         return response.status(200).json({ message: "Sucess!" });
//     }
// }

// export default new CategoryController();


import * as Yup from 'yup';
import Category from '../models/Category.js'
import User from '../models/User.js'

class CategoryController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json("unauthorized");
        }

        const { name } = request.body;

        const categoryExists = await Category.findOne({ where: { name } });

        if (categoryExists) {
            return response.status(400).json({ error: 'Category already exists' });
        }

        const category = await Category.create({ name });

        return response.json(category);
    }

    async index(request, response) {
        const categories = await Category.findAll();

        return response.json(categories);
    }

    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json("unauthorized");
        }

        const { name } = request.body;
        const { id } = request.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return response.status(404).json({ error: "Category not found" });
        }

        const categoryWithSameName = await Category.findOne({ where: { name } });

        if (categoryWithSameName && categoryWithSameName.id !== parseInt(id)) {
            return response.status(400).json({ error: 'Category name already exists' });
        }

        let updatedPath = category.path; // Assuming path needs to be updated

        if (request.file) {
            updatedPath = request.file.filename; // Assuming file's path needs to be updated
        }

        await Category.update({ name, path: updatedPath }, { where: { id } });

        const updatedCategory = await Category.findByPk(id); // Retrieve updated category

        return response.status(200).json({ message: "Success!", category: updatedCategory });
    }
}

export default new CategoryController();
