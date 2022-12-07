console.log("Add_To_Playlist:loaded");

// DECLARE VARIABLES
const addButton = document.getElementById("add-to-playlist");
const playlistOptions = document.getElementById("playlistOptions");

// EVENT LISTENERS
addButton.addEventListener('click', async () => {
    console.log("Event listener Clicked")
    // FETCH PLAYLIST DATA
    const response = await fetch(`https://streamify.fly.dev/track/playlists`, { method: "GET" });
    const data = await response.json();
    
    console.log(data);

    // FOR EACH PLAYLIST ADD HTML ELEMENT
    data.list.forEach((playlist) => {
        let path = window.location.pathname.split("");
        let trackId = path.splice(7).join("");
        playlistOptions.innerHTML += `<form action="/playlist/${ playlist._id }/add/${ trackId }?_method=PUT" method="POST"><button type="submit">${playlist.name}</button></form>`;
    })
})