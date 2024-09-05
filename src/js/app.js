let products = [];
let cart = [];

// Cargar productos y carrito desde localStorage al inicio
document.addEventListener('DOMContentLoaded', function() {
    products = JSON.parse(localStorage.getItem('products')) || [];
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayProducts();

    updateCartCount(); 
});

// Evento para manejar el envío del formulario
const form = document.getElementById('productForm');
const saveButton = document.getElementById('saveButton');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Previene la redirección

    const name = document.getElementById('productName').value; 
    const price = document.getElementById('productPrice').value;
    const stock = document.getElementById('productStock').value;
    const marca = document.getElementById('productMarca').value;
    const category = document.getElementById('productCategory').value;
    const desc = document.getElementById('productDesc').value;
    const foto = document.getElementById('productPhoto').files[0];
    
    let validationError = '';

    switch (true) {
        case (!price || isNaN(price) || parseFloat(price) <= 0):
            validationError = 'Formato de precio inválido.';
            break;
        case (!stock || isNaN(stock) || parseInt(stock) < 0):
            validationError = 'Formato de stock inválido.';
            break;
        case (!foto):
            validationError = 'Debes subir una imagen.';
            break;
    }

    if (validationError) {
        alert(validationError);
        saveButton.disabled = false; // Habilitar el botón en caso de error
    } else {
        const fotoName = foto.name;

        const newProduct = {
            id: products.length + 1,
            name: name,
            price: parseFloat(price).toFixed(2),
            stock: parseInt(stock),
            marca: marca,
            category: category,
            desc: desc,
            image: fotoName,
        };

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        form.reset();
        alert('Producto agregado con éxito');
        displayProducts();
    }
});


// Función para eliminar un producto de la galería
function deleteProduct(id) {
    // Filtrar el array de productos para eliminar el producto con el ID dado
    products = products.filter(product => product.id !== id);

    // Actualizar el localStorage con los productos filtrados
    localStorage.setItem('products', JSON.stringify(products));

    // Actualizar la galería después de eliminar el producto
    displayProducts();

    alert('Producto eliminado de la galería correctamente.');
}


function displayProducts() {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    products.forEach(function(product) {
        const productElement = document.createElement('div');
        productElement.className = 'w-[300px] bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg flex flex-col relative group';

        const imageURL = `../public/assets/img/products/${product.image}`;

        productElement.innerHTML = `
            <div class="relative">
                <!-- Imagen del producto -->
                <img src="${imageURL}" alt="${product.name}" class="w-full h-48 object-cover">
                
                <!-- Botón para eliminar producto de la galeria -->

            
                <button class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" onclick="deleteProduct(${product.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

            </div>
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-xl font-semibold">${product.name}</h3>
                <p class="text-gray-600 mt-2">$${product.price}</p>
                <p class="text-gray-500 mt-2 flex-grow">${product.desc}</p>
                <div class="flex justify-between mt-4">

                    <!-- Botón para agregar al carrito -->
                    <button class="add-to-cart bg-blue-500 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-600" data-id="${product.id}" onclick="addToCart(${product.id})">
                        Agregar al carrito
                    </button>

                    <!-- Botón para eliminar producto del carrito -->

                    <button class="bg-red-500 text-white py-2 px-3 rounded-md text-sm hover:bg-red-600" onclick="removeFromCart(${product.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash" viewBox="0 0 24 24">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6L5 6 6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2L19 6z"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                            <path d="M9 6v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        productContainer.appendChild(productElement);
    });
}




function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product); // Agrega el producto al carrito
        localStorage.setItem('cart', JSON.stringify(cart)); // Guarda el carrito en localStorage
        updateCartCount(); // Actualiza el número de productos en el carrito
        alert('Producto agregado al carrito.');
    }
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    
    if (productIndex !== -1) {
        cart.splice(productIndex, 1); // Elimina el producto del carrito
        localStorage.setItem('cart', JSON.stringify(cart)); // Actualiza el localStorage
        updateCartCount(); // Actualiza el número de productos en el carrito
        alert('Producto eliminado del carrito.');
    } else {
        alert('Este producto no está en el carrito.');
    }
}

function updateCartCount() {
    const cartCount = cart.length; // 
    const cartCountElement = document.getElementById('cartItemCount');
    cartCountElement.textContent = `(${cartCount})`; 
}


