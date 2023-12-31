const allHowerImage = document.querySelectorAll(".hower-image div img");
const imgMain = document.querySelector(".main-image");

window.addEventListener("DOMContentLoaded", () => {
  allHowerImage[0].parentElement.classList.add("active");
});

allHowerImage.forEach((image) => {
  image.addEventListener("mouseover", () => {
    imgMain.querySelector("img").src = image.src;
    resetActiveImg();
    image.parentElement.classList.add("active");
  });
});

function resetActiveImg() {
  allHowerImage.forEach((img) => {
    img.parentElement.classList.remove("active");
  });
}

var decrementButton = document.getElementById("decrement");
var incrementButton = document.getElementById("increment");
var quantityInput = document.getElementById("quantity");

quantityInput.value = 1;

decrementButton.addEventListener("click", function () {
  if (parseInt(quantityInput.value) > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
});

incrementButton.addEventListener("click", function () {
  if (parseInt(quantityInput.value) < 10) {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  }
});
