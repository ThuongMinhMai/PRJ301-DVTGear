<%-- 
    Document   : search
    Created on : Jun 13, 2023, 7:17:05 AM
    Author     : Kingc
--%>

<%@page import="utils.Utils"%>
<%@page import="entity.Product"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:include page="./header.jsp" />



<div class="relative pb-16 mt-32 w-11/12 max-w-7xl mx-auto">

    <div class="flex justify-center">
        <h2 class="text-2xl mx-2 font-medium mt-5">Sắp xếp theo: </h2>
        <div class="sort-icon cursor-pointer" onclick="filterProductsBy('name')">
            <div class="sortName flex items-center bg-dvt-black-2 justify-center w-14 h-14 m-2 rounded-full hover:bg-primary"><i class="fa-solid fa-arrow-up-a-z fa-2x"></i></div>
            <p class="name bg-primary text-white text-center rounded-xl opacity-0">Từ A-Z</p>
        </div>
        <div class="sort-icon cursor-pointer" onclick="filterProductsBy('nameDesc')">
            <div class="sortNameDesc flex items-center bg-dvt-black-2 justify-center w-14 h-14 m-2 rounded-full hover:bg-primary"><i class="fa-solid fa-arrow-down-z-a fa-2x"></i></div>
            <p class="name bg-primary text-white text-center rounded-xl opacity-0">Từ Z-A</p>
        </div>
        <div class="sort-icon cursor-pointer" onclick="filterProductsBy('')">
            <div class="sortNewest flex items-center bg-dvt-black-2 justify-center w-14 h-14 m-2 rounded-full hover:bg-primary"><i class="fa-solid fa-calendar-days fa-2x"></i></div>
            <p class="name bg-primary text-white text-center rounded-xl opacity-0">Mới nhất</p>
        </div>
        <div class="sort-icon cursor-pointer" onclick="filterProductsBy('price')">
            <div class="sortPrice flex items-center bg-dvt-black-2 justify-center w-14 h-14 m-2 rounded-full hover:bg-primary"><i class="fa-solid fa-arrow-trend-up fa-2x"></i></div>
            <p class="name bg-primary text-white text-center rounded-xl opacity-0">Giá tăng</p>
        </div>
        <div class="sort-icon cursor-pointer" onclick="filterProductsBy('priceDesc')">
            <div class="sortPriceDesc flex items-center bg-dvt-black-2 justify-center w-14 h-14 m-2 rounded-full hover:bg-primary"><i class="fa-solid fa-arrow-trend-down fa-2x"></i></div>
            <p class="name bg-primary text-white text-center rounded-xl opacity-0">Giá giảm</p>
        </div>

    </div>



    <%
        List<Product> productList = (List<Product>) request.getAttribute("productList");

        if (productList.size() == 0) { %>

    <div class="w-full flex flex-col justify-center gap-3 items-center relative bg-dvt-black-2 rounded-md py-12">
        <img src="./assets/robot2.png" alt="robot2" class="h-64"/>
        <div class="font-bold text-3xl">Không tìm thấy sản phẩm nào!</div>
    </div>

    <%}%>


    <div
        class="relative justify-center grid grid-cols-12 gap-5 w-11/12 max-w-7xl mx-auto"
        >
        <%

            for (Product product : productList) {
        %>
        <div
            class="bg-dvt-black-2 flex flex-col rounded-3xl overflow-hidden h-fit cursor-pointer col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
            >
            <div href="/store/products?id=<%= product.getId()%>"
                 class="w-full overflow-hidden relative aspect-square"
                 >
                <% String imageUrl = Utils.parseJSONStringArray(product.getImages()).get(0);%>
                <img
                    class="w-full h-full object-cover bt-[20px] transition duration-300 ease-linear hover:scale-125"
                    src="<%=imageUrl%>"
                    alt="product"
                    />
                <div
                    class="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-tl-2xl py-3 px-5 text-2xl"
                    >
                    <%= Utils.formatNum(product.getPrice())%>₫
                </div>
            </div>
            <div class="px-5 py-0 my-2 mx-0 name_product">
                <span class="font-bold line-clamp-2">
                    <%= product.getName()%>
                </span>
            </div>
            <!--            <div class="info_product">
                            <span 
                                class="h-16 py-0 px-5 text-xs line-clamp-4"
                                ><%= product.getDescription()%>
                            </span>
                        </div>-->
            <div
                onclick="addToCart(<%= product.getId()%>, 1)"
                class="mt-4 mx-auto px-4 py-2 rounded-[30px] bg-primary border-none uppercase cursor-pointer mb-4 hover:opacity-80"
                >
                Thêm vào giỏ hàng
            </div>
        </div>
        <%
            }
        %>

    </div>
</div>

<script>

    const styleSelectedSort = () => {
        const currentUrl = window.location.href;

// Create a URL object
        const url = new URL(currentUrl);

// Get the value of the filterBy parameter
        const filterByValue = url.searchParams.get("filterBy");

        const sortTypeToSortName = {
            name: "sortName",
            nameDesc: "sortNameDesc",
            price: "sortPrice",
            priceDesc: "sortPriceDesc"
        };

        const sortName = filterByValue ? sortTypeToSortName[filterByValue] : "sortNewest";

        const icon = document.querySelector('.sort-icon div.' + sortName);

        icon.classList.add("selected");
    };

    styleSelectedSort();

    const filterProductsBy = (filterBy) =>
    {
        // Get the current URL
        const currentUrl = window.location.href;



// Create a URL object
        const url = new URL(currentUrl);

// Set the new filterBy value in the URL object
        url.searchParams.set("filterBy", filterBy);

// Get the modified URL from the URL object
        const modifiedUrl = url.href;

// Change the location to the modified URL
        window.location.href = modifiedUrl;
    };

</script>

<jsp:include page="./footer.jsp" />