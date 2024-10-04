// //app.js
const itemsContainer = document.getElementById('items-container');
let items = []; // Declare a global variable to store fetched items

// Function to fetch and display items
async function fetchItems() {
    try {
        const response = await fetch('http://localhost:3000/items'); 
        items = await response.json(); // Store fetched items in the global variable
        displayItems(items);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Function to display items in cards
function displayItems(itemsToDisplay) {
    itemsContainer.innerHTML = ''; // Clear existing items
    itemsToDisplay.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.image}" alt="Article Image">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Category: ${item.category}</p>
            <a href="detail.html?id=${item.id}" class="view-detail-button">View Detail</a>
        `;
        itemsContainer.appendChild(card);
    });
}

// Function to filter items based on search input
function filterItems() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchInput) ||
        item.description.toLowerCase().includes(searchInput) ||
        item.category.toLowerCase().includes(searchInput)
    );
    displayItems(filteredItems); // Display the filtered items
}

// Event listener for search input
document.getElementById('search-input').addEventListener('input', filterItems);

// Fetch all items on page load
fetchItems();
