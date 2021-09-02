// Get DOM element:
const inputField = document.getElementById('input-field');
const errorDiv = document.getElementById('errors');
const displayBookDiv = document.getElementById('display-book');
const searchResult = document.getElementById('search-result');

// Click handler add:
document.getElementById('search-btn').addEventListener('click', async () => {
    
    const inputValue = inputField.value;
    // Search error handle:
    if (inputValue === '') {
        errorDiv.innerText = "Search field can't be empty!";
        return;
    } else {
        errorDiv.innerText = '';
    }
    
    // Fetch books info:
    const response = await fetch( `https://openlibrary.org/search.json?q=${inputValue}` );
    const data = await response.json();
    
    inputField.value = '';
    searchResult.innerText = `Related result found: ${data.numFound}`;
    displayBook(data.docs);

});

// Show book details:
const displayBook = books => {
    // Clear data
    displayBookDiv.textContent = '';

    books.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg">
            <h3 class="fs-3 text-success">Book name: ${element.title}
            <p class="fs-6 mb-1 text-primary">Author name: ${element.author_name[0] ? element.author_name[0] : ''}
            <p class="fs-6 mb-1 text-primary">Publisher: ${element.publisher ? element.publisher : ''}
            <p class="fs-6 text-primary">First published: ${element.first_publish_year ? element.first_publish_year : ''}
    `;
        displayBookDiv.appendChild(div);
    });
    
    displayBookDiv.textContent = '';
}