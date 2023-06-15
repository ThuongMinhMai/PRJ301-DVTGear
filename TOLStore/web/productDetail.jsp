<%@page import="java.util.List"%> <%@page import="utils.Utils"%>
<%@page import="entity.Product"%> <%@page contentType="text/html" pageEncoding="UTF-8"%>

<jsp:include page="./header.jsp" />

<style>
    #favouriteBtn:hover #favouriteMessage{
        opacity:1;
    }

    svg {
        margin-bottom: 2em;
    }

    .rating__background {
        fill: gray;
        stroke: red;
        stroke-width: 1;
        height: 100%;
        width: 100%;
    }

    .rating__value {
        fill: #ea1c00;
        height: 100%;
    }
</style>

<% Product product = (Product) request.getAttribute("product");%> <% List<String> imageUrlList = Utils.parseJSONStringArray(product.getImages());%>

<div
    class="grid grid-cols-12 gap-6 mt-32 max-w-6xl mx-auto rounded-md text-white bg-dvt-black-2 p-6"
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

    <div class="flex gap-4 col-span-12 lg:col-span-7 ">

        <div class="flex flex-col flex-1">

            <div class="mb-3 text-slate-300"><span class="text-primary">Danh Mục:</span> <%= product.getCategory().getName()%></div>

            <div class="title">

                <h2 class="capitalize font-medium text-3xl line-clamp-2">
                    <%= product.getName()%>
                </h2>
            </div>



            <div class="flex items-center gap-2">

                <div class="text-primary text-lg border-b border-primary">3.7</div>

                <svg viewBox="0 0 1000 200" class='rating my-4 h-4'>
                <defs>

                <polygon id="star" points="100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 "/>

                <clipPath id="stars">
                    <use xlink:href="#star"/>
                    <use xlink:href="#star" x="20%"/>
                    <use xlink:href="#star" x="40%"/>
                    <use xlink:href="#star" x="60%"/>
                    <use xlink:href="#star" x="80%"/>
                </clipPath>

                </defs>

                <rect class='rating__background' clip-path="url(#stars)"></rect>

                <!-- Change the width of this rect to change the rating -->
                <rect width="72%" class='rating__value' clip-path="url(#stars)"></rect>

                </svg>

                <div class="h-[60%] w-[1px] bg-slate-500 mx-1"></div>

                <div class="text-slate-300 mr-2"><span class="text-lg border-b border-slate-300">5</span> Đánh Giá</div>

                <div class="h-[60%] w-[1px] bg-slate-500 mx-1"></div>

                <%if (product.getStorage() > 0) {%>

                <div class="rounded-xl bg-success py-1 px-2 text-white w-fit my-4 text-sm font-semibold">Còn hàng</div>

                <%} else {%>

                <div class="rounded-xl bg-danger py-1 px-2 text-white w-fit my-4 text-sm font-semibold">Hết hàng</div>

                <%  }%>
            </div>






            <div class="price">
                <p class="text-2xl font-medium text-primary">
                    <%= Utils.formatNum(product.getPrice())%>₫
                </p>
            </div>








            <div class="order flex flex-col mt-4">
                <div class="flex items-center gap-4 mb-4">
                    <div
                        class="quantity-display flex justify-start h-fit text-xl font-bold"
                        >
                        <button
                            id="decrement"
                            class="bg-inherit text-white py-2 px-4 border border-primary rounded-l-md hover:bg-primary"
                            >
                            -
                        </button>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            class="text-center text-white border border-primary outline-none py-2 w-16 bg-inherit"
                            max= <%= product.getStorage()%>
                            />
                        <button
                            id="increment"
                            class="bg-inherit text-white py-2 px-4 border border-primary rounded-r-md hover:bg-primary"
                            >
                            +
                        </button>
                    </div>
                    <div class="text-lg font-medium"><%= product.getStorage()%> sản phẩm có sẵn</div>
                </div>

                <div class="flex items-stretch gap-4">
                    <div
                        id="addToCartBtn"
                        class="py-3 px-5 rounded-lg text-primary text-lg border border-primary hover:opacity-70 cursor-pointer"
                        >
                        <i class="fa fa-shopping-cart"></i>
                        Thêm vào giỏ hàng
                    </div>
                    <button
                        id="buyNowBtn"
                        class="bg-primary py-3 px-5 rounded-lg text-white text-lg hover:opacity-70 cursor-pointer"
                        >
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>


        <div>


            <% boolean isFavorite = (boolean) request.getAttribute("isFavorite");

                if (isFavorite) {%>

            <form action="http://localhost:8080/store/favorite" method="POST" id="favouriteBtn" class="p-3 rounded-full bg-dvt-black-1 w-fit ml-auto cursor-pointer relative">
                <input type="hidden" name="productId" value="<%= product.getId()%>"/>
                <input type="hidden" name="action" value="remove"/>
                <label class="cursor-pointer">
                    <img src="./assets/heart.png" alt="no-favourite"  class="w-6 h-6"/>
                    <input type="submit" class="hidden" />
                    <div id="favouriteMessage" class="opacity-0 z-40 absolute bg-dvt-black-1 py-1 px-2 rounded-md text-sm left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap">Bỏ Yêu Thích</div>
                </label>
            </form>

            <%} else {%>

            <form action="http://localhost:8080/store/favorite" method="POST" id="favouriteBtn" class="p-3 rounded-full bg-dvt-black-1 w-fit ml-auto cursor-pointer relative">
                <input type="hidden" name="productId" value="<%= product.getId()%>"/>
                <input type="hidden" name="action" value="add"/>
                <label class="cursor-pointer">
                    <img src="./assets/no-heart.png" alt="no-favourite"  class="w-6 h-6"/>
                    <input type="submit" class="hidden" />
                    <div id="favouriteMessage" class="opacity-0 z-40 absolute bg-dvt-black-1 py-1 px-2 rounded-md text-sm left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap">Yêu Thích</div>
                </label>
            </form>

            <%  }%>

        </div>
    </div>
