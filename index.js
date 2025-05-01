// Cart functionality
let cart = [];
let cartCount = 0;

// Function to add item to cart
function addToCart(productName, price, image) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartModal();
    showSuccessMessage(`${productName} added to cart!`);
}

// Function to update cart count
function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
}

// Function to update cart modal
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    // Add each item to the cart modal
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>INR.${item.price}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.name}')">×</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `INR.${total}`;
}

// Function to update item quantity
function updateQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCartCount();
            updateCartModal();
        }
    }
}

// Function to remove item from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartCount();
    updateCartModal();
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function switchModal(fromModalId, toModalId) {
    closeModal(fromModalId);
    openModal(toModalId);
}

// Form validation functions
function validateLoginForm(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Basic validation
    if (!email.includes('@')) {
        document.getElementById('loginEmailError').style.display = 'block';
        return false;
    }
    
    if (password.length < 6) {
        document.getElementById('loginPasswordError').style.display = 'block';
        return false;
    }
    
    // If validation passes
    showSuccessMessage('Login successful!');
    closeModal('loginModal');
    return false;
}

function validateSignupForm(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Basic validation
    if (name.length < 2) {
        document.getElementById('signupNameError').style.display = 'block';
        return false;
    }
    
    if (!email.includes('@')) {
        document.getElementById('signupEmailError').style.display = 'block';
        return false;
    }
    
    if (password.length < 6) {
        document.getElementById('signupPasswordError').style.display = 'block';
        return false;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('signupConfirmPasswordError').style.display = 'block';
        return false;
    }
    
    // If validation passes
    showSuccessMessage('Signup successful!');
    closeModal('signupModal');
    return false;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSuccessMessage(message) {
    const popup = document.getElementById('successPopup');
    const messageElement = document.getElementById('successMessage');
    messageElement.textContent = message;
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
