// Get DOM element:
const inputField = document.getElementById('input-field');
const errorDiv = document.getElementById('errors');
const displayBookDiv = document.getElementById('display-book');
const searchResult = document.getElementById('search-result');

// Click handler add:
document.getElementById('search-btn').addEventListener('click', async () => {
    // console.log('clicked');
    const inputValue = inputField.value;
    // Search error handle:
    if (inputValue === '') {
        errorDiv.innerText = "Search field can't be empty!";
        return;
    }
    // console.log(inputValue);
    const response = await fetch( `https://openlibrary.org/search.json?q=${inputValue}` );
    const data = await response.json();
    // console.log(data);
    inputField.value = '';
    searchResult.innerText = `Related result found: ${data.numFound}`;
    displayBook(data.docs);

    

});

// Show book details:
const displayBook = books => {
    // console.log(books);
    // Clear data
    displayBookDiv.textContent = '';
    books.forEach(element => {
        // console.log(element.title);
        const div = document.createElement('div');
        div.innerHTML = `
        <h3 class="fs-3">Book name: ${element.title}
        <p class="fs-6 mb-1">Author name: ${element.author_name[0]}
        <p class="fs-6">First published: ${element.first_publish_year}
    `;
        displayBookDiv.appendChild(div);
    });
    
    displayBookDiv.textContent = '';
}