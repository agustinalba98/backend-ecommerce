// importamos express framework
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import dns from "dns";
import app from "./app.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGODB_URI = process.env.MONGODB_URI;

const PORT = process.env.PORT || 3000; //http://localhost:3000



mongoose.connect(MONGODB_URI).then(() => {
    console.log("Conectado a MongoDB correctamente!");

    //Iniciar el servidor y ponerlo a escuchar en el puerto escpecificado
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

}).catch((error) => {
    console.log(error)
})



