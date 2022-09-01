console.log("Add_To_Playlist:loaded");

const addButton = document.getElementById("add-to-playlist");
const playlistOptions = document.getElementById("playlistOptions");

addButton.addEventListener('click', async () => {
    const response = await fetch(`http://localhost:8080/track/playlists`, { method: "GET" });
    const data = await response.json();

    data.list.forEach((playlist) => {
        // console.log(playlist);
        let path = window.location.pathname.split("");
        let trackId = path.splice(7).join("");
        // console.log(trackId);
        playlistOptions.innerHTML += `<form action="/playlist/${ playlist._id }/add/${ trackId }?_method=PUT" method="POST"><button type="submit">${playlist.name}</button></form>`;
    })
})