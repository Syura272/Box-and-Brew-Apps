document.addEventListener("DOMContentLoaded", function() {
    const coffeeList = [
        { name: "Espresso", image: "C:\Users\ACER\Downloads\resource folder\espresso.jpg" },
        { name: "Cappuccino", image: "C:\Users\ACER\Downloads\resource folder\capucinno.jpg"},
        { name: "Mocha", image: "C:\Users\ACER\Downloads\resource folder\mocha.jpg" },
        { name: "Americano", image: "C:\Users\ACER\Downloads\resource folder\americano.jpg" },
        { name: "Caramel Latte", image: "C:\Users\ACER\Downloads\resource folder\caramel latte.jpg" },
        { name: "Caramel Macchiato", image: "C:\Users\ACER\Downloads\resource folder\caramel macchiato.jpg" },
        { name: "Spanish Latte", image: "C:\Users\ACER\Downloads\resource folder\sp.latte.jpg" },
        { name: "Iced Chocolate", image: "C:\Users\ACER\Downloads\resource folder\Iced Chocolate.jpg" },
        { name: "Matcha Latte", image: "C:\Users\ACER\Downloads\resource folder\matcha latte.jpg"},
        { name: "Matcha Strawberry", image: "C:\Users\ACER\Downloads\resource folder\matcha strawberry.jpg" },
        { name: "Barbie Mocktails", image: "C:\Users\ACER\Downloads\resource folder\barbie mocktail.jpg"},
        { name: "Passionade", image: "C:\Users\ACER\Downloads\resource folder\passionade.jpg" },
        { name: "Kiwious", image: "C:\Users\ACER\Downloads\resource folder\kiwious.jpg" }
//		{ name: "Latte", image: "C:\Users\ACER\Downloads\resource folder\latte.jpg"},
    ];

    const coffeeContainer = document.getElementById("coffee-list");
    const cartItemsList = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-btn");
    const modal = document.getElementById("payment-modal");
    const closeModal = document.getElementById("close-payment");

    let cart = [];
    let isLoggedIn = false; // Assume user is not logged in initially

    // Populate coffee list
    coffeeList.forEach(coffee => {
        const coffeeCard = document.createElement("div");
        coffeeCard.classList.add("coffee-card");

        coffeeCard.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.name}">
            <h3>${coffee.name}</h3>
            <button class="order-btn">Add to Cart</button>
        `;

        coffeeCard.querySelector(".order-btn").addEventListener("click", () => {
            handleOrder(coffee);
        });

        coffeeContainer.appendChild(coffeeCard);
    });

    function addToCart(coffee) {
        cart.push(coffee);
        updateCartDisplay();
        alert(`${coffee.name} added to cart!`);
    }

    function updateCartDisplay() {
        cartItemsList.innerHTML = ""; // Clear the cart display
        cart.forEach(coffee => {
            const item = document.createElement("li");
            item.textContent = coffee.name;
            cartItemsList.appendChild(item);
        });
    }

    checkoutButton.onclick = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items to the cart.");
        } else if (!isLoggedIn) {
            document.getElementById('signInModal').style.display = 'flex'; // Show sign-in modal
        } else {
            modal.style.display = "block"; // Show payment modal
        }
    };

    closeModal.onclick = () => {
        modal.style.display = "none"; // Close confirmation modal
        cart = []; // Clear the cart after payment
        updateCartDisplay(); // Update the cart display
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Close modal when clicking outside
        }
    };

    // Modal handling
    const loginModal = document.getElementById("login-modal");
    const signupModal = document.getElementById("signup-modal");
    const paymentModal = document.getElementById("payment-modal");

    document.getElementById("close-login").onclick = () => {
        loginModal.style.display = "none";
    };

    document.getElementById("close-signup").onclick = () => {
        signupModal.style.display = "none";
    };

    document.getElementById("close-payment").onclick = () => {
        paymentModal.style.display = "none";
    };

    document.getElementById("login-form").onsubmit = (e) => {
        e.preventDefault();
        alert("Login successful!");
        loginModal.style.display = "none";
        isLoggedIn = true;
    };

    document.getElementById("signup-form").onsubmit = (e) => {
        e.preventDefault();
        alert("Sign up successful!");
        signupModal.style.display = "none";
    };

    document.getElementById("payment-form").onsubmit = (e) => {
        e.preventDefault();
        alert("Order confirmed!");
        paymentModal.style.display = "none";
        cart = []; // Clear the cart after payment
        updateCartDisplay(); // Update the cart display
    };

    document.getElementById('open-signup').addEventListener('click', () => {
        document.getElementById('signup-modal').style.display = 'block';
    });

    document.getElementById('close-signup').addEventListener('click', () => {
        document.getElementById('signup-modal').style.display = 'none';
    });

    // Sign-in handling
    function handleOrder(item) {
        if (!isLoggedIn) {
            document.getElementById('signInModal').style.display = 'flex'; // Show sign-in modal
        } else {
            addToCart(item); // Proceed with adding to cart if logged in
        }
    }

    function closeSignInModal() {
        document.getElementById('signInModal').style.display = 'none';
    }

    function signIn() {
        isLoggedIn = true; // Change this based on actual sign-in logic
        document.getElementById('signInModal').style.display = 'none';
        alert('You are now signed in. You can proceed to order.');
    }
});
document.getElementById('open-login').addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'block';
});

document.getElementById('close-login').addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'none';
});

document.getElementById('open-signup').addEventListener('click', () => {
    document.getElementById('signup-modal').style.display = 'block';
});

document.getElementById('close-signup').addEventListener('click', () => {
    document.getElementById('signup-modal').style.display = 'none';
});

document.getElementById('close-payment').addEventListener('click', () => {
    document.getElementById('payment-modal').style.display = 'none';
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    if (users.find(user => user.username === username)) {
        document.getElementById('signup-error').textContent = 'Username already exists!';
    } else {
        users.push({ username, password });
        document.getElementById('signup-error').textContent = 'Account created! You can now log in.';
    }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = user;
        document.getElementById('login-modal').style.display = 'none';
        alert('Logged in successfully!');
    } else {
        document.getElementById('login-error').textContent = 'Invalid credentials!';
    }
});

function addToCart(item, price) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.item === item);

    if (existingItem) {
        // If it exists, increase the quantity or update price as needed
        existingItem.price += price; // Update the price if necessary
    } else {
        // If it does not exist, add it to the cart
        cart.push({ item, price });
    }

    // Update the total price
    totalPrice += price;

    // Update the cart display
    document.getElementById('cart-items').innerHTML += `<li>${item} - $${price.toFixed(2)}</li>`;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    document.getElementById('checkout-btn').disabled = false;
}

}

document.getElementById('checkout-btn').addEventListener('click', function() {
    if (!currentUser) {
        alert('Please log in to proceed with payment.');
        return;
    }
    document.getElementById('payment-modal').style.display = 'block';
});

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Payment successful! Thank you for your purchase.');
    cart = [];
    totalPrice = 0;
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('total-price').textContent = '0.00';
    document.getElementById('checkout-btn').disabled = true;
    document.getElementById('payment-modal').style.display = 'none';
});
