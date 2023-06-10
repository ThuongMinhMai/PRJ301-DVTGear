const orderForm = document.getElementById("orderForm");
const orderButton = document.getElementById("orderButton");

const hiddenOrderForm = () => {
  orderForm.classList.add("hidden");
  orderForm.classList.remove("block");
  orderButton.classList.remove("hidden");
  orderButton.classList.add("block");
};
const displayOrderForm = () => {
  orderForm.classList.remove("hidden");
  orderForm.classList.add("block");
  orderButton.classList.add("hidden");
  orderButton.classList.remove("block");
};

hiddenOrderForm();

const formatNum = (number) => {
  const options = { maximumFractionDigits: 0 };
  const formattedNumber = number.toLocaleString("en-US", options);

  return formattedNumber;
};

const localStorageCartProducts = localStorage.getItem("cart");

let dataCartProducts; //{ products: [], totalMoney: 0 };

// let cartProduct = { products: [], totalMoney: 0 };

const fetchCartProducts = async () => {
  const url = "http://localhost:8080/store/cart";
  const method = "POST";
  const body = {
    products: Object.keys(JSON.parse(localStorageCartProducts).products),
  };

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    dataCartProducts = data.products;
    renderOrders();
  } catch (error) {
    console.error("Error:", error);
  }
};

const renderOrders = () => {
  let htmlContent = "";

  dataCartProducts.forEach((product) => {
    if (JSON.parse(localStorageCartProducts).products[product.id] < 1) {
    }

    htmlContent += `
    <div
        class="flex justify-between items-center py-4 border-b-[3px] border-primary"
        >
        <div class="flex gap-4 items-center">
            <div class="h-20 w-20 min-w-[80px] overflow-hidden">
                <img
                    src="${JSON.parse(product.images)[0]}"
                    alt=""
                    class="h-full w-full object-cover rounded-lg border border-primary"
                    />
            </div>
            <div>
                <div class="font-bold text-xl mb-2 line-clamp-1">
                    Đây là cái máy tính
                </div>
                <div>
                    <div class="inline-block font-bold text-primary w-32">
                        ${formatNum(product.price) + "đ"}
                    </div>
                    <div
                        class="inline-block px-3 bg-dvt-black-1 rounded-sm shadow-lg"
                        >
                        x${
                          JSON.parse(localStorageCartProducts).products[
                            product.id
                          ]
                        }
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-between self-stretch">
            <div onclick="deleteProduct(${
              product.id
            })" class="ml-auto cursor-pointer">
                <img
                    src="./assets/close.svg"
                    alt=""
                    class="w-6 h-6 filter invert"
                    />
            </div>
            <div class="flex">
                <div
                    onclick="decreaseProduct(${product.id})"
                    class="flex justify-center px-4 rounded-md cursor-pointer border-2 border-primary text-primary hover:text-white hover:bg-primary"
                    >
                    -
                </div>
                <div
                    onclick="increaseProduct(${product.id})"
                    class="flex justify-center px-4 rounded-md cursor-pointer border-2 border-primary text-primary hover:text-white hover:bg-primary ml-4"
                    >
                    +
                </div>
            </div>
        </div>
    </div>
          `;
  });

  document.getElementById("ordersContainer").innerHTML = htmlContent;
};

if (localStorageCartProducts) {
  fetchCartProducts();
}

const increaseProduct = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.products[id] < 10) {
    cart.products[id] += 1;
    cart.productCount += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
};
const decreaseProduct = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.products[id] > 1) {
    cart.products[id] -= 1;
    cart.productCount -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
};
const deleteProduct = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.products[id] >= 1) {
    cart.productCount -= cart.products[id];
    delete cart.products[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
};

const handleSubmitOrder = (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  console.log("SĐT:", formData.get("phone"));
  console.log("Address:", formData.get("address"));
  console.log("save?:", formData.get("isSaveDataOrder"));
};
