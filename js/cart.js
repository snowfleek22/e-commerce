window.onload = function() {
    loadCart();
    updateCartTotals();
};

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    cart.forEach((item, index) => {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        //let itemPrice = item.price * item.quantity;
        itemDiv.innerHTML = `
            <a href=""><img src="${item.image}" alt="Item Image"></a>
            <div class="item-details">
                <h2>${item.name}</h2>
                <h5>color: <p>${item.color}</p><h5>
                <div class="quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <h5>Price: <p class="price">$${( item.price * item.quantity).toFixed(2)}</p></h5>
                <button class="button remove-item" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    updateCartTotals();  // Ensure the totals are updated when the cart is loaded
}

function updateCartTotals() {
    let subtotal = 0;

    document.querySelectorAll('.cart-item').forEach(item => {
        const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
        subtotal += price; // Price already includes quantity * item.price
    });

    const shipping = subtotal > 0 ? 4.99 : 0; // Set shipping to $4.99 if there's a subtotal
    const taxes = subtotal * 0.075; // 7.5% tax
    const total = subtotal + shipping + taxes;

    document.querySelector('.subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.querySelector('.shipping').textContent = `Estimated Shipping: $${shipping.toFixed(2)}`;
    document.querySelector('.taxes').textContent = `Taxes: $${taxes.toFixed(2)}`;
    document.querySelector('.total').textContent = `Total: $${total.toFixed(2)}`;
}


function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function checkout() {
    localStorage.removeItem('cart');
    alert('Thank you for your purchase!');
    loadCart();
    updateCartTotals();
}
