
const itemTitle = document.getElementById('item-title');
const itemImage = document.getElementById('item-image');
const itemText = document.getElementById('item-text');
const itemCategory = document.getElementById('item-category');
const itemSubmittedBy = document.getElementById('item-submittedby');

const params = new URLSearchParams(window.location.search);
const itemId = params.get('id'); 


const fetchItemDetails = async () => {
    try {
        const response = await fetch(`http://localhost:3000/items/${itemId}`);  

        if (!response.ok) {
            throw new Error('Failed to fetch item details');
        }

        const item = await response.json();  

        // Update the DOM with the fetched data
        itemTitle.textContent = item.name;
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemText.textContent = item.text; 
        itemCategory.textContent = item.category;
        itemSubmittedBy.textContent = item.submittedby;

    } catch (error) {
        console.error('Error fetching item details:', error);
    }
};


fetchItemDetails();
