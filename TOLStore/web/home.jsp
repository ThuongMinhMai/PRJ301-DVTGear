<%-- 
    Document   : home
    Created on : May 29, 2023, 4:18:43 PM
    Author     : Kingc
--%>

<%@page import="utils.Utils"%>
<%@page import="dao.ProductDAO"%>
<%@page import="entity.Product"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>




<jsp:include page="./header.jsp" />



<!-- Start banner -->
<div class="flex p-6 gap-6 mt-24">
    <div
        id="banner_nav"
        style="height: calc((100vw - 357px) / 2.55)"
        class="min-w-[285px] w-[285px] flex flex-col rounded-3xl gap-y-2 shadow-2xl overflow-hidden active_category"
        >
        <nav class="grid grid-cols-2 relative mb-4">
            <div
                id="nav_category"
                class="col-span-1 text-center py-4 cursor-pointer font-bold bg-dvt-black-2 rounded-tr-3xl"
                >
                Danh Mục
            </div>
            <div
                id="nav_brand"
                class="col-span-1 text-center py-4 cursor-pointer font-bold bg-primary rounded-tl-3xl"
                >
                Thương Hiệu
            </div>
        </nav>
        <div
            class="category_list overflow-y-auto px-3 flex flex-col gap-y-2 pb-4"
            >
            <a
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                href="http://localhost:8080/store/search"
                >
                <div>
                    <i class="fa-solid fa-layer-group"></i
                    >
                </div>
                <span class="ml-3"> Tất cả sản phẩm </span>
            </a>

            <a
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                href="http://localhost:8080/store/search?category=1"
                >
                <div>
                    <i class="fa-solid fa-laptop"></i
                    >
                </div>
                <span class="ml-3"> Laptop </span>
            </a>
            <a
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                href="http://localhost:8080/store/search?category=2"
                >
                <div>
                    <i class="fa-solid fa-computer"></i>
                </div>
                <span class="ml-3"> PC </span>
            </a>
            <a
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                href="http://localhost:8080/store/search?category=3"
                >
                <div>
                    <i class="fa-solid fa-tv"></i>
                </div>
                <span class="ml-3"> Màn hình </span>
            </a>
            <a
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                href="http://localhost:8080/store/search?category=4"
                >
                <div>
                    <i class="fa-solid fa-keyboard"></i
                    >
                </div>
                <span class="ml-3"> Bàn phím </span>
            </a>
            <a
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                href="http://localhost:8080/store/search?category=5"
                >
                <div>

                    <i class="fa-solid fa-mouse"></i>
                </div>
                <span class="ml-3"> Chuột </span>
            </a>
            <a
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                href="http://localhost:8080/store/search?category=6"
                >
                <div>
                    <i class="fa-solid fa-headphones"></i
                    >
                </div>
                <span class="ml-3"> Tai nghe </span>
            </a>
            <a
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                href="http://localhost:8080/store/search?category=7"
                >
                <div>
                    <i class="fa-solid fa-record-vinyl"></i
                    >
                </div>
                <span class="ml-3"> Loa </span>
            </a>
            <a
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                href="http://localhost:8080/store/search?category=8"
                >
                <div>
                    <i class="fa-solid fa-wifi"></i
                    >
                </div>
                <span class="ml-3"> Router Wi-fi</span>
            </a>
        </div>
        <div class="brand_list overflow-y-auto px-3 flex flex-col gap-y-2 pb-4">
            <div class="brand_list overflow-y-auto px-3 flex flex-col gap-y-2 pb-4">
                <div>
                    <div class="grid grid-cols-2 text-center gap-7">
                        <a href="http://localhost:8080/store/search?brand=1"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                   src="./assets/acer.png" alt="acer"></div></a>
                        <a href="http://localhost:8080/store/search?brand=2"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                   src="./assets/akko.png" alt="akko"></div></a>
                        <a href="http://localhost:8080/store/search?brand=3"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                   src="./assets/asus.png" alt="asus"></div></a>
                        <a href="http://localhost:8080/store/search?brand=4"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                   src="./assets/corsair.png" alt="corsair"></div></a>
                        <a href="http://localhost:8080/store/search?brand=5"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                   src="./assets/dare-u.png" alt="dare-u"></div></a>
                        <a href="http://localhost:8080/store/search?brand=6"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                   src="./assets/iqunix.png" alt="iqunix"></div></a>
                        <a href="http://localhost:8080/store/search?brand=7"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                   src="./assets/lenovo.png" alt="lenovo"></div></a>
                        <a href="http://localhost:8080/store/search?brand=8"><div class="flex justify-center cursor-pointer"> <img class="brand h-14 object-contain"
                                                                                                                                   src="./assets/logitech.png" alt="logitech"></div></a>
                        <a href="http://localhost:8080/store/search?brand=9"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                   src="./assets/msi.png" alt="msi"></div></a>
                        <a href="http://localhost:8080/store/search?brand=10"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                    src="./assets/rapoo.png" alt="rapoo"></div></a>
                        <a href="http://localhost:8080/store/search?brand=11"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                    src="./assets/razer.png" alt="razer"></div></a>
                        <a href="http://localhost:8080/store/search?brand=12"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                    src="./assets/samsung.png" alt="samsung"></div></a>
                        <a href="http://localhost:8080/store/search?brand=13"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                    src="./assets/sony.png" alt="sony"></div></a>
                        <a href="http://localhost:8080/store/search?brand=14"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                    src="./assets/tplink.png" alt="tplink"></div></a>
                        <a href="http://localhost:8080/store/search?brand=15"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                    src="./assets/viewsonic.png" alt="viewsonic"></div></a>
                        <a href="http://localhost:8080/store/search?brand=16"><div class="flex justify-center cursor-pointer"> <img class="brand h-10 object-contain"
                                                                                                                                    src="./assets/logo.png" alt="tol"></div></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex-1">
        <img
            class="w-full aspect-[2.55/1] object-fill rounded-3xl"
            src="${bannerUrl}"
            alt="Banner picture"
            />
    </div>
</div>
<!-- End Banner -->



<!-- Start productList -->
<div class="relative pb-16">
    <img class="w-full absolute z-[-10]" src="./assets/preorder-bg.png" />
    <!--Title productList-->
    <div class="flex items-center w-11/12 max-w-7xl mx-auto py-12">
        <div class="grow border-t-[3px] border-white"></div>

        <p class="px-5 py-0 text-2xl font-bold uppercase text-white">
            danh sách sản phẩm
        </p>

        <div class="grow border-t-[3px] border-white"></div>
    </div>

    <div
        class="relative justify-center grid grid-cols-12 gap-5 w-11/12 max-w-7xl mx-auto"
        >



        <%
            List<Product> productList = (List<Product>) request.getAttribute("productList");
            for (Product product : productList) {
        %>
        <div
            class="bg-dvt-black-2 flex flex-col rounded-3xl overflow-hidden h-fit cursor-pointer col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
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
                onclick="addToCart(<%= product.getId()%>,1,<%= product.getStorage() %>)"
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

<jsp:include page="./footer.jsp" />


