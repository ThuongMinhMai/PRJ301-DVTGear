<%@page import="org.json.JSONObject" %>
<%@page import="org.json.JSONArray" %>
<%@page import="java.text.DecimalFormat" %>
<%@page import="model.Rate" %>
<%@page import="java.util.List" %>
<%@page import="utils.Utils" %>
<%@page import="model.Product" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>

<jsp:include page="./header.jsp"/>

<style>
    #favouriteBtn:hover .favouriteMessage {
        opacity: 1;
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


    .tabRate.selected {
        border: 1px solid #ea1c00;
        color: #ea1c00
    }

    table {
        color: black;
        background: white;
    }

</style>

<% Product product = (Product) request.getAttribute("product");%> <% List<String> imageUrlList = Utils.parseJSONStringArray(product.getImages());%>

<div
        class="grid grid-cols-12 gap-6 mt-32 max-w-6xl w-11/12 mx-auto rounded-md text-white bg-dvt-black-2 p-6"
>
    <div class="image flex flex-col gap-1 col-span-12 lg:col-span-5">
        <div class="main-image w-full aspect-square">
            <img
                    alt="product"
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
                        alt="product"
                        class="w-full object-cover h-full rounded-md"
                        src="<%=imageUrl%>"
                />
            </div>
            <% }%>
        </div>
    </div>

    <div class="flex col-span-12 lg:col-span-7 gap-4">

        <div class="flex flex-col flex-1">
            <div class="flex items-center mb-3">
                <div class="text-slate-300">
                    <span class="text-primary">Danh Mục:</span>
                    <a class="hover:underline"
                       href="http://localhost:8080/store/search?category=<%= product.getCategory().getId()%>"><%= product.getCategory().getName()%>
                    </a></div>
                <div class="h-[80%] w-[1px] bg-slate-500 mx-2"></div>
                <div class="text-slate-300">
                    <span class="text-primary">Thương Hiệu:</span>
                    <a class="hover:underline"
                       href="http://localhost:8080/store/search?brand=<%= product.getBrand().getId()%>"><%= product.getBrand().getName()%>
                    </a></div>
            </div>
            <div class="title">
                <h2 class="capitalize font-medium text-3xl line-clamp-2">
                    <%= product.getName()%>
                </h2>
            </div>


            <%
                float sumRate = 0;
                List<Rate> rateList = (List<Rate>) request.getAttribute("rateList");
            %>

            <div class="flex items-center gap-2 mt-3">
                <%
                    String roundedRate = "0";
                    int sumRate1 = 0;
                    int sumRate2 = 0;
                    int sumRate3 = 0;
                    int sumRate4 = 0;
                    int sumRate5 = 0;
                %>
                <% if (rateList.size() == 0) { %>

                <a href="#rateSection" class="scroll text-slate-300"><span class="text-lg">Chưa Có Đánh Giá</span></a>

                <%} else {%>

                <% for (Rate rate : rateList) {
                    sumRate += rate.getValue();
                    switch (rate.getValue()) {
                        case 1:
                            sumRate1++;
                            break;
                        case 2:
                            sumRate2++;
                            break;
                        case 3:
                            sumRate3++;
                            break;
                        case 4:
                            sumRate4++;
                            break;
                        case 5:
                            sumRate5++;
                            break;
                    }
                }
                    float averageRate = sumRate / rateList.size();
                    DecimalFormat decimalFormat = new DecimalFormat("#.0");
                    roundedRate = decimalFormat.format(averageRate);
                %>

                <a href="#rateSection" class="scroll text-primary text-lg border-b border-primary">
                    <%=roundedRate%>
                </a>
                <a href="#rateSection" class="scroll">
                    <svg viewBox="0 0 1000 200" class='rating mb-0 h-4'>
                        <defs>

                            <polygon id="star"
                                     points="100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 "/>

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
                        <rect width="<%= Float.parseFloat(roundedRate) * 20%>%" class='rating__value'
                              clip-path="url(#stars)"></rect>

                    </svg>
                </a>

                <div class="h-[60%] w-[1px] bg-slate-500 mx-1"></div>
                <a href="#rateSection" class="text-slate-300 mr-2 scroll"><span
                        class="text-lg border-b border-slate-300"><%= rateList.size()%></span> Đánh Giá</a>

                <%}%>

                <div class="h-[60%] w-[1px] bg-slate-500 mx-1"></div>

                <div class="text-slate-300 mr-2 scroll"><span
                        class="text-lg border-b border-slate-300"><%= product.getSold()%></span> Đã Bán
                </div>
            </div>

            <div class="price my-5">
                <p class="text-3xl font-medium text-primary">
                    <%= Utils.formatNum(product.getPrice())%>₫
                </p>
            </div>


            <div class="order flex flex-col ">
                <div class="flex items-center gap-4 mb-5">
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
                                max=<%= product.getStorage()%>
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

            <form action="http://localhost:8080/store/favorite" method="POST" id="favouriteBtn"
                  class="p-3 rounded-full bg-dvt-black-1 w-fit ml-auto relative">
                <input type="hidden" name="productId" value="<%= product.getId()%>"/>
                <input type="hidden" name="action" value="remove"/>
                <label class="cursor-pointer">
                    <img src="./assets/heart.png" alt="no-favourite" class="w-6 h-6"/>
                    <input type="submit" class="hidden"/>
                    <span
                            class="favouriteMessage opacity-0 z-40 absolute bg-dvt-black-1 py-1 px-2 rounded-md text-sm left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap">
                        Bỏ Yêu Thích
                    </span>
                </label>
            </form>

            <%} else {%>

            <form action="http://localhost:8080/store/favorite" method="POST" id="favouriteBtn"
                  class="p-3 rounded-full bg-dvt-black-1 w-fit ml-auto relative">
                <input type="hidden" name="productId" value="<%= product.getId()%>"/>
                <input type="hidden" name="action" value="add"/>
                <label class="cursor-pointer">
                    <img src="./assets/no-heart.png" alt="no-favourite" class="w-6 h-6"/>
                    <input type="submit" class="hidden"/>
                    <span
                            class="favouriteMessage opacity-0 z-40 absolute bg-dvt-black-1 py-1 px-2 rounded-md text-sm left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap">
                        Yêu Thích
                    </span>
                </label>
            </form>

            <% }%>
        </div>

    </div>
