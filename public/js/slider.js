import Glide from "@glidejs/glide";

new Glide(".glide", {
  type: "carousel",
  startAt: 0,
  perView: 5,
  focusAt: "center",
  gap: 0,
}).mount();
