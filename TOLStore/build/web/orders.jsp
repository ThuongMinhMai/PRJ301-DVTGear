<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="utils.Utils" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>

<jsp:include page="./header.jsp"/>

<div id="ordersContainer" class="w-11/12 max-w-6xl mx-auto mt-32 mb-8">
    <div class="flex mb-4 rounded-md bg-dvt-black-2">
        <a href="?" id="tab1" class="w-1/5 py-4 text-lg text-center cursor-pointer hover:text-primary tab">Tất cả</a>
        <a href="?filter_by=PROCESSING" id="tab2"
           class="w-1/5 py-4 text-lg text-center cursor-pointer hover:text-primary tab">Đang xử lí</a>
        <a href="?filter_by=DELIVERING" id="tab3"
           class="w-1/5 py-4 text-lg text-center cursor-pointer hover:text-primary tab">Đang giao</a>
        <a href="?filter_by=COMPLETE" id="tab4"
           class="w-1/5 py-4 text-lg text-center cursor-pointer hover:text-primary tab">Hoàn thành</a>
        <a href="?filter_by=CANCELLED" id="tab5"
           class="w-1/5 py-4 text-lg text-center cursor-pointer hover:text-primary tab">Đã hủy</a>
    </div>

    <c:set var="orderList" value="${requestScope.orderList}"/>


    <c:if test="${orderList.size() == 0}">
        <div class="flex flex-col justify-center items-center bg-dvt-black-2 rounded-md h-[500px]">
            <img class="w-24 h-24"
                 src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png"
                 alt="no_order"/>
            <div class="my-4 text-2xl font-medium text-white">Chưa có đơn hàng nào</div>
        </div>
    </c:if>

    <c:forEach var="order" items="${orderList}">
        <c:set var="orderProductList" value="${order.getOrderProducts()}"/>

        <div class="px-6 py-6 mb-4 text-white rounded-md bg-dvt-black-2">
            <div class="flex justify-between">
                <span class="mb-3 text-lg font-bold text-primary">TOL STORE</span>
                <label id="status1" class="uppercase text-primary">
                        ${order.getStatus().translate()}
                </label>
            </div>
            <hr/>
            <c:forEach var="orderProduct" items="${orderProductList}">
                <c:set var="product" value="${orderProduct.getProduct()}"/>
                <div class="flex my-5">
                    <a href="http://localhost:8080/store/products?id=${product.getId()}" class="h-24 aspect-square">
                        <img class="object-fill" src="${ Utils.parseJSONStringArray(product.getImages()).get(0)}"
                             alt="product"/>
                    </a>
                    <div class="flex flex-col flex-1 ml-4">
                        <span class="pb-1 text-lg line-clamp-1">${ product.getName()}</span>
                        <span class="pb-1">x${orderProduct.getQuantity()}</span>
                        <span class="px-1 text-xs border border-primary w-fit text-primary">Bảo hành 1 năm</span>
                    </div>
                    <div class="flex flex-col items-end justify-center gap-3 text-primary">
                            ${Utils.formatNum(orderProduct.getPrice())}₫
                        <c:if test="${order.getStatus().equalString('COMPLETE')}">
                            <c:choose>
                                <c:when test="${!orderProduct.getIsRated()}">

                                    <button
                                            onclick="renderRatingForm('${Utils.parseJSONStringArray(product.getImages()).get(0)}', '${product.getName().replaceAll("\"", "inch")}', '${product.getId()}')"
                                            class="px-6 py-2 text-white rounded-sm bg-primary hover:opacity-70">
                                        Đánh Giá
                                    </button>
                                </c:when>
                                <c:otherwise>
                                    <div class="px-6 py-2 bg-transparent border rounded-sm text-primary border-primary">
                                        Đã Đánh Giá
                                    </div>
                                </c:otherwise>
                            </c:choose>
                        </c:if>
                    </div>
                </div>
            </c:forEach>
            <hr/>
            <div class="flex pt-6">
                <div class="flex items-center flex-1 text-base text-slate-400">
                    <span class="mr-2 font-medium text-primary">Ngày đặt hàng: </span>
                        ${Utils.formatDate(order.getDate())}
                </div>
                <div class="flex flex-col items-end justify-end gap-2">
                    <div class="flex items-center gap-2">
                        <span class="">Thành tiền:</span>
                        <span class="text-2xl text-primary">${ Utils.formatNum(order.getTotalMoney())}₫</span>
                    </div>
                    <div>
                        <c:set var="status" value="${order.getStatus()}"/>
                        <c:choose>
                            <c:when test="${status.equalString('PROCESSING')}">
                                <button onclick="cancelOrder(${order.getId()})"
                                        class="px-12 py-2 border border-black rounded-sm bg-primary hover:opacity-70">
                                    Hủy Đơn
                                </button>
                            </c:when>
                            <c:when test="${status.equalString('DELIVERING')}">
                                <button onclick="completeOrder(${order.getId()})"
                                        class="px-12 py-2 border border-black rounded-sm bg-primary hover:opacity-70">
                                    Đã Nhận Hàng
                                </button>
                            </c:when>
                        </c:choose>
                    </div>
                </div>
            </div>
        </div>
    </c:forEach>
