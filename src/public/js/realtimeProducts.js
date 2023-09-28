const socketClient = io();
let products = [];
// TRAEMOS EL FORMULARIO COMPLETO CON LOS PRODUCTOS QUE SE VAN A IR ACTUALIZANDO
const productsList = document.getElementById("productsList");
socketClient.emit("getAllProducts");
// AGARRAMOS LOS FORMULARIOS
const addProductForm = document.getElementById("addProductForm");
const updateProductForm = document.getElementById("updateProductForm");
const deleteForm = document.getElementById("deleteForm");
let updateProductId = document.getElementById("updateProductId");
let deleteProductId = document.getElementById("deleteProductId");

// VALIDACION PREVIA DE QUE SE ENVIE TODO LO NECESARIO
function validNewProduct(product) {
  return (
    product.name &&
    product.description &&
    product.price >= 0 &&
    product.stock >= 0
  );
}

// CAPTAMOS LOS VALORES DESDE LOS FORMULARIOS VALIDAMOS Y AGREGAMOS
addProductForm.onsubmit = async (e) => {
  e.preventDefault();
  let newProduct = {
    name: document.getElementById("newProductName").value,
    description: document.getElementById("newProductDescription").value,
    price: document.getElementById("newProductPrice").value,
    stock: document.getElementById("newProductStock").value,
  };

  if (validNewProduct(newProduct)) {
    await addNewProduct(newProduct);
  }
};

// AGARRAMOS EL VALOR A UPDATEAR Y LO ENVIAMOS
updateProductForm.onsubmit = async (e) => {
  e.preventDefault();
  let updateProductPrice = {
    price: document.getElementById("updateProductPrice").value,
  };
  if (updateProductPrice.price !== 0 && updateProductId.value !== 0) {
    await updateProduct(updateProductId.value, updateProductPrice);
  }
};

deleteForm.onsubmit = async (e) => {
  e.preventDefault();
  if (deleteProductId.value !== 0) {
    await deleteProduct(deleteProductId.value);
  }
};

async function addNewProduct(product) {
  try {
    const result = await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    console.log(await result.json())

    if(result){
      socketClient.emit("getAllProducts");
    }
  } catch (err) {
    console.log(err)
    error = err;
  }
}

async function updateProduct(idProduct, product) {
  try {
    const result = await fetch(`http://localhost:8080/api/products/${idProduct}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if(result){
      socketClient.emit("getAllProducts");
    }
  } catch (err) {
    error = err;
  }
}

async function deleteProduct(idProduct) {
  try {
    const result = await fetch(`http://localhost:8080/api/products/${idProduct}`, {
      method: "DELETE",
    });

    if(result){
      socketClient.emit("getAllProducts");
    }
  } catch (err) {
    error = err;
  }
}

function mostrarProductos() {
  const productsTemplate = products
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
  productsList.innerHTML = productsTemplate;
}

socketClient.on("updatedProducts", (productsU) => {
  products = [...productsU];
  mostrarProductos()
});