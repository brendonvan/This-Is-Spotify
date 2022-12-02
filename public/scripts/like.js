console.log("Like:loaded")

const likeButton = document.getElementById("track-like");

let toggle = true;

likeButton.addEventListener('click', async () => {
    console.log("event listener works")
    // event.preventDefault();
    // console.log("eventlistener worked")
    let path = window.location.pathname.split("");
    console.log(path)
    let trackId = path.splice(7).join("");
    console.log(trackId)
    toggle = !toggle;
    if (toggle) {
        likeButton.src = "/images/icons/icon-heart.svg";
        // Remove Song from Liked Songs Playlist
        // grab track id and turn liked to false
        await fetch(`localhost:8080/track/disliked/${trackId}`, { method: "PUT" });

    } else {
        likeButton.src = "/images/icons/icon-filled-heart.svg";
        await fetch(`https://pokedex-demo.onrender.com:8080/track/liked/${trackId}`, { method: "PUT" });
        // Add Song to Liked Songs Playlist
        // grab track id and turn liked to true
    }   
});