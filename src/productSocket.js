import { productsManager } from "./ProductManager.js";

async function getAllProductsSocket(io, socket) {
  
  socket.on("getAllProducts", async () => {
    const products = await productsManager.getProducts();
    io.sockets.emit("updatedProducts", products);
  });
}

export { getAllProductsSocket };