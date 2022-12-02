console.log("Search_Results:loaded");

// CONFIGURATION
const searchInput = document.getElementById("search");
const resultWrapper = document.getElementById("results")
const searchButton = document.getElementById("search-button")

// EVENT LISTENER ON ANY KEY
searchInput.addEventListener('keyup', async (e) => {
    searchResults();
}) 

// EVENT LISTENER FOR "ENTER"
searchInput.addEventListener('keypress', async (e) => {
    if (event.key === "Enter") {
        let input = searchInput.value
        window.location.href = "https://pokedex-demo.onrender.com:8080/search/";    
    }
})

//  SEARCH TRACKS
function searchResults() {
    // Grab input
    let input = searchInput.value;
    
    // Send input data via GET request search query, to get back list of tracks
    setTimeout( async () => {
        // GET DATA
        const response = await fetch(`https://pokedex-demo.onrender.com:8080/search/input?search=${input}`, { method: "GET" });
        const data = await response.json();
        // RENDER DATA TO PAGE
        renderResults(data.list);
    }, 500)
}

// SHOWS RESULTS ON HTML PAGE
function renderResults(results) {
    // FOR EACH ITEM ADD NEW HTML ELEMENT
    let content = results.map((item, i) => {
        // console.log("Items: " + item);
        return `
            <a href="/track/create/${item.id}">
                <div class="item-container">
                    <img src="${item.album.images[1].url}" alt="This-is-Grogu">
                    <div class="item-content">
                        <h2>${item.name}</h2>
                        <p>By ${item.artists[0].name}</p>
                    </div>
                </div>
            </a>
        `;
    })
    .join("");
    
    resultWrapper.innerHTML = `${content}`;
}

