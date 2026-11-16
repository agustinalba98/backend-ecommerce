import Product from "../models/product.model.js"

export async function getProducts(req, res) {
    try{
        const productos = await Product.find();

        return res.status(200).send({
            success: true,
            message: "Productos obtenidos correctamente",
            products: productos
        })

    } catch(error) {

        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error al obtener los productos",

        })
    }
}

export async function getProductById(req, res) {

    try {
        const producto = await Product.findById(req.params.id)

        if (!producto) {
            return res.status(404).send({
                success: false,
                message: "Producto no encontrado"
            })
        }

        return res.status(200).send({
            success: true,
            product: producto
        })

    } catch (error) {
        console.log(error)

        // El id no tiene formato de ObjectId de Mongo
        if (error.name === "CastError") {
            return res.status(400).send({
                success: false,
                message: "Id de producto invalido"
            })
        }

        return res.status(500).send({
            success: false,
            message: "Error al obtener el producto",
        })
    }
}

export async function createProduct(req, res) {

    try {
        req.body.createdAt = undefined

        console.log(req.body);

        const producto = req.body;

        const nuevoProducto = new Product(producto);

        console.log(nuevoProducto);

        await nuevoProducto.save()

        return res.send("Nuevo producto creado!");

    } catch (error) {
        console.log(error);

        if(error.name === "ValidationError") {
            return res.status(400).send({
                success: false,
                message: "Error de validacion",
            })
        }

        return res.status(500).send({
            success: false,
            message: "Error al crear el producto",
        })
    }
}

export function updateProduct(req, res) {
    res.send(`Actualiza un producto especifico por su ID`);
}

export function deleteProduct(req, res) {
    res.send(`Elimina un producto especifico por su ID`);
}