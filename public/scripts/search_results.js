console.log("Search_Results:loaded");

// CONFIGURATION
const searchInput = document.getElementById("search");
const resultWrapper = document.getElementById("results")
const searchButton = document.getElementById("search-button")

const searchable = [];

searchInput.addEventListener('keypress', async (e) => {
    if (event.key === "Enter") {
        let input = searchInput.value
        console.log(input);
        window.location.href = "http://localhost:8080/search/";    
    }
    
})

searchInput.addEventListener('keyup', async (e) => {
    // console.log(searchInput.value);
    let input = searchInput.value
    // console.log(input.length)
    if (input.length) {
        results = searchable.filter((item) => {
            return item.toLowerCase().includes(input.toLowerCase());
        })
    } else if ( input.length == 0 ) {
        resultWrapper.innerHTML = ``;
    }
    
    setTimeout( async () => {
        console.log("Searching")
        const response = await fetch(`http://localhost:8080/search/input?search=${input}`, { method: "GET" });
        const data = await response.json();
        renderResults(data.list);
    }, 500)
}) 

function renderResults(results) {
    // console.log(results);
    let content = results.map((item, i) => {
        console.log("Items: " + item);
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

async function requestAuthorization() {
    console.log("Authorization Clicked")
    const response = await fetch(`http://localhost:8080/auth`, { method: "GET" });
    const data = await response.json();

    let url = "https://accounts.spotify.com/authorize";
    url += "?client_id=" + data.client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(data.redirect_uri);
    url += "&show_dialog=true";
    window.location.href = url;
}


