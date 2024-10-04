// //app.js
const itemsContainer = document.getElementById('items-container');
let items = []; 
async function fetchItems() {
    try {
        const response = await fetch('http://localhost:3000/items'); 
        items = await response.json(); 
        displayItems(items);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}


function displayItems(itemsToDisplay) {
    itemsContainer.innerHTML = ''; 
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

function filterItems() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchInput) ||
        item.description.toLowerCase().includes(searchInput) ||
        item.category.toLowerCase().includes(searchInput)
    );
    displayItems(filteredItems); 
}


document.getElementById('search-input').addEventListener('input', filterItems);

fetchItems();
