import express from "express";
import productRoutes from "./routes/product.routes.js";
import userRoutes from"./routes/user.routes.js";
import cors form "cors";


const app = express();
app.use (cors());
app.use(express.json());

app.use(productRoutes);

app.use(userRoutes);


export default app;