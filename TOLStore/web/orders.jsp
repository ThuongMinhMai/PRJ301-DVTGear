<%-- 
    Document   : orders
    Created on : Jun 10, 2023, 8:55:58 PM
    Author     : Kingc
--%>

<%@page import="utils.Utils"%>
<%@page import="entity.Product"%>
<%@page import="entity.Order"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>


<jsp:include page="./header.jsp" />

<div class="mx-auto max-w-7xl w-11/12 mt-32 mb-8">

    <div class="flex bg-dvt-black-2 mb-4 rounded-md">
        <a href="?" id="tab1" class="w-1/5 text-center text-lg cursor-pointer py-4 hover:text-primary tab">Tất cả</a>
        <a href="?filter_by=PROCESSING" id="tab2" class="w-1/5 text-center text-lg cursor-pointer py-4 hover:text-primary tab">Đang xử lí</a>
        <a href="?filter_by=DELIVERING" id="tab3" class="w-1/5 text-center text-lg cursor-pointer py-4 hover:text-primary tab">Đang giao</a>
        <a href="?filter_by=COMPLETE" id="tab4" class="w-1/5 text-center text-lg cursor-pointer py-4 hover:text-primary tab">Hoàn thành</a>
        <a href="?filter_by=CANCELLED" id="tab5" class="w-1/5 text-center text-lg cursor-pointer py-4 hover:text-primary tab">Đã hủy</a>
    </div>





    <%
        List<Order> orderList = (List<Order>) request.getAttribute("orderList");

        if (orderList.size() == 0) { %>
    <div class="flex flex-col justify-center items-center bg-dvt-black-2 rounded-md h-[500px]">
        <img class="h-24 w-24" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png" alt="no_order" />
        <div class="text-white font-medium text-2xl my-4">Chưa có đơn hàng nào</div>
    </div>
    <%}%>



    <%

        for (Order order : orderList) {
            List<Order.OrderProduct> orderProductList = order.getOrderProducts();
    %>

    <div class="bg-dvt-black-2 px-6 text-white rounded-md mb-4 py-6">
        <div class="flex justify-between">
            <span class="font-bold text-lg mb-3 text-primary"
                  >TOL STORE</span
            >
            <label id="status1" class="text-primary uppercase">
                <%= Order.Status.translateStatus(order.getStatus())%>
            </label>
        </div>
        <hr />
        <%
            for (Order.OrderProduct orderProduct : orderProductList) {
                Product product = orderProduct.getProduct();
        %>
        <div class="flex my-5">
            <a href="http://localhost:8080/store/products?id=<%= product.getId()%>" class="h-24 aspect-square">
                <img
                    class="object-fill"
                    src="<%= Utils.parseJSONStringArray(product.getImages()).get(0)%>"
                    alt="product"
                    />
            </a>
            <div class="flex flex-col ml-4 w-[100%]">
                <span class="pb-1 text-lg line-clamp-1"
                      ><%= product.getName()%></span
                >

                <span class="pb-1">x<%= orderProduct.getQuantity()%></span>
                <span class="border border-primary w-fit text-primary text-xs px-1"
                      >Bảo hành 1 năm</span
                >
            </div>
            <div class="flex text-primary flex-col justify-center">
                <%= Utils.formatNum(orderProduct.getPrice())%>₫
            </div>
        </div>
        <% }%>
        <hr />
        <div>
            <div class="flex items-center justify-end my-7 gap-2">
                <span class="">Thành tiền:</span>
                <span class="text-primary text-2xl"><%= Utils.formatNum(order.getTotalMoney())%>₫</span>
            </div>
            <div class="flex justify-between">
                <div class="opacity-50 text-xs"
                     >Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được giao
                    đến bạn và sản phẩm nhận được không có vấn đề nào.
                </div>
                <div>

                    <%
                        switch (order.getStatus()) {
                            case PROCESSING:%>
                    <button
                        onclick="cancelOrder(<%= order.getId()%>)"
                        class ="border-x-[1px] bg-primary border-y-[1px] border-black px-12 py-2 rounded-sm hover:opacity-70"
                        >
                        Hủy đơn
                    </button>
                    <%       break;
                        case DELIVERING:%>
                    <button
                        onclick="completeOrder(<%= order.getId()%>)"
                        class="border-x-[1px] bg-primary border-y-[1px] border-black px-12 py-2 rounded-sm hover:opacity-70"
                        >
                        Đã nhận hàng
                    </button>

                    <%
                                break;
                        }
                    %>


                </div>
            </div>
        </div>
    </div>

    <% }%>


</div>

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
                    location.reload();
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
                    location.reload();
                })
                .catch(error => {
                    // Handle any errors
                });
    };



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

</script>

<jsp:include page="./footer.jsp" />
