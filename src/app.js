import express from "express";
import productRoutes from "./routes/product.routes.js";
import userRoutes from"./routes/user.routes.js";


const app = express();

app.use(express.json());

app.use(productRoutes);

app.use(userRoutes);


export default app;