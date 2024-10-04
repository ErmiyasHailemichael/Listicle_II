// app.js
document.getElementById('search-box').addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase();
    fetch('http://localhost:3000/items')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('items-container');
            container.innerHTML = '';  // Clear previous results
            data.filter(item => item.title.toLowerCase().includes(query))
                .forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.innerHTML = `<h2>${item.title}</h2><p>${item.text}</p>`;
                    container.appendChild(itemElement);
                });
        });
});
