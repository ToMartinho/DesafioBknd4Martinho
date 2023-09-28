import  express  from 'express'
import { __dirname } from './utils.js'
import handlebars from "express-handlebars"
import productsRouter from './router/products.router.js'
import cartsRouter from './router/carts.router.js'
import viewsRouter from "./router/views.router.js"
import {Server} from "socket.io"
import { getAllProductsSocket } from './productSocket.js'

// ACTIVAMOS EL MODULO PARA LEVANTAR EL SV
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))


app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use("/",viewsRouter)

// handebars
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname +"/views")
app.set('view engine', 'handlebars')

// iniciamos en escucha el servidor
const httpServer = app.listen(PORT,()=>{
    console.log(`escuchando al puerto ${PORT}`);
})

const socketServer = new Server(httpServer)

const onConnection = async (socket)=>{
    await getAllProductsSocket(socketServer,socket)
}

socketServer.on("connection", onConnection)