const products = [
    {"id": 1, "name": "Product A", "price": 29.99},
    {"id": 2, "name": "Product B", "price": 19.99},
    {"id": 3, "name": "Product C", "price": 39.99},
    {"id": 4, "name": "Product D", "price": 49.99},
];

function viewCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedProducts = localStorage.getItem('products') || JSON.stringify(products);
    const productData = JSON.parse(storedProducts);
    const productInCart = productData.filter(product => cartItems.some(item => item.id === product.id));

    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';
    productInCart.forEach(product => {
        const cartItem = document.createElement('div');
        const itemName = document.createElement('h4');
        const quantity = document.createElement('p');
        const itemPrice = document.createElement('p');
        const itemTotal = document.createElement('p');

        const totalQuantity = cartItems.find(item => item.id === product.id)?.quantity || 0;
        itemName.textContent = product.name;
        quantity.textContent = `Quantity: ${totalQuantity}`;
        itemPrice.textContent = `Price: Rs. ${product.price}`;
        itemTotal.textContent = `Total: Rs. ${ (product.price * totalQuantity).toFixed(2) }`;
        
        cartItem.appendChild(itemName);
        cartItem.appendChild(quantity);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(itemTotal);
        cartContainer.appendChild(cartItem);
    });
}

window.addEventListener('load', viewCartItems);