</div>


<script>

    const translateStatus = {
        "COMPLETE": "Hoàn Thành",
        "PROCESSING": "Đang Chờ Xử Lý",
        "DELIVERING": "Đang Giao Hàng",
        "CANCELLED": "Đã Hủy"
    };

    const formatDate = (dateString) => {
        const parts = dateString.split("-");
        const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
        return formattedDate;
    };
    <c:set var="totalOrders" value="${requestScope.itemsCount}" />
    let hideOrdersCount = ${totalOrders} -5;
    let currentPage = 1;

    const renderMoreOrders = (orders) => {
        let htmlOrders = "";
        for (const order of orders) {
            htmlOrders += `
		<div class="px-6 py-6 mb-4 text-white rounded-md bg-dvt-black-2">
		  <div class="flex justify-between">
			<span class="mb-3 text-lg font-bold text-primary">TOL STORE</span>
			<label id="status1" class="uppercase text-primary">
			  \${translateStatus[order.status]}
			</label>
		  </div>
		  <hr />
	  `;
            let htmlProducts = "";
            for (const orderProduct of order.orderProducts) {
                const product = orderProduct.product;
                htmlProducts += `
		  <div class="flex my-5">
			<a class="h-24 aspect-square" href=\${'http://localhost:8080/store/products?id='+product.id}>
			  <img class="object-fill" src=\${JSON.parse(product.images)[0]} alt="product" />
			</a>
			<div class="flex flex-col flex-1 ml-4">
			  <span class="pb-1 text-lg line-clamp-1">\${product.name}</span>
			  <span class="pb-1">x\${orderProduct.quantity}</span>
			  <span class="px-1 text-xs border border-primary w-fit text-primary">Bảo hành 1 năm</span>
			</div>
			<div class="flex flex-col items-end justify-center gap-3 text-primary">
			  \${orderProduct.price.toLocaleString()}₫ 
			  \${(order.status === "COMPLETE" && !orderProduct.isRated) ? '<button onclick="renderRatingForm(\'' + JSON.parse(product.images)[0] + '\', \'' + product.name + '\', \'' + product.id + '\')" class="px-6 py-2 text-white rounded-sm bg-primary hover:opacity-70">Đánh Giá</button>' : '<div class="px-6 py-2 bg-transparent border rounded-sm text-primary border-primary">Đã Đánh Giá</div>'}
			</div>
		  </div>
		`;
            }

            htmlOrders += htmlProducts;

            htmlOrders += `
		  <hr />
		  <div class="flex pt-6">
			<div class="flex items-center flex-1 text-base text-slate-400"><span class="mr-2 font-medium text-primary">Ngày đặt hàng: </span>\${formatDate(order.date)}</div>
			<div class="flex flex-col items-end justify-end gap-2">
			  <div class="flex items-center gap-2">
				<span class="">Thành tiền:</span>
				<span class="text-2xl text-primary">\${order.totalMoney.toLocaleString()}₫</span>
			  </div>
			  <div>
				\${order.status === "PROCESSING" ? '<button onclick="cancelOrder(\${order.id})" class="px-12 py-2 border border-black rounded-sm bg-primary hover:opacity-70">Hủy Đơn</button>' : ""}
				\${order.status === "DELIVERING" ? '<button onclick="completeOrder(\${order.id})" class="px-12 py-2 border border-black rounded-sm bg-primary hover:opacity-70">Đã Nhận Hàng</button>' : ""}
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	  `;
        }

        const ordersContainer = document.getElementById("ordersContainer");
        ordersContainer.innerHTML = ordersContainer.innerHTML + htmlOrders;
    };


    const renderViewMoreOrdersBtn = () => {
        const viewMoreOrdersBtn = document.getElementById("viewMoreOrdersBtn");
        if (viewMoreOrdersBtn) {
            viewMoreOrdersBtn.parentNode.removeChild(viewMoreOrdersBtn);
        }

        if (hideOrdersCount > 0) {
            const viewMoreOrdersBtn = document.createElement("div");
            viewMoreOrdersBtn.setAttribute("id", "viewMoreOrdersBtn");
            viewMoreOrdersBtn.className = "py-2 px-4 rounded-md bg-primary w-fit mt-8 cursor-pointer mx-auto hover:opacity-80 select-none";
            viewMoreOrdersBtn.innerHTML = `Xem thêm <span class="font-semibold">\${hideOrdersCount}</span> đơn hàng`;
            viewMoreOrdersBtn.onclick = fetchMoreOrders;
            document.getElementById("ordersContainer").appendChild(viewMoreOrdersBtn);

        }
    };

    const removeViewMoreOrdersBtn = () => {
        const viewMoreOrdersBtn = document.getElementById("viewMoreOrdersBtn");
        if (viewMoreOrdersBtn) {
            viewMoreOrdersBtn.parentNode.removeChild(viewMoreOrdersBtn);
        }
    };

    const renderLoader = () => {
        const loader = document.createElement("div");
        loader.setAttribute("id", "loader");
        loader.className = "loader ease-linear rounded-full border-t-8 border-b-8 border-primary h-20 w-20 animate-spin mt-6 mx-auto";
        document.getElementById("ordersContainer").appendChild(loader);
    };

    const removeLoader = () => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.parentNode.removeChild(loader);
        }
    };


    const fetchMoreOrders = async () => {

        removeViewMoreOrdersBtn();
        renderLoader();

        currentPage++;
        const currentUrl = window.location.href;
        const separator = currentUrl.indexOf('?') !== -1 ? '&' : '?';
        const newUrl = currentUrl + separator + 'page=' + currentPage;

        const {orders} = await fetch(newUrl)
            .then((response) => {
                // Check if the response was successful
                if (response.ok) {
                    // Parse the response data
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            });

        renderMoreOrders(orders);
        removeLoader();
        hideOrdersCount -= 5;
        renderViewMoreOrdersBtn();

    };


    renderViewMoreOrdersBtn();
</script>

<script>

    const cancelOrder = (orderId) => {
        const url = 'http://localhost:8080/store/orders'; // Server endpoint URL

        const payload = {
            orderId: orderId,
            typeUpdate: 'CANCELLED'
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                window.location.href = "http://localhost:8080/store/orders?filter_by=CANCELLED";
            })
            .catch(error => {
                // Handle any errors
            });
    };
    const completeOrder = (orderId) => {
        const url = 'http://localhost:8080/store/orders'; // Server endpoint URL

        const payload = {
            orderId: orderId,
            typeUpdate: 'COMPLETE'
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                window.location.href = "http://localhost:8080/store/orders?filter_by=COMPLETE";
            })
            .catch(error => {
                // Handle any errors
            });
    };
    //    for (let i = 0; i < 1000; ++i)
    //    {
    //        completeOrder(i + 1);
    //    }

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

    // Set the 'selected' class to the default tab (Tất cả

    // Get the current URL
    const url = window.location.href;
    // Create a new URLSearchParams object by passing the URL's query string
    const searchParams = new URLSearchParams(new URL(url).search);
    // Get the value of the 'filter_by' parameter
    const filterByValue = searchParams.get('filter_by');
    console.log(filterByValue); // Output: The value of 'filter_by' parameter from the current URL

    const filterByToTab = {
        PROCESSING: 'tab2',
        DELIVERING: 'tab3',
        COMPLETE: 'tab4',
        CANCELLED: 'tab5'
    };
    const defaultTab = document.getElementById(filterByValue ? filterByToTab[filterByValue] : 'tab1');
    defaultTab.classList.add('selected');
    // Attach click event listeners to each tab
    tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
    const renderRatingForm = (image, name, productId) => {
        // Create a new div element
        const div = document.createElement("div");
        div.id = "ratingForm";
        div.className = "fixed inset-0 flex justify-center items-center z-[999] bg-black/50";
        // Set the inner HTML of the div
        div.innerHTML = `
  <form action="http://localhost:8080/store/rate" method="POST" class="flex flex-col w-11/12 max-w-2xl p-6 bg-dvt-black-2 rounded-xl">
	<input type="hidden" name="productId" value="\${productId}">
	<h1 class="text-xl font-semibold">Đánh giá sản phẩm</h1>
	<div>
	  <div class="flex my-4">
		<img class="h-20 aspect-square rounded-xl" src="\${image}" alt="sản phẩm" />
		<div class="ml-4 w-[100%]">
		  \${name}
		</div>
	  </div>
	</div>
	<div class="flex items-center gap-4 mb-4" id="rating-form">
	  <div class="text-sm">
		Chất lượng sản phẩm:
	  </div>
	  <div class="flex flex-row-reverse items-center justify-center gap-2 rating ">
		<input class="hidden" type="radio" name="rateValue" id="rate-5" value="5" checked>
		<label class="cursor-pointer" for="rate-5"><img class="h-8 aspect-square" src="./assets/start.png"></label>
		<input class="hidden" type="radio" name="rateValue" id="rate-4" value="4">
		<label class="cursor-pointer" for="rate-4"><img class="h-8 aspect-square" src="./assets/start.png"></label>
		<input class="hidden" type="radio" name="rateValue" id="rate-3" value="3">
		<label class="cursor-pointer" for="rate-3"><img class="h-8 aspect-square" src="./assets/start.png"></label>
		<input class="hidden" type="radio" name="rateValue" id="rate-2" value="2">
		<label class="cursor-pointer" for="rate-2"><img class="h-8 aspect-square" src="./assets/start.png"></label>
		<input class="hidden" type="radio" name="rateValue" id="rate-1" value="1">
		<label class="cursor-pointer" for="rate-1"><img class="h-8 aspect-square" src="./assets/start.png"></label>
	  </div>
	  <p class="text-center" id="rating-text">Yêu Thích</p>
	</div>
	<textarea name="rateContent" class="p-4 text-lg text-white bg-transparent border rounded-md border-slate-200" rows="7" placeholder="Nhận xét..."></textarea>
	<div class="flex justify-end mt-4">
	  <div onclick="removeRatingForm()" class="px-6 py-2 mr-4 text-xl border-2 rounded-md cursor-pointer border-primary text-primary hover:opacity-70">Trở về</div>
	  <button class="px-6 py-2 text-xl rounded-md bg-primary hover:opacity-70" type="submit">Hoàn thành</button>
	</div>
  </form>
`;

        // Get the <body> element
        const body = document.getElementsByTagName("body")[0];
        // Insert the new div element at the beginning of the <body> tag
        body.insertBefore(div, body.firstChild);
        const ratingInputs = document.querySelectorAll('input[name="rateValue"]');
        const ratingImages = document.querySelectorAll('input[name="rateValue"] + label img');
        const ratingText = document.getElementById('rating-text');
        ratingInputs.forEach((input, index) => {


            input.addEventListener('change', () => {
                const selectedRating = index + 1;
                ratingImages.forEach((image, imageIndex) => {
                    if (imageIndex >= index) {
                        image.src = "./assets/start.png";
                    } else {
                        image.src = "./assets/no-start.png";
                    }
                });
                displayRatingText(selectedRating);
            });
        });

        function displayRatingText(rating) {
            let text = '';
            switch (rating) {
                case 5:
                    text = 'Thất vọng';
                    break;
                case 4:
                    text = "Chưa tốt";
                    break;
                case 3:
                    text = 'Tạm ổn';
                    break;
                case 2:
                    text = 'Tốt';
                    break;
                case 1:
                    text = 'Yêu thích';
                    break;
                default:
                    text = '';
                    break;
            }
            ratingText.textContent = text;
        }

    };
    const removeRatingForm = () => {
        const ratingForm = document.getElementById("ratingForm");
        if (ratingForm) {
            ratingForm.parentNode.removeChild(ratingForm);
        }
    };


</script>

<jsp:include page="./footer.jsp"/>