</div>

<div
    id="contentDescription"
    class="mx-auto max-w-6xl w-11/12 text-white bg-dvt-black-2 rounded-md p-8 mt-8"
    >
    <%= product.getDescription()%>
</div>


<div class="flex items-center w-11/12 max-w-6xl mx-auto py-12 relative">

    <div class="grow border-t-[3px] border-white"></div>

    <p class="px-5 py-0 text-2xl font-bold uppercase text-white">
        Các sản phẩm cùng loại
    </p>

    <div class="grow border-t-[3px] border-white"></div>
</div>

<%
    List<Product> sameProductList = (List<Product>) request.getAttribute("sameProductList");

    if (sameProductList.size() == 0) { %>




<div class="flex flex-col justify-center gap-3 items-center relative bg-dvt-black-2 rounded-md py-12 mb-8 mx-auto max-w-6xl w-11/12">
    <img src="./assets/robot2.png" alt="robot2" class="h-64"/>
    <div class="font-bold text-3xl">Không tìm thấy sản phẩm nào!</div>
</div>

<%}%>


<div
    class="relative justify-center grid grid-cols-12 gap-5 mx-auto max-w-6xl w-11/12 mb-8"
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


    const ratingContainer = document.querySelector('.rating-container');
    const stars = ratingContainer.querySelectorAll('.star');

    function setRating(rating) {
        const filledStars = Math.floor(rating);
        const decimalPart = rating - filledStars;

        stars.forEach((star, index) => {
            star.classList.remove('filled');

            if (index < filledStars) {
                star.classList.add('filled');
            } else if (index === filledStars) {
                star.style.background = 'linear-gradient(to right, gold ' + (decimalPart * 100) + '%, gray ' + (decimalPart * 100) + '%)';
            } else {
                star.classList.add('no-filled');
            }

        });
    }

// Example usage
    setRating(3.7); // Sets the rating to 3.5 stars






</script>

<jsp:include page="./footer.jsp" />
