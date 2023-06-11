
// Tab

// Get all the tab elements
const tabs = document.querySelectorAll('.tab');

// Function to handle tab click event
function handleTabClick() {
  // Remove the 'selected' class from all tabs
  tabs.forEach(tab => tab.classList.remove('selected'));

  // Add the 'selected' class to the clicked tab
  this.classList.add('selected');
}

// Set the 'selected' class to the default tab (Tất cả)
const defaultTab = document.getElementById('tab1');
defaultTab.classList.add('selected');

// Attach click event listeners to each tab
tabs.forEach(tab => tab.addEventListener('click', handleTabClick));


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


