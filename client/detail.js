// client/js/detail.js
const itemDetailsContainer = document.getElementById('item-details');

// Function to fetch item details
const fetchItemDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const response = await fetch(`http://localhost:3000/items/${id}`);
    const item = await response.json();

    if (item) {
        itemDetailsContainer.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}" style="max-width: 100%; height: auto;">
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <p>Category: ${item.category}</p>
        `;
    } else {
        itemDetailsContainer.innerHTML = '<p>Item not found.</p>';
    }
};

// Fetch item details on load
fetchItemDetails();
