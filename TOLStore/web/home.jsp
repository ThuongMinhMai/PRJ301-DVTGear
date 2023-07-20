<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="utils.Utils" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>

<jsp:include page="./header.jsp"/>
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css"/>
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

<style>
    .carousel {
        position: relative;
        width: 100%;
        max-width: 600px; /* Adjust the width as needed */
        margin: 0 auto;
    }

    .carousel-inner {
        display: flex;
        overflow: hidden;
    }

    .carousel-inner img {
        width: 100%;
        height: auto;
    }

    .prev,
    .next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        cursor: pointer;
        z-index: 1;
    }

    .prev {
        left: 10px;
    }

    .next {
        right: 10px;
    }
</style>

<!-- Start banner -->
<div class="flex p-6 gap-6 mt-24">
    <div id="banner_nav" style="height: calc((100vw - 357px) / 2.55)"
         class="min-w-[285px] w-[285px] flex flex-col rounded-3xl gap-y-2 shadow-2xl overflow-hidden active_category">
        <nav class="grid grid-cols-2 relative mb-4">
            <div id="nav_category"
                 class="col-span-1 text-center py-4 cursor-pointer font-bold bg-dvt-black-2 rounded-tr-3xl">
                Danh Mục
            </div>
            <div id="nav_brand" class="col-span-1 text-center py-4 cursor-pointer font-bold bg-primary rounded-tl-3xl">
                Thương Hiệu
            </div>
        </nav>
        <div class="category_list overflow-y-auto px-3 flex flex-col gap-y-2 pb-4">
            <a class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
               href="/store/search">
                <div>
                    <i class="fa-solid fa-layer-group"></i>
                </div>
                <span class="ml-3">Tất cả sản phẩm</span>
            </a>
            <a class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
               href="/store/search?category=1">
                <div>
                    <i class="fa-solid fa-laptop"></i>
                </div>
                <span class="ml-3">Laptop</span>
            </a>
            <a class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
               href="/store/search?category=2">
                <div>
                    <i class="fa-solid fa-computer"></i>
                </div>
                <span class="ml-3">PC</span>
            </a>
            <a class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
               href="/store/search?category=3">
                <div>
                    <i class="fa-solid fa-tv"></i>
                </div>
                <span class="ml-3">Màn hình</span>
            </a>
            <a class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
               href="/store/search?category=4">
                <div>
                    <i class="fa-solid fa-keyboard"></i>
                </div>
                <span class="ml-3">Bàn phím</span>
            </a>
            <a class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
               href="/store/search?category=5">
                <div>
                    <i class="fa-solid fa-mouse"></i>
                </div>
                <span class="ml-3">Chuột</span>
            </a>
            <a class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
               href="/store/search?category=6">
                <div>
                    <i class="fa-solid fa-headphones"></i>
                </div>
                <span class="ml-3">Tai nghe</span>
            </a>
            <a class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
               href="/store/search?category=7">
                <div>
                    <i class="fa-solid fa-record-vinyl"></i>
                </div>
                <span class="ml-3">Loa</span>
            </a>
            <a class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
               href="/store/search?category=8">
                <div>
                    <i class="fa-solid fa-wifi"></i>
                </div>
                <span class="ml-3">Router Wi-fi</span>
            </a>
        </div>
        <div class="brand_list overflow-y-auto px-4 pb-5 grid grid-cols-2 text-center gap-7">
            <a href="/store/search?brand=1">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/acer.png" alt="acer">
                </div>
            </a>
            <a href="/store/search?brand=2">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/akko.png" alt="akko">
                </div>
            </a>
            <a href="/store/search?brand=3">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/asus.png" alt="asus">
                </div>
            </a>
            <a href="/store/search?brand=4">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/corsair.png" alt="corsair">
                </div>
            </a>
            <a href="/store/search?brand=5">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/dare-u.png" alt="dare-u">
                </div>
            </a>
            <a href="/store/search?brand=6">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/iqunix.png" alt="iqunix">
                </div>
            </a>
            <a href="/store/search?brand=7">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/lenovo.png" alt="lenovo">
                </div>
            </a>
            <a href="/store/search?brand=8">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/logitech.png" alt="logitech">
                </div>
            </a>
            <a href="/store/search?brand=9">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/msi.png" alt="msi">
                </div>
            </a>
            <a href="/store/search?brand=10">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/rapoo.png" alt="rapoo">
                </div>
            </a>
            <a href="/store/search?brand=11">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/razer.png" alt="razer">
                </div>
            </a>
            <a href="/store/search?brand=12">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/samsung.png" alt="samsung">
                </div>
            </a>
            <a href="/store/search?brand=13">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/tplink.png" alt="tplink">
                </div>
            </a>
            <a href="/store/search?brand=14">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/viewsonic.png" alt="viewsonic">
                </div>
            </a>
            <a href="/store/search?brand=15">
                <div class="flex justify-center cursor-pointer">
                    <img class="brand h-10 object-contain" src="./assets/logo.png" alt="tol">
                </div>
            </a>
        </div>
    </div>

    <div class="banner-slider relative w-full h-full flex-1 overflow-hidden rounded-3xl">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <c:set var="bannerUrlList" value="${Utils.parseJSONStringArray(requestScope.bannerUrls)}"/>
                <c:forEach items="${bannerUrlList}" var="bannerUrl">
                    <div class="swiper-slide">
                        <img class="w-full aspect-[2.55/1] object-fill rounded-3xl select-none" src="${bannerUrl}"
                             alt="">
                    </div>
                </c:forEach>
            </div>
            <div style="color: #ea1c00" class="swiper-button-prev"></div>
            <div style="color: #ea1c00" class="swiper-button-next"></div>
        </div>
    </div>
