// //app.js
// const itemsContainer = document.getElementById('items-container');
// // Function to fetch items from the server
// async function fetchItems() {
//     try {
//         const response = await fetch('http://localhost:3000/items'); // Adjust if needed
//         const items = await response.json(); // Assuming your server sends JSON data
//         displayItems(items); // Display items after fetching
//     } catch (error) {
//         console.error('Error fetching items:', error);
//     }
// }

// // Function to display items
// function displayItems(itemsToDisplay) {
//     itemsContainer.innerHTML = ''; // Clear previous items
//     itemsToDisplay.forEach(item => {
//         const card = document.createElement('div');
//         card.className = 'card';
//         card.innerHTML = `
//             <img src="${item.image}" alt="Article Image">
//             <h3>${item.name}</h3>
//             <p>${item.description}</p>
//             <p>Category: ${item.category}</p>
//             <a href="detail.html?id=${item.id}" class="view-detail-button">View Detail</a>
//         `;
//         itemsContainer.appendChild(card);
//     });
// }

// // Function to filter items based on search input
// function filterItems() {
//     const searchInput = document.getElementById('search-input').value.toLowerCase();
//     const filteredItems = items.filter(item => 
//         item.name.toLowerCase().includes(searchInput) ||
//         item.description.toLowerCase().includes(searchInput) ||
//         item.category.toLowerCase().includes(searchInput)
//     );
//     displayItems(filteredItems); // Display filtered items
// }

// // Initial fetch of items
// fetchItems();



// client/js/app.js
const itemsContainer = document.getElementById('items-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to fetch and display items
const fetchItems = async (query = '') => {
    try {
        const response = await fetch(`http://localhost:3000/items${query ? `?search=${query}` : ''}`);
        
        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const items = await response.json();
        displayItems(items);
    } catch (error) {
        console.error('Fetch error:', error);
        itemsContainer.innerHTML = '<p>Error loading items. Please try again later.</p>';
    }
};

// Function to display items in cards
const displayItems = (items) => {
    itemsContainer.innerHTML = ''; // Clear previous items

    if (items.length === 0) {
        itemsContainer.innerHTML = '<p>No items found.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p>Category: ${item.category}</p>
            <a href="detail.html?id=${item.id}" class="view-detail-button">View Detail</a>
        `;
        itemsContainer.appendChild(card);
    });
};

// Event listener for search
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    fetchItems(query); // Fetch items based on the search query
});

// Fetch all items on initial load
fetchItems();
