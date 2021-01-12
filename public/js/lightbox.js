const lightboxTarget = document.getElementById("lightbox-target");
const lightbox = document.getElementById("lightbox");
const closeLightBoxButton = document.getElementById("close-lightbox");
const lightBoxImage = document.getElementById("lightbox-image");

lightboxTarget.addEventListener("click", () => {
  lightbox.style.visibility = "visible";
  lightbox.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  lightBoxImage.style.opacity = "1";
});

closeLightBoxButton.addEventListener("click", () => {
  lightbox.style.visibility = "hidden";
  lightbox.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  lightBoxImage.style.opacity = "0";
});