</div>

<div class="mx-auto max-w-6xl w-11/12 bg-dvt-black-2 relative">

    <div
            id="contentDescription"
            class="text-white rounded-md p-6 mt-8"
    >
        <div class="uppercase text-xl font-medium">Mô tả sản phẩm</div>
        <%= product.getDescription()%>
    </div>

    <div id="blurDescription" class="absolute z-40 bottom-0 w-full h-32 bg-dvt-black-2 blur-3xl"></div>

    <div id=viewMoreButton onclick="viewMoreDescription()"
         class="flex justify-center text-primary items-center gap-4 relative z-50 text-red font-medium text-xl py-8 cursor-pointer">
        Đọc tiếp bài viết
        <ion-icon name="chevron-down-outline"></ion-icon>
    </div>
    <div id=viewLessButton onclick="viewLessDescription()"
         class="flex justify-center text-primary items-center gap-4 relative z-50 text-red font-medium text-xl py-8 cursor-pointer">
        Thu gọn bài viết
        <ion-icon name="chevron-up-outline"></ion-icon>
    </div>
</div>

<!--rating-->

<div id="rateSection" class=" text-white flex flex-col bg-dvt-black-2 mt-4 p-6 rounded-md mx-auto max-w-6xl w-11/12">


    <div class=" text-xl font-medium uppercase mb-2">
        Đánh giá sản phẩm
    </div>

    <div class="flex p-5 bg-primary/5 mt-1 my-4">
        <div class=" flex flex-col items-center">
            <div class="text-3xl text-primary mb-2">
                <%= roundedRate%> <span class="text-xl">trên 5</span>
            </div>
            <svg viewBox="0 0 1000 200" class='rating h-7 mb-0'>
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
                <rect width="<%= Float.parseFloat(roundedRate) * 20%>%" class='rating__value'
                      clip-path="url(#stars)"></rect>

            </svg>
        </div>
        <div class="flex flex-wrap ml-6 gap-2 h-fit">
            <button onclick="renderRateList(0)" id="tabRate0"
                    class="tabRate px-3 h-fit py-2 min-w-[6.25rem] border border-slate-600 rounded-sm hover:border-red-500">
                Tất cả (<%= rateList.size()%>)
            </button>
            <button onclick="renderRateList(5)" id="tabRate5"
                    class="tabRate px-3 h-fit py-2 min-w-[6.25rem] border border-slate-600 rounded-sm hover:border-red-500">
                5 Sao (<%= sumRate5%>)
            </button>
            <button onclick="renderRateList(4)" id="tabRate4"
                    class="tabRate px-3 h-fit py-2 min-w-[6.25rem] border border-slate-600 rounded-sm hover:border-red-500">
                4 Sao (<%= sumRate4%>)
            </button>
            <button onclick="renderRateList(3)" id="tabRate3"
                    class="tabRate px-3 h-fit py-2 min-w-[6.25rem] border border-slate-600 rounded-sm hover:border-red-500">
                3 Sao (<%= sumRate3%>)
            </button>
            <button onclick="renderRateList(2)" id="tabRate2"
                    class="tabRate px-3 h-fit py-2 min-w-[6.25rem] border border-slate-600 rounded-sm hover:border-red-500">
                2 Sao (<%= sumRate2%>)
            </button>
            <button onclick="renderRateList(1)" id="tabRate1"
                    class="tabRate px-3 h-fit py-2 min-w-[6.25rem] border border-slate-600 rounded-sm hover:border-red-500">
                1 Sao (<%= sumRate1%>)
            </button>

        </div>
    </div>


    <div id="rateListContainer" class="flex flex-col px-2 mt-2 gap-2 max-h-[800px] overflow-y-auto"></div>


