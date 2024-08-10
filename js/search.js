document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category-select');
    const searchButton = document.querySelector('button.fas.fa-search');

    // Handle search on button click
    function search() {
        const query = searchInput.value.toLowerCase();
        const category = categorySelect.value.toLowerCase();
        
        // Filter items on the current page
        filterItems(query, category);
        
        // Fetch and filter items from other pages
        fetchAndFilterPages(query, category);
    }

    function filterItems(query, category) {
        const items = document.querySelectorAll('.product-item');
        items.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const imgAlt = item.querySelector('img').alt.toLowerCase();
            
            // Check if query matches title or alt text and if category matches
            if ((title.includes(query) || imgAlt.includes(query)) && 
                (category === 'all' || title.includes(category))) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    async function fetchAndFilterPages(query, category) {
        const pagesToSearch = ['shoes.html', 'clothes.html', 'kitchen.html']; // Add your pages here
        
        for (const page of pagesToSearch) {
            const response = await fetch(page);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            
            // Process the fetched page here
            const items = doc.querySelectorAll('.product-item');
            items.forEach(item => {
                const title = item.querySelector('h4').textContent.toLowerCase();
                const imgAlt = item.querySelector('img').alt.toLowerCase();
                
                // Check if query matches title or alt text and if category matches
                if ((title.includes(query) || imgAlt.includes(query)) && 
                    (category === 'all' || title.includes(category))) {
                    console.log(`Match found in ${page}: ${title}`);
                    // Here you could display the item or add it to the current page
                }
            });
        }
    }

    // Attach event listener to the search button
    searchButton.addEventListener('click', search);
});
