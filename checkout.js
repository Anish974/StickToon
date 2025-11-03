document.addEventListener('DOMContentLoaded', () => {
    const orderItemsContainer = document.querySelector('#order-items');
    const orderTotal = document.querySelector('#order-total');
    const discountedTotal = document.querySelector('#discounted-total');
    const finalOrderTotal = document.querySelector('#final-order-total');
    const shippingMethod = document.querySelector('#shipping-method');
    const tipInput = document.querySelector('#tip');
    const applyDiscountBtn = document.querySelector('#apply-discount');
    const discountCodeInput = document.querySelector('#discount-code');
    const orderSummaryContent = document.querySelector('#order-summary-content');

    // Retrieve cartItems from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to update the order summary
    function updateOrderSummary() {
        orderItemsContainer.innerHTML = '';
        let total = 0;

        // Create order item elements for each item in the cart
        cartItems.forEach(item => {
            total += item.price * item.quantity;
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="order-item-details">
                    <span>${item.name}</span>
                    <span>Quantity: ${item.quantity}</span>
                    <span>Price: Rs. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
            orderItemsContainer.appendChild(orderItem);
        });

        orderTotal.textContent = `Total: Rs. ${total.toFixed(2)}`;
        updateFinalOrderTotal(total);
    }

    // Function to update the final order total based on base total, shipping cost, and tip
    function updateFinalOrderTotal(baseTotal) {
        let shippingCost = parseFloat(shippingMethod.value === 'standard' ? 50 : 150);
        let tip = parseFloat(tipInput.value) || 0;
        let finalTotal = baseTotal + shippingCost + tip;
        finalOrderTotal.textContent = `Final Total: Rs. ${finalTotal.toFixed(2)}`;
    }

    // Function to apply discount
    function applyDiscount() {
        const discountCode = discountCodeInput.value.trim();
        const baseTotal = parseFloat(orderTotal.textContent.replace('Total: Rs. ', ''));
        let discountAmount = 0;

        if (discountCode === 'ST20') {
            discountAmount = baseTotal * 0.20; // 20% discount
        } else if (discountCode === 'SAVE10') {
            discountAmount = baseTotal * 0.10; // 10% discount
        } else {
            alert('Invalid discount code');
            return;
        }

        const discountedTotalAmount = baseTotal - discountAmount;
        discountedTotal.textContent = `Discounted Total: Rs. ${discountedTotalAmount.toFixed(2)}`;
        updateFinalOrderTotal(discountedTotalAmount);
    }

    // Event listener for changes in the shipping method
    shippingMethod.addEventListener('change', () => {
        const baseTotal = parseFloat(orderTotal.textContent.replace('Total: Rs. ', ''));
        updateFinalOrderTotal(baseTotal);
    });

    // Event listener for input changes in the tip amount
    tipInput.addEventListener('input', () => {
        const baseTotal = parseFloat(orderTotal.textContent.replace('Total: Rs. ', ''));
        updateFinalOrderTotal(baseTotal);
    });

    // Event listener for the apply discount button
    applyDiscountBtn.addEventListener('click', applyDiscount);

    // Show order summary section initially
    orderSummaryContent.style.display = 'block';

    // Call the function to update the order summary
    updateOrderSummary();

    // Event listener for the checkout form submission
    document.querySelector('#checkout-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Order completed successfully!');
        localStorage.removeItem('cartItems'); // Clear cart items from local storage
        window.location.href = 'index.html'; // Redirect to the homepage or your desired page
    });

    // Clear cartItems from local storage when the user leaves the checkout page
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('cartItems');
    });
});