</div>
<!--end rating-->


<div class="flex items-center w-11/12 max-w-6xl mx-auto py-12 relative">

    <div class="grow border-t-[3px] border-white"></div>

    <p class="px-5 py-0 text-2xl font-bold uppercase text-white">
        Các sản phẩm liên quan
    </p>

    <div class="grow border-t-[3px] border-white"></div>
</div>

<%
    List<Product> sameProductList = (List<Product>) request.getAttribute("sameProductList");

    if (sameProductList.size() == 0) { %>


<div
        class="flex flex-col justify-center gap-3 items-center relative bg-dvt-black-2 rounded-md py-12 mb-8 mx-auto max-w-6xl w-11/12">
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
                onclick="addToCart(<%= sameProduct.getId()%>, 1,<%= sameProduct.getStorage()%>)"
                class="mt-auto mx-auto px-4 py-2 rounded-[30px] bg-primary border-none uppercase cursor-pointer mb-4 hover:opacity-80"
        >
            Thêm vào giỏ hàng
        </div>
    </div>
    <%
        }
    %>

</div>

<%
    JSONArray jsRateList = new JSONArray();
    for (Rate rate : rateList) {
        JSONObject rateObject = new JSONObject();

        // Set properties of the Rate object
        rateObject.put("content", rate.getContent());
        rateObject.put("value", rate.getValue());
        rateObject.put("product", rate.getProduct());

        // Handle the Customer object
        if (rate.getCustomer() != null) {
            JSONObject customerObject = new JSONObject();
            customerObject.put("customerId", rate.getCustomer().getCustomerId());
            customerObject.put("username", rate.getCustomer().getUsername());
            customerObject.put("password", "");
            customerObject.put("avatarUrl", rate.getCustomer().getAvatarUrl());
            rateObject.put("customer", customerObject);
        }

        jsRateList.put(rateObject);
    }


