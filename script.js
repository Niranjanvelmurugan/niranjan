// Conversion rate from USD to INR (adjust as necessary)
const conversionRate = 83; // Example: 1 USD = 83 INR

// Sample food items with dollar prices
const foodItems = [
    { id: 1, name: 'chicken briyani', description: 'Delicious indian spicy briyani', price: ' 2.88' },
    { id: 2, name: 'dragon chicken', description: 'Juicy chicken', price: '4.35' },
    { id: 3, name: 'Pasta', description: 'Creamy pasta with sauce', price: '2.60' },
    { id: 4, name: 'meals', description: 'healthy delicious food', price: '1.80' },
    { id: 5, name: 'dessert combo', description: 'fresh mixed greens with dressing Refreshing carbonated drink', price: '5.2' }
];

// Function to render the food menu with INR conversion
function loadMenu() {
    const menuDiv = document.getElementById('menu');
    foodItems.forEach(item => {
        // Convert price to INR
        const priceInINR = (parseFloat(item.price) * conversionRate).toFixed(2);
        
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('menu-item');
        foodDiv.innerHTML = `
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p><strong>₹${priceInINR}</strong></p> <!-- Display price in INR -->
            <button onclick="addToOrder(${item.id})">Add to Order</button>
        `;
        menuDiv.appendChild(foodDiv);
    });
}

// Order handling
let order = [];

// Add food to the order
function addToOrder(foodId) {
    const food = foodItems.find(item => item.id === foodId);
    order.push(food);
    updateOrderDisplay();
}

// Update the order display with INR prices
function updateOrderDisplay() {
    const orderDiv = document.getElementById('order');
    orderDiv.innerHTML = '';

    if (order.length === 0) {
        orderDiv.innerHTML = '<p>No items selected.</p>';
        document.getElementById('submitOrder').disabled = true;
    } else {
        order.forEach(item => {
            // Convert price to INR
            const priceInINR = (parseFloat(item.price) * conversionRate).toFixed(2);
            
            const orderItemDiv = document.createElement('div');
            orderItemDiv.textContent = `${item.name} - ₹${priceInINR}`; // Display price in INR
            orderDiv.appendChild(orderItemDiv);
        });

        // Display the total price in INR
        const totalPrice = order.reduce((acc, item) => acc + (parseFloat(item.price) * conversionRate), 0).toFixed(2);
        const totalPriceDiv = document.createElement('div');
        totalPriceDiv.innerHTML = `<strong>Total: ₹${totalPrice}</strong>`; // Display total in INR
        orderDiv.appendChild(totalPriceDiv);

        // Enable the submit button
        document.getElementById('submitOrder').disabled = false;
    }
}

// Simulate the order submission
document.getElementById('submitOrder').addEventListener('click', () => {
    alert('Your order has been submitted!');
    order = [];
    updateOrderDisplay();
});

// Load the menu when the page loads
window.onload = loadMenu;
