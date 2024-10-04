// detail.js

// const urlParams = new URLSearchParams(window.location.search);
// const itemId = urlParams.get('id');


// async function fetchItemDetail(itemId) {
//     try {
//         const response = await fetch(`http://localhost:3000/items/${itemId}`);
//         const item = await response.json();
//         console.log(item); // Check if item data is fetched correctly
//         displayItemDetail(item); 
//     } catch (error) {
//         console.error('Error fetching item detail:', error);
//     }
// }


// // Function to display item details on the page
// function displayItemDetail(item) {
//     // Check that item contains all the necessary fields
//     if (item) {
//         document.getElementById('item-title').textContent = item.name || 'No title available';
//         document.getElementById('item-image').src = item.image || '';
//         document.getElementById('item-image').alt = item.name || 'Image not available';
//         document.getElementById('item-description').textContent = item.description || 'No description available';
//         document.getElementById('item-text').textContent = item.text || 'No text available';
//         document.getElementById('item-category').textContent = item.category || 'No category available';
//         document.getElementById('item-submittedby').textContent = item.submittedby || 'No submittedby available';
//     } else {
//         console.error('Item not found');
//     }
// }


// // Fetch the item details when the page loads
// fetchItemDetail(itemId);
// Get the DOM elements where we want to display the data
const itemTitle = document.getElementById('item-title');
const itemImage = document.getElementById('item-image');
const itemText = document.getElementById('item-text');
const itemCategory = document.getElementById('item-category');
const itemSubmittedBy = document.getElementById('item-submittedby');

// Get the query parameters to find the ID of the item
const params = new URLSearchParams(window.location.search);
const itemId = params.get('id');  // Get the ID from the query string (e.g., detail.html?id=123)

// Fetch item details from the backend
const fetchItemDetails = async () => {
    try {
        const response = await fetch(`http://localhost:3000/items/${itemId}`);  // Fetch data from /items/:id route

        if (!response.ok) {
            throw new Error('Failed to fetch item details');
        }

        const item = await response.json();  // The data coming from your PostgreSQL database

        // Update the DOM with the fetched data
        itemTitle.textContent = item.name;
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemText.textContent = item.text;  // Ensure this field exists in your database
        itemCategory.textContent = item.category;
        itemSubmittedBy.textContent = item.submittedby;

    } catch (error) {
        console.error('Error fetching item details:', error);
    }
};


// Call the function to fetch item details
fetchItemDetails();
