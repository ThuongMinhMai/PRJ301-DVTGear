function clickCancel(number) {
  document.getElementById("status" + number).innerHTML = "đã hủy";
  document.getElementById("button_cancel" + number).style.display = "none";
  document.getElementById("button_received" + number).style.display = "none";
  document.getElementById("sub-status" + number).innerHTML =
    "Đã hủy bởi người mua";
}

function clickReceived(number) {
  document.getElementById("status" + number).innerHTML = "đã nhận hàng";
  document.getElementById("button_cancel" + number).style.display = "none";
  document.getElementById("button_received" + number).style.display = "none";
  document.getElementById("sub-status" + number).innerHTML =
    "Đã nhận hàng thành công";
}

quantityInput.addEventListener("change", function (e) {
  if (e.target.value > 10) {
    quantityInput.value = 10;
  }
  if (e.target.value < 1) {
    quantityInput.value = 1;
  }
});
