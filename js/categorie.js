function addToCart(event) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Identify the specific item using the clicked button
    const itemElement = event.target.closest('.item-info');
    
    const itemName = itemElement.querySelector('.item-name').textContent;
    const priceText = itemElement.querySelector('.price').textContent.trim();
    const price = parseFloat(priceText.replace('$', ''));
    const imageSrc = itemElement.querySelector('.img img').src;
    
    let item = {
        name: itemName,
        price: price,
        quantity: 1,
        image: imageSrc,
        color: "any"
    };
    
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
}

// Attach the event listener to all "Add to Cart" buttons
document.querySelectorAll('#add').forEach(button => {
    button.addEventListener('click', addToCart);
});



////filtering js
document.querySelectorAll('.filter-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.querySelector('h5').textContent.toLowerCase();
        filterItems(category);
    });
});

function filterItems(category) {
    let items = document.querySelectorAll('.item-info');

    items.forEach(item => {
        const itemCategory = item.querySelector('p').textContent.toLowerCase();

        if (itemCategory.includes(category)) {
            item.parentElement.style.display = 'block';
        } else {
            item.parentElement.style.display = 'none';
        }
    });
}

