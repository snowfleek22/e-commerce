function addToCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemName = document.querySelector('.item-name').textContent;
    const itemColor = document.querySelector('.shopping-info .colors .color');
    const colorSelected = itemColor.value;
    const priceText = document.querySelector('.shopping-info .price span.price').textContent.trim();
    const price = parseFloat(priceText.replace('$', ''));
    console.log('Fetched Price:', price);
    const quantity = parseInt(document.getElementById('quantity').value);
    const imageSrc = document.querySelector('.item_info img').src;
    

    let item = {

        name: itemName,
        price: price,
        quantity: quantity,
        image: imageSrc,
        color: colorSelected
    };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
}

function buyNow() {
    addToCart();
    window.location.href = 'cart.html';
}

function addToWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let item = {
        name: document.querySelector('.item-name').textContent,
        price: parseFloat(document.querySelector('.price').textContent.replace('$', '')),
        image: document.querySelector('.item_info img').src
    };
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('Item added to wishlist!');
}
