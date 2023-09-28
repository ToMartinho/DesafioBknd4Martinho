import  express  from 'express'
import { __dirname } from './utils.js'
import productsRouter from './router/products.router.js'
import cartsRouter from './router/carts.router.js'

// ACTIVAMOS EL MODULO PARA LEVANTAR EL SV
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)


// iniciamos en escucha el servidor
app.listen(8080,()=>{
    console.log("escuchando al puerto 8080");
})