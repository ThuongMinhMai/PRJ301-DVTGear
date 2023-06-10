<%-- 
    Document   : cart
    Created on : Jun 9, 2023, 12:10:34 PM
    Author     : Kingc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>


<jsp:include page="./header.jsp" />

<div
    id="cartPage"
    class="bg-dvt-black-2 text-white p-6 mx-auto max-w-7xl w-11/12 rounded-md mt-32 mb-8"
    >




    <div id="productsContainer"></div>



    <div class="flex justify-between items-center my-4">
        <div class="font-bold text-xl">Tổng Tiền:</div>
        <div id='totalMoney' class="font-bold text-xl"></div>
    </div>
    <div class="flex justify-end my-4">
        <div
            id="orderButton"
            onclick="displayOrderForm()"
            class="py-1 px-6 rounded-md cursor-pointer border-2 border-primary text-white bg-primary ml-4 hover:opacity-70"
            >
            Thanh Toán
        </div>
    </div>

    <div id="orderForm" class="hidden">
        <div>
            <label class="text-white mb-3 block">
                <div class="font-bold">Số điện thoại</div>
                <input
                    class="mt-1 block border py-1 border-white outline-none px-2 rounded w-72 max-w-[90%] bg-transparent"
                    type="text"
                    name="phone"
                    pattern="[0-9]{10,12}"
                    title="Please enter a 10-digit phone number"
                    id="phoneInput"
                    required
                    />
            </label>
            <label class="text-white mb-3 block">
                <div class="font-bold">Địa chỉ</div>
                <input
                    class="mt-1 block border py-1 border-white outline-none px-2 rounded w-72 max-w-[90%] bg-transparent"
                    type="text"
                    name="address"
                    id="addressInput"
                    required
                    />
            </label>
            <label class="flex items-center gap-2 mb-3">
                <input type="checkbox" id="isSaveDataOrderInput" name="isSaveDataOrder" class="w-4 h-4" />
                <span class="font-medium"
                      >Lưu lại thông tin cho lần đặt hàng sau</span
                >
            </label>
            <div class="font-bold">
                Phương thức thanh toán: Trả tiền khi giao hàng.
            </div>
        </div>

        <div class="flex justify-end my-4">
            <div
                onclick="hiddenOrderForm()"
                class="py-1 px-6 rounded-md cursor-pointer border-2 border-primary text-primary hover:text-white hover:bg-primary"
                >
                Hủy
            </div>
            <button
                type="submit"
                <% if (request.getSession().getAttribute("currentUser") == null) { %>
                onclick="moveToLogin()"
                <% } else { %>
                onclick="handleSubmitOrder()"
                <% }%>
                class="py-1 px-6 rounded-md cursor-pointer border-2 border-primary text-white bg-primary ml-4 hover:opacity-70"
                >
                Tiến Hành Đặt Hàng
            </button>
        </div>
    </div>
</div>


