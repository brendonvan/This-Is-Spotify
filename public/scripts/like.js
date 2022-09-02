console.log("Like:loaded")

const img = document.getElementById("track-like");
let toggle = true;

img.addEventListener('click', () => {
    toggle = !toggle;
    if (toggle) {
        img.src = "/images/icons/icon-heart.svg";
    } else {
        img.src = "/images/icons/icon-filled-heart.svg";
    }
})