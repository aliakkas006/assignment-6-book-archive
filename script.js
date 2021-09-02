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
    } else {
        errorDiv.innerText = '';
    }
    // console.log(inputValue);
    const response = await fetch( `https://openlibrary.org/search.json?q=${inputValue}` );
    const data = await response.json();
    // console.log(data);
    inputField.value = '';
    searchResult.innerText = `Related result found: ${data.numFound}`;
    displayBook(data.docs);

    

});

// Get cover img:
// const coverImg = async source => {
//     const response = await fetch(`https://covers.openlibrary.org/b/id/${source}-M.jpg`);
//     const data = await response.json();
//     console.log(data);
// }

// Show book details:
const displayBook = books => {
    // console.log(books[0].cover_i); 
    // Clear data
    displayBookDiv.textContent = '';

    // const imgUrl = `https://covers.openlibrary.org/b/id/${books.docs[12].cover_i}-M.jpg`;
    
    books.forEach(element => {
        // console.log(element.cover_i);
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg">
            <h3 class="fs-3 text-success">Book name: ${element.title}
            <p class="fs-6 mb-1 text-primary">Author name: ${element.author_name[0] ? element.author_name[0] : ''}
            <p class="fs-6 text-primary">First published: ${element.first_publish_year ? element.first_publish_year : ''}
    `;
        displayBookDiv.appendChild(div);
    });
    
    displayBookDiv.textContent = '';
}