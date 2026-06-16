const products = [
    {"id": 1, "name": "Product A", "price": 29.99},
    {"id": 2, "name": "Product B", "price": 19.99},
    {"id": 3, "name": "Product C", "price": 39.99},
    {"id": 4, "name": "Product D", "price": 49.99},
];

// function to get all products using window. load event and local storage
function loadAllProducts() {
    const storedProducts = localStorage.getItem('products') || JSON.stringify(products);
    const productData = JSON.parse(storedProducts);
    const productList = document.getElementById('productList');

    productList.innerHTML = '';
    productData.forEach(product => {
        const productContainer = document.createElement('div');
        productContainer.dataset.id = product.id;
        const productHeading = document.createElement('h3');
        productHeading.textContent = product.name;

        const productSpan = document.createElement('span');
        const italic = document.createElement('i');
        italic.textContent = product.price;
        productSpan.textContent = ` Rs. `;
        productSpan.appendChild(italic);

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.dataset.id = product.id;
        addToCartButton.addEventListener('click', () => {
            addToCart(product.id);
        });
        productContainer.appendChild(productHeading);
        productContainer.appendChild(productSpan);
        productContainer.appendChild(addToCartButton);
        productList.appendChild(productContainer);
    });
}

function totalCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = totalItems;
}

function totalProducts() {
    const storedProducts = localStorage.getItem('products') || JSON.stringify(products);
    const productData = JSON.parse(storedProducts);
    const totalProductsElement = document.getElementById('totalProducts');
    totalProductsElement.textContent = productData.length;
}

function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    totalCartItems();
}

window.addEventListener('load', loadAllProducts);
window.addEventListener('load', totalCartItems);
window.addEventListener('load', totalProducts);