document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.navbar');
    const searchBtn = document.querySelector('#search-btn');
    const searchForm = document.querySelector('.search-form');
    const loginBtn = document.querySelector('#login-btn');
    const loginForm = document.querySelector('.login-form');
    const cartIcon = document.querySelector('#cart-icon');
    const cartOverlay = document.querySelector('#cart-overlay');
    const closeCart = document.querySelector('#close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartTotal = document.querySelector('#cart-total');
    const cartCount = document.querySelector('#cart-count');
    const checkoutBtn = document.querySelector('#checkout-btn');

   
    
    // Clear cart on page load
    localStorage.removeItem('cartItems');
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <span>${item.name}</span>
                    <div class="quantity-controls">
                        <button class="decrement" data-name="${item.name}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increment" data-name="${item.name}">+</button>
                    </div>
                    <span>Rs. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button class="fa fa-trash" data-name="${item.name}"></button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        cartTotal.textContent = `Total: Rs. ${total.toFixed(2)}`;
        cartCount.textContent = cartItems.length;
        addQuantityEventListeners();
    }

    function addItemToCart(name, price, image) {
        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name, price, quantity: 1, image });
        }
        updateCart();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function addQuantityEventListeners() {
        const decrementButtons = document.querySelectorAll('.decrement');
        const incrementButtons = document.querySelectorAll('.increment');
        
        decrementButtons.forEach(button => {
            button.addEventListener('click', event => {
                const name = event.target.getAttribute('data-name');
                const item = cartItems.find(item => item.name === name);
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    removeFromCart(name);
                }
                updateCart();
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            });
        });

        incrementButtons.forEach(button => {
            button.addEventListener('click', event => {
                const name = event.target.getAttribute('data-name');
                const item = cartItems.find(item => item.name === name);
                item.quantity++;
                updateCart();
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            });
        });
    }

    function removeFromCart(name) {
        cartItems = cartItems.filter(item => item.name !== name);
        updateCart();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Event delegation for remove button
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('fa-trash')) {
            const name = event.target.getAttribute('data-name');
            removeFromCart(name);
        }
    });

    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
        cartOverlay.style.display = 'none';
    });

    searchBtn.addEventListener('click', () => {
        navbar.classList.remove('active');
        searchForm.classList.toggle('active');
        loginForm.classList.remove('active');
        cartOverlay.style.display = 'none';
    });

    cartIcon.addEventListener('click', () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
        cartOverlay.style.display = 'block';
    });

    loginBtn.addEventListener('click', () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        loginForm.classList.toggle('active');
        cartOverlay.style.display = 'none';
    });

    window.onscroll = () => {
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
        
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            button.style.display="none" ;
            
            const item = event.target.closest('.box');
            const itemName = item.querySelector('.product-name').textContent;
            const itemPrice = parseFloat(item.querySelector('.product-price').textContent.replace('Rs. ', ''));
            const itemImage = item.querySelector('img').src;
            addItemToCart(itemName, itemPrice, itemImage);
        });
    });

    cartIcon.addEventListener('click', () => {
        // if (cartOverlay.style.display === 'block') {
        //     cartOverlay.style.display = 'none';
        // } else {
        //     cartOverlay.style.display = 'block';
        // }


    });


    closeCart.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    

    checkoutBtn.addEventListener('click', () => {
        // Save cart data to local storage and redirect to checkout page
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        window.location.href = 'checkout.html'; // Change to your actual checkout page URL
    });

    // Initialize cart on page load
    updateCart();
});
