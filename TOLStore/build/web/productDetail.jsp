<%@page import="java.util.List"%> <%@page import="utils.Utils"%>
<%@page import="entity.Product"%> <%@page contentType="text/html" pageEncoding="UTF-8"%>

<jsp:include page="./header.jsp" />

<% Product product = (Product) request.getAttribute("product");%> <% List<String> imageUrlList = Utils.parseJSONStringArray(product.getImages());%>

<div
    class="grid grid-cols-12 gap-6 mt-32 max-w-7xl mx-auto rounded-md text-white bg-dvt-black-2 p-6"
    >
    <div class="image flex flex-col gap-1 col-span-12 lg:col-span-5">
        <div class="main-image w-full aspect-square">
            <img
                class="w-full h-full object-cover rounded-md"
                src="<%=imageUrlList.get(0)%>"
                />
        </div>
        <div class="hower-image grid grid-cols-5 gap-2 mt-2">
            <% for (String imageUrl : imageUrlList) {%>

            <div
                class="hover:border-primary hover:border-2 col-span-1 aspect-square rounded-md cursor-pointer"
                >
                <img
                    class="w-full object-fill h-full rounded-md"
                    src="<%=imageUrl%>"
                    />
            </div>
            <% }%>
        </div>
    </div>

    <div class="detail flex flex-col gap-4 col-span-12 lg:col-span-7 p-6">
        <div class="title">
            <h2 class="capitalize font-bold text-5xl line-clamp-3">
                <%= product.getName()%>
            </h2>
        </div>
        <div class="price">
            <p class="text-3xl font-medium text-primary">
                <%= Utils.formatNum(product.getPrice())%>₫
            </p>
        </div>

        <div class="order flex flex-col">
            <div class="flex items-center mb-6 gap-4">
                <div
                    class="quantity-display flex justify-start h-fit text-xl font-bold"
                    >
                    <button
                        id="decrement"
                        class="bg-inherit text-white py-2 px-4 border border-primary rounded-l-2xl hover:bg-primary"
                        >
                        -
                    </button>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        max= <%= product.getStorage()%>
                        class="text-center text-white border border-primary outline-none py-2 w-16 bg-inherit"
                        />
                        <button
                        id="increment"
                        class="bg-inherit text-white py-1 px-4 border border-primary rounded-r-2xl hover:bg-primary"
                        >
                        +
                    </button>
                </div>
                <div class="text-lg font-medium"><%= product.getStorage()%> sản phẩm có sẵn</div>
            </div>
            <div class="flex items-stretch gap-4">
                <div
                    id="addToCartBtn"
                    class="py-4 px-6 rounded-lg text-primary text-xl border border-primary hover:opacity-70 cursor-pointer"
                    >
                    <i class="fa fa-shopping-cart"></i>
                    Thêm vào giỏ hàng
                </div>
                <button
                    id="buyNowBtn"
                    class="bg-primary py-4 px-6 rounded-lg text-white text-xl hover:opacity-70 cursor-pointer"
                    >
                    Mua ngay
                </button>
            </div>
        </div>
    </div>
</div>

<div
    id="contentDescription"
    class="mx-auto max-w-7xl w-11/12 text-white bg-dvt-black-2 rounded-md p-8 mt-8"
    >
    <%= product.getDescription()%>
</div>


<div class="flex items-center w-11/12 max-w-7xl mx-auto py-12 relative">

    <div class="grow border-t-[3px] border-white"></div>

    <p class="px-5 py-0 text-2xl font-bold uppercase text-white">
        Các sản phẩm cùng loại
    </p>

    <div class="grow border-t-[3px] border-white"></div>
</div>

<%
    List<Product> sameProductList = (List<Product>) request.getAttribute("sameProductList");

    if (sameProductList.size() == 0) { %>




<div class="flex flex-col justify-center gap-3 items-center relative bg-dvt-black-2 rounded-md py-12 mb-8 mx-auto max-w-7xl w-11/12">
    <img src="./assets/robot2.png" alt="robot2" class="h-64"/>
    <div class="font-bold text-3xl">Không tìm thấy sản phẩm nào!</div>
</div>

<%}%>


<div
    class="relative justify-center grid grid-cols-12 gap-5 mx-auto max-w-7xl w-11/12 mb-8"
    >



    <%

        for (Product sameProduct : sameProductList) {
    %>
    <div
        class="bg-dvt-black-2 flex flex-col rounded-3xl overflow-hidden cursor-pointer col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
        >
        <a href="/store/products?id=<%= sameProduct.getId()%>"
           class="w-full overflow-hidden relative aspect-square"
           >
            <% String imageUrl = Utils.parseJSONStringArray(sameProduct.getImages()).get(0);%>
            <img
                class="w-full h-full object-cover bt-[20px] transition duration-300 ease-linear hover:scale-125"
                src="<%=imageUrl%>"
                alt="product"
                />
            <div
                class="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-tl-2xl py-3 px-5 text-2xl"
                >
                <%= Utils.formatNum(sameProduct.getPrice())%>₫
            </div>
        </a>
        <div class="px-5 py-0 my-2 mx-0 name_product">
            <span class="font-bold line-clamp-2">
                <%= sameProduct.getName()%>
            </span>
        </div>

        <div
            onclick="addToCart(<%= sameProduct.getId()%>, 1,<%= product.getStorage()%>)"
            class="mt-auto mx-auto px-4 py-2 rounded-[30px] bg-primary border-none uppercase cursor-pointer mb-4 hover:opacity-80"
            >
            Thêm vào giỏ hàng
        </div>
    </div>
    <%
        }
    %>

</div>

<script>
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

    const decrementButton = document.getElementById("decrement");
    const incrementButton = document.getElementById("increment");
    const quantityInput = document.getElementById("quantity");

    quantityInput.value = 1;

    decrementButton.addEventListener("click", function () {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            console.log(quantityInput.value);
        }
    });

    incrementButton.addEventListener("click", function () {
        if (parseInt(quantityInput.value) < <%= product.getStorage()%>) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            console.log(quantityInput.value);
        }
    });

    quantityInput.addEventListener("change", function (e) {
        if (e.target.value > <%= product.getStorage()%>) {
            quantityInput.value = <%= product.getStorage()%>;
        }
        if (e.target.value < 1) {
            quantityInput.value = 1;
        }
    });

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const productId = searchParams.get("id");

    console.log(productId);

    const addToCartBtn = document.getElementById("addToCartBtn");
    addToCartBtn.addEventListener("click", () => {
        addToCart(productId, Number(quantityInput.value),<%= product.getStorage()%>);
        handleDisplayToost();
    });

    const buyNowBtn = document.getElementById("buyNowBtn");
    buyNowBtn.addEventListener("click", () => {
        addToCart(productId, Number(quantityInput.value),<%= product.getStorage()%>);
        window.location.href = "http://localhost:8080/store/cart";
    });
</script>

<jsp:include page="./footer.jsp" />
</String>
