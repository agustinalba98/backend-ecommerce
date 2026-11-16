# Backend E-commerce

API REST para un e-commerce, construida con **Express**, **Mongoose (MongoDB)**, **JWT** y **bcrypt**.

> Proyecto en desarrollo, siguiendo el paso a paso de la clase. Algunos endpoints todavía son *stubs* (están marcados abajo).

---

## Stack

| Tecnología | Uso |
|---|---|
| Node.js (ES Modules) | Runtime |
| Express 5 | Framework HTTP |
| MongoDB + Mongoose 9 | Base de datos y modelos |
| bcrypt | Hash de contraseñas |
| jsonwebtoken | Firma y verificación de tokens |
| ESLint | Linting |
| Nodemon | Reinicio automático en desarrollo |

---

## Requisitos

- Node.js 18 o superior
- Una base de MongoDB (local o un cluster de Atlas)

---

## Instalación

```bash
git clone https://github.com/agustinalba98/backend-ecommerce.git
cd backend-ecommerce
npm install
```

---

## Variables de entorno

Creá un archivo `.env` en la raíz del proyecto:

```env
MONGODB_URI="mongodb+srv://usuario:contraseña@cluster/ecommerce"
PORT=3000
JWT_SECRET="tu-secreto-para-firmar-los-tokens"
```

> ⚠️ **`.env` está en `.gitignore`: nunca se sube al repositorio.**
> Si lo necesitás de cero, pedímelo o generá tu propio `JWT_SECRET`.

---

## Uso

```bash
npm run dev    # desarrollo con nodemon (reinicia ante cambios)
npm start      # producción, node puro
```

El servidor queda en `http://localhost:3000`.

---

## Estructura

```
src/
├── index.js                 # arranca DB + servidor
├── app.js                   # express, middlewares y rutas
├── controllers/
│   ├── product.controller.js
│   └── user.controller.js
├── models/
│   ├── product.model.js
│   └── user.model.js
├── routes/
│   ├── product.routes.js
│   └── user.routes.js
└── middleware/
    └── auth.js              # authenticate + isAdmin
```

---

## Endpoints

### Usuarios

| Método | Ruta | Auth | Descripción | Estado |
|---|---|---|---|---|
| `POST` | `/users` | — | Crea un usuario (hashea el password) | ✅ |
| `POST` | `/users/login` | — | Valida credenciales y devuelve un token JWT | ✅ |

**`POST /users`** — body:

```json
{ "name": "Agustin", "password": "1234", "email": "ejemplo@mail.com", "image": "" }
```

Respuesta `200`:

```json
{ "success": true, "message": "Usuario creado correctamente" }
```

Errores:

| Status | Cuándo |
|---|---|
| `409` | El email ya está registrado (clave duplicada de Mongo) |
| `500` | Error interno al guardar |

**`POST /users/login`** — body:

```json
{ "email": "ejemplo@mail.com", "password": "1234" }
```

Respuesta `200`:

```json
{ "success": true, "message": "Login exitoso", "user": { ... }, "token": "eyJhbGciOi..." }
```

Errores:

| Status | Cuándo |
|---|---|
| `400` | Faltan `email` o `password` |
| `400` | Credenciales incorrectas (email inexistente o password inválido) |

---

### Productos

| Método | Ruta | Auth | Descripción | Estado |
|---|---|---|---|---|
| `GET` | `/products` | — | Lista todos los productos | ✅ |
| `GET` | `/products/:id` | — | Trae un producto por ID | 🚧 pendiente |
| `POST` | `/products` | admin | Crea un producto | ✅ |
| `PUT` | `/products/:id` | admin | Modifica un producto | 🚧 stub |
| `DELETE` | `/products/:id` | admin | Elimina un producto | 🚧 stub |

Campos del producto: `name`, `description`, `price`, `stock`, `category`, `image`.

---

## Autenticación

Las rutas marcadas con **auth** validan un JWT en el header:

```
Authorization: <token>
```

> **Importante:** el middleware lee el header **tal cual, sin el prefijo `Bearer `**.
> Pegá solo el token que devuelve el login.

Flujo:

1. `POST /users/login` → copiás el `token`
2. Enviás ese token en `Authorization` a las rutas protegidas

Respuestas del middleware:

| Status | Significado |
|---|---|
| `401` | No llegó token, o el token es inválido / expirado / firmado con otro secreto |
| `403` | El token es válido pero el rol no alcanza (`isAdmin` pide `admin` o `god`) |

Roles disponibles en el modelo de usuario: `user`, `client`, `admin`, `god`.

---

## Seguridad

- Las contraseñas se guardan con **bcrypt** (`SALT_ROUNDS = 10`), nunca en claro.
- El token se firma con `JWT_SECRET` del `.env`.
- `createUser` solo toma del body los campos `name`, `password`, `email` e `image`.

---

## Ejemplo rápido con cURL

```bash
# 1. Registrar
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Agustin","password":"1234","email":"ejemplo@mail.com","image":""}'

# 2. Loguearse y obtener el token
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ejemplo@mail.com","password":"1234"}'

# 3. Usar el token en una ruta protegida
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: PEGA_ACA_EL_TOKEN" \
  -d '{"name":"Notebook","description":"16GB RAM","price":500000,"stock":10,"category":"computacion","image":"img.png"}'
```
