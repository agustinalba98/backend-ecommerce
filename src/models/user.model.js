import mongoose from "mongoose"
const { Schema, model } = mongoose

const userSchema = new Schema ({

        name: {
            type: String,
            required: true,
            trim: true,
            minlenght: 2,
            maxlenght: 100,

        },
        email: {
            type: String,
            unique: true,
            index: true,
            required: true,
            minlenght: 2,
            maxlenght: 150,
            trim: true,
            lowercase: true,
            match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, "Por favor ingresa un email válido"]
        },
        password: {
            type: String,
            required: true,
            minlenght: 4,
            maxlenght: 150,
            trim: true
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "client", "admin", "god"],
        },
        bornDate: {
            type: Date,

            validate: {
                validator: function (valor) {
                    if (!valor) return true;

                    const diezAñosAtras = new Date().getTime() - 10 * 365 * 24 * 60 * 60 * 1000

                    return valor < diezAñosAtras
                },
                message: "La fecha de nacimiento debe ser anterior a la fecha actual"
            }
        },
        image: {
            type: String,
        }
        
}, { timestamps: true})

const User = model ("User", userSchema); 

export default User;