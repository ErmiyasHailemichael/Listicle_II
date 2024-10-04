//app.js
// document.addEventListener('DOMContentLoaded', () => {
//     const itemsContainer = document.getElementById('items-container');
//     const searchInput = document.getElementById('search');

//     // Function to fetch items
//     const fetchItems = async (query = '') => {
//         const response = await fetch(`/items${query ? `/search?query=${query}` : ''}`);
//         const data = await response.json();
//         displayItems(data);
//     };

//     // Function to display items
//     const displayItems = (items) => {
//         itemsContainer.innerHTML = ''; // Clear previous items
//         items.forEach(item => {
//             const itemDiv = document.createElement('div');
//             itemDiv.classList.add('item');
//             itemDiv.innerHTML = `
//                 <h2>${item.name}</h2>
//                 <p>${item.description}</p>
//                 <img src="${item.image}" alt="${item.name}" />
//             `;
//             itemsContainer.appendChild(itemDiv);
//         });
//     };

//     // Search functionality
//     searchInput.addEventListener('input', () => {
//         fetchItems(searchInput.value);
//     });

//     // Fetch all items on page load
//     fetchItems();
// });

// Sample data array (replace this with a fetch call to your API)

const itemsContainer = document.getElementById('items-container');

// Function to fetch items from the server
async function fetchItems() {
    try {
        const response = await fetch('http://localhost:3000/items'); // Adjust if needed
        const items = await response.json(); // Assuming your server sends JSON data
        displayItems(items); // Display items after fetching
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Function to display items
function displayItems(itemsToDisplay) {
    itemsContainer.innerHTML = ''; // Clear previous items
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
    displayItems(filteredItems); // Display filtered items
}

// Initial fetch of items
fetchItems();
