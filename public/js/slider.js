import Glide from "@glidejs/glide";

new Glide(".glide", {
  type: "carousel",
  startAt: 0,
  perView: 4,
  focusAt: "center",
  gap: 2,
}).mount();
