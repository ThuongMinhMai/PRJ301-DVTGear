<%-- 
    Document   : search
    Created on : Jun 13, 2023, 7:17:05 AM
    Author     : Kingc
--%>

<%@page import="model.FetchResult" %>
<%@page import="utils.Utils" %>
<%@page import="model.Product" %>
<%@page import="java.util.List" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<jsp:include page="./header.jsp"/>


<div id="searchPage" class="relative pb-16 mt-32 w-11/12 max-w-6xl mx-auto">

  <div class="flex justify-center">
    <h2 class="text-2xl mx-2 font-medium mt-5">Sắp xếp theo: </h2>
    <div class="sort-icon cursor-pointer" onclick="sortProductsBy('name')">
      <div class="sortName flex items-center bg-dvt-black-2 justify-center w-14 h-14 m-2 rounded-full hover:bg-primary">
        <i class="fa-solid fa-arrow-up-a-z fa-2x"></i></div>
      <p class="name bg-primary text-white text-center rounded-xl opacity-0">Từ A-Z</p>
    </div>
    <div class="sort-icon cursor-pointer" onclick="sortProductsBy('nameDesc')">
      <div
          class="sortNameDesc flex items-center bg-dvt-black-2 justify-center w-14 h-14 m-2 rounded-full hover:bg-primary">
        <i class="fa-solid fa-arrow-down-z-a fa-2x"></i></div>
      <p class="name bg-primary text-white text-center rounded-xl opacity-0">Từ Z-A</p>
    </div>
    <div class="sort-icon cursor-pointer" onclick="sortProductsBy('')">
      <div
          class="sortNewest flex items-center bg-dvt-black-2 justify-center w-14 h-14 m-2 rounded-full hover:bg-primary">
        <i class="fa-solid fa-calendar-days fa-2x"></i></div>
      <p class="name bg-primary text-white text-center rounded-xl opacity-0">Mới nhất</p>
    </div>
    <div class="sort-icon cursor-pointer" onclick="sortProductsBy('price')">
      <div
          class="sortPrice flex items-center bg-dvt-black-2 justify-center w-14 h-14 m-2 rounded-full hover:bg-primary">
        <i class="fa-solid fa-arrow-trend-up fa-2x"></i></div>
      <p class="name bg-primary text-white text-center rounded-xl opacity-0">Giá tăng</p>
    </div>
    <div class="sort-icon cursor-pointer" onclick="sortProductsBy('priceDesc')">
      <div
          class="sortPriceDesc flex items-center bg-dvt-black-2 justify-center w-14 h-14 m-2 rounded-full hover:bg-primary">
        <i class="fa-solid fa-arrow-trend-down fa-2x"></i></div>
      <p class="name bg-primary text-white text-center rounded-xl opacity-0">Giá giảm</p>
    </div>

  </div>


  <%
    List<Product> productList = (List<Product>) request.getAttribute("productList");
    int totalProducts = (int) request.getAttribute("itemsCount");
    if (productList.size() == 0) { %>

  <div class="w-full flex flex-col justify-center gap-3 items-center relative bg-dvt-black-2 rounded-md py-12">
    <img src="./assets/robot2.png" alt="robot2" class="h-64"/>
    <div class="font-bold text-3xl">Không tìm thấy sản phẩm nào!</div>
  </div>

  <%}%>


  <div
      id="productsContainer"
      class="relative justify-center grid grid-cols-12 gap-5"
  >
    <%

      for (Product product : productList) {
    %>
    <div
        class="bg-dvt-black-2 flex flex-col rounded-3xl overflow-hidden cursor-pointer col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
    >
      <a href="/store/products?id=<%= product.getId()%>"
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
      </a>
      <div class="px-5 py-0 my-2 mx-0 name_product">
                <span class="font-bold line-clamp-2">
                    <%= product.getName()%>
                </span>
      </div>

      <div
          onclick="addToCart(<%= product.getId()%>, 1,<%= product.getStorage()%>)"
          class="mt-auto mx-auto px-4 py-2 rounded-[30px] bg-primary border-none uppercase cursor-pointer mb-4 hover:opacity-80"
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
    let hideProductsCount = <%= totalProducts%> -12;//12 is products per page
    let currentPage = 1;

    const renderMoreProducts = (products) => {
        let html = "";

        for (const product of products) {
            html += `
            <div class="bg-dvt-black-2 flex flex-col rounded-3xl overflow-hidden cursor-pointer col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <a href="/store/products?id=\${product.id}" class="w-full overflow-hidden relative aspect-square">
                    <img class="w-full h-full object-cover bt-[20px] transition duration-300 ease-linear hover:scale-125" src="\${JSON.parse(product.images)[0]}" alt="product">
                    <div class="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-tl-2xl py-3 px-5 text-2xl">
                        \${product.price.toLocaleString()}₫
                    </div>
                </a>
                <div class="px-5 py-0 my-2 mx-0 name_product">
                    <span class="font-bold line-clamp-2">
                        \${product.name}
                    </span>
                </div>
                <div onclick="addToCart(\${product.id}, 1,\${product.storage})" class="mt-auto mx-auto px-4 py-2 rounded-[30px] bg-primary border-none uppercase cursor-pointer mb-4 hover:opacity-80">
                    Thêm vào giỏ hàng
                </div>
            </div>`;
        }

        const productsContainer = document.getElementById("productsContainer");
        productsContainer.innerHTML += html;
    };

    const renderViewMoreProductsBtn = () => {
        const viewMoreProductsBtn = document.getElementById("viewMoreProductsBtn");
        if (viewMoreProductsBtn) {
            viewMoreProductsBtn.parentNode.removeChild(viewMoreProductsBtn);
        }

        if (hideProductsCount > 0) {
            const viewMoreProductsBtn = document.createElement("div");
            viewMoreProductsBtn.setAttribute("id", "viewMoreProductsBtn");
            viewMoreProductsBtn.className = "py-2 px-4 rounded-md bg-primary w-fit mt-8 cursor-pointer mx-auto hover:opacity-80 select-none";
            viewMoreProductsBtn.innerHTML = `Xem thêm <span class="font-semibold">\${hideProductsCount}</span> sản phẩm`;
            viewMoreProductsBtn.onclick = fetchMoreProducts;
            document.getElementById("searchPage").appendChild(viewMoreProductsBtn);
        }
    };

    const removeViewMoreProductsBtn = () => {
        const viewMoreProductsBtn = document.getElementById("viewMoreProductsBtn");
        if (viewMoreProductsBtn) {
            viewMoreProductsBtn.parentNode.removeChild(viewMoreProductsBtn);
        }
    };

    const renderLoader = () => {
        const loader = document.createElement("div");
        loader.setAttribute("id", "loader");
        loader.className = "loader ease-linear rounded-full border-t-8 border-b-8 border-primary h-20 w-20 animate-spin mt-6 mx-auto";
        document.getElementById("searchPage").appendChild(loader);
    };

    const removeLoader = () => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.parentNode.removeChild(loader);
        }
    };

    const fetchMoreProducts = async () => {
        removeViewMoreProductsBtn();
        renderLoader();

        currentPage++;
        const currentUrl = window.location.href;
        const separator = currentUrl.indexOf('?') !== -1 ? '&' : '?';
        const newUrl = currentUrl + separator + 'page=' + currentPage;
        console.log(newUrl);

        const {products} = await fetch(newUrl)
            .then((response) => {
                // Check if the response was successful
                if (response.ok) {
                    // Parse the response data
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            });

        renderMoreProducts(products);
        removeLoader();
        hideProductsCount -= 12;
        renderViewMoreProductsBtn();
    };

    renderViewMoreProductsBtn();
</script>


<script>
    const styleSelectedSort = () => {
        const currentUrl = window.location.href;

        // Create a URL object
        const url = new URL(currentUrl);

        // Get the value of the sortBy parameter
        const sortByValue = url.searchParams.get("sortBy");

        const sortTypeToSortName = {
            name: "sortName",
            nameDesc: "sortNameDesc",
            price: "sortPrice",
            priceDesc: "sortPriceDesc"
        };

        const sortName = sortByValue ? sortTypeToSortName[sortByValue] : "sortNewest";

        const icon = document.querySelector('.sort-icon div.' + sortName);

        icon.classList.add("selected");
    };

    styleSelectedSort();

    const sortProductsBy = (sortBy) => {
        // Get the current URL
        const currentUrl = window.location.href;

        // Create a URL object
        const url = new URL(currentUrl);

        // Set the new sortBy value in the URL object
        url.searchParams.set("sortBy", sortBy);

        // Get the modified URL from the URL object
        const modifiedUrl = url.href;

        // Change the location to the modified URL
        window.location.href = modifiedUrl;
    };
</script>


<jsp:include page="./footer.jsp"/>