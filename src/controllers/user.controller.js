import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SALT_ROUNDS = 10


async function createUser(req, res) {

    try {
        // Controlamos que no se puedan enviar los campos createdAt y updatedAt desde el cliente ya que sino los podría manipular entonces directamente los eliminamos del body
        // delete req.body.createdAt
        // delete req.body.updatedAt

        const { name, password, email, image } = req.body

        const newUser = new User({ name, password, email, image })

        newUser.password = await bcrypt.hash(newUser.password, SALT_ROUNDS)

        // Poder guardar un usuario en la base de datos
        await newUser.save()

        return res.send({
            success: true,
            message: "Usuario creado correctamente"
        })

    } catch (error) {
        console.log(error)

        // El email ya existe en la base (unique: true) -> clave 11000 de Mongo
        if (error.code === 11000) {
            return res.status(409).send({
                success: false,
                message: "El email ya esta registrado"
            })
        }

        return res.status(500).send("Error al crear el usuario")
    }
}


async function deleteUser(req, res) {
    // Si yo uso el id del usuario para eliminarlo
    // await User.findByIdAndDelete()  --> Borrado físico del usuario en la base de datos
    // Si quiero hacer un borrado lógico, podría actualizar un campo como "isDeleted" en lugar de eliminar el registro físicamente.
}


async function login(req, res) {

    try{
        const {email, password } = req.body

        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: "Email y contraseña son requeridos"
            })
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).send({
                success: false,
                message: "Credenciales incorrectas"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            return res.status(400).send({
                success: false,
                message: "Credenciales incorrectas"
            })
        }

        user.password = undefined

        const SECRET = process.env.JWT_SECRET 

        const token = jwt.sign(user.toObject(), SECRET, { expiresIn: "1d" })

        return res.send({
            success: true,
            message: "Login exitoso",
            user: user,
            token: token
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error al hacer login"
        })
    }
}


export {
    createUser,
    login,
    deleteUser
}
