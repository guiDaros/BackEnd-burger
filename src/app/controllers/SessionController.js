import * as Yup from 'yup'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import authConfig from '../../config/auth.js'

class SessionController {
    async store(request, response) {

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        const userEmailOrPassIncorrect = () => {
            return response
                .status(401)
                .json({ error: "Something went wrong" })
        }

        if (!(await schema.isValid(request.body))) {
            userEmailOrPassIncorrect()
        }

        const { email, password } = request.body

        const user = await User.findOne({
            where: { email },
        })

        if (!user) {
            userEmailOrPassIncorrect()
        }

        if (!(await user.checkPassword(password))) {
            userEmailOrPassIncorrect()
        }

        return response.json({
            id: user.id,
            email,
            name: user.name,
            admin: user.admin,
            token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        })
    }
}

export default new SessionController