%>

<script>
    // Add a click event listener to all elements with the 'scroll' class
    const scrollLinks = document.querySelectorAll('.scroll');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            const targetId = link.getAttribute('href'); // Get the target section's id
            const targetSection = document.querySelector(targetId); // Get the target section element

            if (targetSection) {
                // Scroll smoothly to the target section using the 'scrollIntoView' method
                targetSection.scrollIntoView({behavior: 'smooth'});
            }
        });
    });</script>

<script>
    const contentDescription = document.getElementById("contentDescription");
    const viewLessButton = document.getElementById("viewLessButton");
    const viewMoreButton = document.getElementById("viewMoreButton");
    const blurDescription = document.getElementById("blurDescription");
    const viewLessDescription = () => {
        blurDescription.classList.remove("hidden");
        viewMoreButton.classList.remove("hidden");
        viewLessButton.classList.add("hidden");
        contentDescription.classList.add("max-h-[500px]");
        contentDescription.classList.add("overflow-hidden");
    };
    viewLessDescription();
    const viewMoreDescription = () => {
        blurDescription.classList.add("hidden");
        viewMoreButton.classList.add("hidden");
        viewLessButton.classList.remove("hidden");
        contentDescription.classList.remove("max-h-[500px]");
        contentDescription.classList.remove("overflow-hidden");
    };</script>

<script>
    const jsRateList =
    <%=jsRateList.toString()%>
    const rateListContainer = document.getElementById("rateListContainer");
    const renderRateList = (filterRate) => {

        const filteredRateList = filterRate === 0 ? [...jsRateList] : jsRateList.filter(rate => rate.value === filterRate);
        if (filteredRateList.length === 0) {
            rateListContainer.innerHTML = `
                                <div class="w-full flex flex-col items-center p-8">
                                <img src="./assets/rateIcon.png" class="h-36" />
                            <div>Chưa có đánh giá</div>
                        </div>`;
            return;
        }

        let html = ``;
        for (let i = 0; i < filteredRateList.length; ++i) {
            const rate = filteredRateList[i];
            html += `
        <div class="flex flex-col pb-2 border-b border-slate-100/20">
            <div class="flex">
                <img class="rounded-full w-10 h-10" src="\${rate.customer.avatarUrl}" alt="">

                <div class="ml-4 flex flex-col">
                    <div>
                        <div class="text-lg line-clamp-1 mb-1">
                            \${rate.customer.username}
                        </div>
                        <svg viewBox="0 0 1000 200" class='rating h-4 mb-0'>
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
                        <rect width="\${rate.value*20}%" class='rating__value' clip-path="url(#stars)"></rect>

                        </svg>
                    </div>

                    <div class="text-sm mt-2">
                        \${rate.content}
                    </div>
                </div>
            </div>        
        </div>`;
        }
        rateListContainer.innerHTML = html;
    };

    renderRateList(0);

</script>

<script>
    const defaultTab = document.getElementById('tabRate0');
    defaultTab.classList.add('selected');

    const tabs = document.querySelectorAll('.tabRate');

    function handleTabClick() {
        tabs.forEach(tab => tab.classList.remove('selected'));
        this.classList.add('selected');
    }

    tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
</script>

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
        addToCart(productId, Number(quantityInput.value), <%= product.getStorage()%>);
        handleDisplayToost();
    });
    const buyNowBtn = document.getElementById("buyNowBtn");
    buyNowBtn.addEventListener("click", () => {
        addToCart(productId, Number(quantityInput.value), <%= product.getStorage()%>);
        window.location.href = "http://localhost:8080/store/cart";
    });

</script>

<jsp:include page="./footer.jsp"/>