</div>
<!-- End banner -->


<!-- Start productList -->
<div id="productsContainer" class="relative pb-16">
    <img alt="bg-productList" class="w-full absolute z-[-10]" src="./assets/preorder-bg.png"/>

    <div class="flex items-center w-11/12 max-w-6xl mx-auto py-12">
        <div class="grow border-t-[3px] border-white"></div>
        <p class="px-5 py-0 text-2xl font-bold uppercase text-white">
            sản phẩm mới nhất
        </p>
        <div class="grow border-t-[3px] border-white"></div>
    </div>
    <div class="relative justify-center grid grid-cols-12 gap-5 w-11/12 max-w-6xl mx-auto">
        <c:set var="productList" value="${requestScope.productList}"/>

        <c:forEach items="${productList}" var="product">
            <div
                    class="bg-dvt-black-2 flex flex-col rounded-3xl overflow-hidden cursor-pointer col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <a href="/store/products?id=${product.getId()}" class="w-full overflow-hidden relative aspect-square">

                    <c:set var="imageUrl" value="${Utils.parseJSONStringArray(product.getImages()).get(0)}"/>
                    <img class="w-full h-full object-cover bt-[20px] transition duration-300 ease-linear hover:scale-125"
                         src="${imageUrl}" alt="product"/>
                    <div class="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-tl-2xl py-3 px-5 text-2xl">
                            ${Utils.formatNum(product.getPrice())}₫
                    </div>
                </a>
                <div class="px-5 py-0 my-2 mx-0 name_product">
                    <span class="font-bold line-clamp-2">
                            ${product.getName()}
                    </span>
                </div>
                <div onclick="addToCart(${ product.getId()}, 1,${ product.getStorage()})"
                     class="mt-auto mx-auto px-4 py-2 rounded-[30px] bg-primary border-none uppercase cursor-pointer mb-4 hover:opacity-80">
                    Thêm vào giỏ hàng
                </div>
            </div>
        </c:forEach>
    </div>

    <div class="flex items-center w-11/12 max-w-6xl mx-auto py-12">
        <div class="grow border-t-[3px] border-white"></div>
        <p class="px-5 py-0 text-2xl font-bold uppercase text-white">
            Sản Phẩm Bán Chạy
        </p>
        <div class="grow border-t-[3px] border-white"></div>
    </div>
    <div class="relative justify-center grid grid-cols-12 gap-5 w-11/12 max-w-6xl mx-auto">
        <c:set var="bestSellers" value="${requestScope.bestSellers}"/>

        <c:forEach items="${bestSellers}" var="product">
            <div
                    class="bg-dvt-black-2 flex flex-col rounded-3xl overflow-hidden cursor-pointer col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <a href="/store/products?id=${product.getId()}" class="w-full overflow-hidden relative aspect-square">

                    <c:set var="imageUrl" value="${Utils.parseJSONStringArray(product.getImages()).get(0)}"/>
                    <img class="w-full h-full object-cover bt-[20px] transition duration-300 ease-linear hover:scale-125"
                         src="${imageUrl}" alt="product"/>
                    <div class="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-tl-2xl py-3 px-5 text-2xl">
                            ${Utils.formatNum(product.getPrice())}₫
                    </div>
                </a>
                <div class="px-5 py-0 my-2 mx-0 name_product">
                    <span class="font-bold line-clamp-2">
                            ${product.getName()}
                    </span>
                </div>
                <div onclick="addToCart(${ product.getId()}, 1,${ product.getStorage()})"
                     class="mt-auto mx-auto px-4 py-2 rounded-[30px] bg-primary border-none uppercase cursor-pointer mb-4 hover:opacity-80">
                    Thêm vào giỏ hàng
                </div>
            </div>
        </c:forEach>
    </div>
</div>


<script>
    const renderViewMoreProductsBtn = () => {
        const viewMoreProductsBtn = document.createElement("a");
        viewMoreProductsBtn.setAttribute("id", "viewMoreProductsBtn");
        viewMoreProductsBtn.className = "py-2 px-4 rounded-md bg-primary w-fit mt-8 cursor-pointer mx-auto hover:opacity-80 select-none block";
        viewMoreProductsBtn.innerHTML = `Xem tất cả sản phẩm`;
        viewMoreProductsBtn.href = "http://localhost:8080/store/search";
        document.getElementById("productsContainer").appendChild(viewMoreProductsBtn);
    };

    renderViewMoreProductsBtn();
</script>

<script>
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        autoplay: {
            delay: 3000 // Set the delay to 3000ms
        }
    });
</script>

<script>
    const bannerNav = document.getElementById('banner_nav');
    const navBrand = document.getElementById('nav_brand');
    const navCategory = document.getElementById('nav_category');

    navCategory.addEventListener('click', () => {
        bannerNav.classList.remove('active_brand');
        bannerNav.classList.add('active_category');
    });

    navBrand.addEventListener('click', () => {
        bannerNav.classList.add('active_brand');
        bannerNav.classList.remove('active_category');
    });
</script>

<jsp:include page="./footer.jsp"/>
