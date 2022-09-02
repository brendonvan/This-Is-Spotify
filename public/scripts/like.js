console.log("Like:loaded")

const likeButton = document.getElementById("track-like");

let toggle = true;

likeButton.addEventListener('click', () => {
    toggle = !toggle;
    if (toggle) {
        likeButton.src = "/images/icons/icon-heart.svg";
        // Remove Song from Liked Songs Playlist
    } else {
        likeButton.src = "/images/icons/icon-filled-heart.svg";
        // Add Song to Liked Songs Playlist
    }
})