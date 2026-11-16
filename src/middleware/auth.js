import jwt from "jsonwebtoken";


function authenticate(req, res, next) {

    const SECRET = process.env.JWT_SECRET;

    console.log(req.headers.authorization)

    // const token = req.headers?.authorization?.split(" ")[1]

    const token = req.headers?.authorization

    if (!token) {
        return res.status(401).send({

            message: "Token no proporcionado"
        })
    }

    try {

        const payload = jwt.verify(token, SECRET);

        req.user = payload;

        next();

    } catch (error) {

        console.log(error)
        return res.status(401).send ({
            message: "token invalido"
        })

    }


}

function isAdmin(req, res, next) {

    const role = req.user?.role;

    if(role !== "admin" && role !== "god") {
        return res.status(403).send({
            message: "Acceso denegado: se requieren privilegios de administrador"
        });
    }

    next();
}

export {authenticate, isAdmin}
