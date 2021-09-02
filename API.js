
const searchField = document.getElementById('search-input');
const countryDetails = document.getElementById('country-details');
const containerDiv = document.getElementById('country-container');
const errorDiv = document.getElementById('errors');
const spinner = document.getElementById('spinner');

document.getElementById('search-btn').addEventListener('click', async function () {

    const searchValue = searchField.value;
    // Error handling:
    if (searchValue === '') {
        errorDiv.innerText = "Search field can't be empty!";
        return;
    }
    // console.log(searchValue);
    /* vai er github theke add korbo
    spinner */
    setTimeout(() => spinner.classList.remove('d-none'), 1500);

    const response = await fetch(`https://restcountries.eu/rest/v2/name/${searchValue}`);
    const data = await response.json();
    displayData(data);

});

const displayData = countries => {
    // Error handling:
    if (countries.status === 404) {
        errorDiv.innerText = 'No result found!';
    } else {
        errorDiv.innerText = '';
    }

    // field clear:
    containerDiv.textContent = '';
    countryDetails.textContent = '';
    countries.forEach(element => {
        // console.log(element.alpha2Code);
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
            <div class="rounded overflow-hidden border p-2">
                <img src="${element.flag}" class="w-100" alt=""/>
            </div>

            <div class="py-2 d-flex justify-content-between align-items-center d-md-block    text-md-center">
                <h1>${element.name}</h1>
                <button onclick="displayDetails('${element.alpha2Code}')" class="btn btn-dark">Learn More</button>
            </div>
        `;
        containerDiv.appendChild(div);
    });

    searchField.value = '';
    spinner.classList.add('d-none');
}

const displayDetails = async code => {
    
    const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`);
    const data = await response.json();
    // console.log(data);
    displayCountryDetails(data);

}

const displayCountryDetails = country => {
    // console.log(country);
    countryDetails.innerHTML = `
        <h1>Name: ${country.name}</h1>
        <p>Capital: ${country.capital}</p>
        <p>Currency name: ${country.currencies[0].name}</p>
        <p>Currency symbol: ${country.currencies[0].symbol}</p>
    `;
}

