import * as Yup from 'yup';
import Category from '../models/Category.js'
import User from '../models/User.js'

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

//         if(!category){
//             return response.status(401).json({error:"Make sure your category ID is correct"})
//         }

//         let path
//         if(request.file){
//             path = request.file.filename
//         }


//         await Category.update({ name, path }, {where: { id }});

//         return response.status(200).json({message:"Sucess!"});
//     }


// }

// export default new CategoryController();


class CategoryController {
    async store(req, res) {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      })
  
      try {
        await schema.validateSync(req.body, { abortEarly: false })
      } catch (err) {
        return res.status(400).json({ error: err.errors })
      }
  
      const { admin: isAdmin } = await User.findByPk(req.userId)
      if (!isAdmin) {
        return res.status(401).json()
      }
  
      const { name } = req.body
  
      const { filename: path } = req.file
  
      const categoryExists = await Category.findOne({
        where: { name },
      })
      if (categoryExists) {
        return res.status(400).json({ error: 'Category already exists' })
      }
  
      const { id } = await Category.create({ name, path })
      return res.json({ name, id })
    }
  
    async index(req, res) {
      const category = await Category.findAll()
  
      return res.json(category)
    }
  
    async update(req, res) {
      try {
        const schema = Yup.object().shape({
          name: Yup.string(),
        })
  
        try {
          await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
          return res.status(400).json({ error: err.errors })
        }
  
        const { admin: isAdmin } = await User.findByPk(req.userId)
        if (!isAdmin) {
          return res.status(401).json()
        }
  
        const { name } = req.body
  
        const { id } = req.params
  
        const category = await Category.findByPk(id)
  
        if (!category) {
          return res
            .status(401)
            .json({ error: 'Make sure your category ID is correct' })
        }
  
        let path
        if (req.file) {
          path = req.file.filename
        }
  
        await Category.update({ name, path }, { where: { id } })
        return res.status(200).json({ name, id })
      } catch (err) {
        console.log(err)
      }
    }
  }
  
  export default new CategoryController()