<script>

    const cartPage = document.getElementById("cartPage");
    updateCartPage = () => {
        if (!JSON.parse(localStorage.getItem("cart")).productCount)
        {
            cartPage.innerHTML = `<div class="w-full flex flex-col justify-center gap-8 items-center h-72 relative">
        <div class="font-bold text-3xl">Giỏ hàng rỗng</div>
        <div class="text-3xl">Hỏng lẻ hông ưng!</div>
        
    </div>`;
        }
    };
    updateCartPage();


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
        const options = {maximumFractionDigits: 0};
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
            products: Object.keys(JSON.parse(localStorageCartProducts).products)
        };
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            dataCartProducts = data.products;
            calcTotalMoney();
            renderOrders();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const calcTotalMoney = () => {
        console.log("calcTotalMoney");
        const total = dataCartProducts.reduce(function (acc, product) {
            var quantity = JSON.parse(localStorage.getItem("cart")).products[product.id] ?? 0;
                    return acc + Number(product.price) * Number(quantity);
        }, 0);
        console.log("calcTotalMoney");
        const totalMoney = document.getElementById("totalMoney");
        totalMoney.innerHTML = formatNum(total) + "đ";
    };




    const updateProductCountHeader = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        document.getElementById("cartTotalDisplay").innerHTML = cart ? cart.productCount : 0;
    };
    updateProductCountHeader();





    const renderOrders = () => {
        let htmlContent = "";
        if (!dataCartProducts) {
            return;
        }
        const localStorageCartProducts = localStorage.getItem("cart");
        dataCartProducts.forEach((product) => {
            if (JSON.parse(localStorageCartProducts).products[product.id] >= 1) {
                //gặp vấn đề khi dùng template literals của js nên phải đành dùng cách này
                htmlContent += '<div class="flex justify-between items-center py-4 border-b-[3px] border-primary">' +
                        '<div class="flex gap-4 items-center">' +
                        '<a href="http://localhost:8080/store/products?id=' + product.id + '" class="h-20 w-20 min-w-[80px] overflow-hidden">' +
                        '<img src="' + JSON.parse(product.images)[0] + '" alt="" class="h-full w-full object-cover rounded-lg border border-primary" />' +
                        '</a>' +
                        '<div>' +
                        '<div class="font-bold text-xl mb-2 line-clamp-1">' +
                        product.name +
                        '</div>' +
                        '<div>' +
                        '<div class="inline-block font-bold text-primary w-32">' +
                        formatNum(product.price) + 'đ' +
                        '</div>' +
                        '<div class="inline-block px-3 bg-dvt-black-1 rounded-sm shadow-lg">' +
                        'x' + JSON.parse(localStorageCartProducts).products[product.id] +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="flex flex-col justify-between self-stretch">' +
                        '<div onclick="deleteProduct(' + product.id + ')" class="ml-auto cursor-pointer">' +
                        '<ion-icon name="close-outline" class="w-6 h-6"></ion-icon>' +
                        '</div>' +
                        '<div class="flex">' +
                        '<div onclick="decreaseProduct(' + product.id + ')" class="flex justify-center px-4 rounded-md cursor-pointer border-2 border-primary text-primary hover:text-white hover:bg-primary">' +
                        '-' +
                        '</div>' +
                        '<div onclick="increaseProduct(' + product.id + ')" class="flex justify-center px-4 rounded-md cursor-pointer border-2 border-primary text-primary hover:text-white hover:bg-primary ml-4">' +
                        '+' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
            }

        });
        document.getElementById("productsContainer").innerHTML = htmlContent;
    };
    if (localStorageCartProducts) {
        fetchCartProducts();
    }

    const increaseProduct = (id) => {
        const cart = JSON.parse(localStorage.getItem("cart"));
//        if (cart.products[id] < 10) {
        cart.products[id] += 1;
        cart.productCount += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateProductCountHeader();
        renderOrders();
        calcTotalMoney();
        updateCartPage();
//        }
    };
    const decreaseProduct = (id) => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart.products[id] > 1) {
            cart.products[id] -= 1;
            cart.productCount -= 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateProductCountHeader();
            renderOrders();
            calcTotalMoney();
            updateCartPage();
        }
    };
    const deleteProduct = (id) => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart.products[id] >= 1) {
            cart.productCount -= cart.products[id];
            delete cart.products[id];
            localStorage.setItem("cart", JSON.stringify(cart));
            updateProductCountHeader();
            renderOrders();
            calcTotalMoney();
            updateCartPage();
        }
    };
    const getOrderData = () => {
        const localStorageOderData = localStorage.getItem("orderData");
        if (localStorageOderData)
        {
            const orderData = JSON.parse(localStorageOderData);
            document.getElementById("phoneInput").value = orderData.phone;
            document.getElementById("addressInput").value = orderData.address;
        }
    };
    getOrderData();
    const formDataToObject = (formData) => {
        let object = {};
        for (let entry of formData.entries()) {
            let key = entry[0];
            let value = entry[1];
            // If the key already exists, convert the value to an array
            if (object.hasOwnProperty(key)) {
                if (!Array.isArray(object[key])) {
                    object[key] = [object[key]];
                }
                object[key].push(value);
            } else {
                object[key] = value;
            }
        }

        return object;
    };
    const handleSubmitOrder = () => {

        const phone = document.getElementById("phoneInput").value;
        const address = document.getElementById("addressInput").value;
        const isSaveDataOrder = document.getElementById("isSaveDataOrderInput").value;
        if (isSaveDataOrder)
        {
            localStorage.setItem("orderData", JSON.stringify({
                phone,
                address
            }));
        }
        ;
        const form = document.createElement('form');
// Set form attributes
        form.method = 'POST'; // HTTP method
        form.action = 'http://localhost:8080/store/orders'; // Server endpoint URL

// Create form fields
        const phoneElement = document.createElement('input');
        phoneElement.type = 'text';
        phoneElement.name = 'phone';
        phoneElement.value = phone;
        const addressElement = document.createElement('input');
        addressElement.type = 'text';
        addressElement.name = 'address';
        addressElement.value = address;
        const productsElement = document.createElement('input');
        productsElement.type = 'text';
        productsElement.name = 'products';
        productsElement.value = JSON.stringify(JSON.parse(localStorage.getItem("cart")).products);
// Add form fields to the form
        form.appendChild(phoneElement);
        form.appendChild(addressElement);
        form.appendChild(productsElement);
// Append the form to the document body
        document.body.appendChild(form);
//Before Submit the form
        localStorage.removeItem("cart");
// Submit the form   
        form.submit();
    };
</script>


<jsp:include page="./footer.jsp" />