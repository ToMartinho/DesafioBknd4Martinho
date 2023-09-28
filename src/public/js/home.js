let products = [];

const productsList = document.getElementById("productsList");

async function getAllProducts() {
  try {
    const productData = await fetch("http://localhost:8080/api/products");
    const info = await productData.json();
    products = [...info.products];
    verProductos();
  } catch (err) {
    error = err;
  }
}

function verProductos() {
  const ulProducts = products
    .map(
      (product) => `<li>
      <p>ID: ${product.id}</p> 
      <p>Title: ${product.name}</p> 
      <p>Description: ${product.description}</p> 
      <p>Price: ${product.price}</p> 
      <p>Stock: ${product.stock}</p>
    </li>`
    )
    .join(" ");
  productsList.innerHTML = ulProducts;
}

getAllProducts();