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
            <div
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                >
                <div>
                    <a class="text-white" href="#"
                       ><i class="fa-solid fa-layer-group"></i
                        ></a>
                </div>
                <span class="ml-3"> Tất cả sản phẩm </span>
            </div>

            <div
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                >
                <div>
                    <a class="text-white" href="#"
                       ><i class="fa-solid fa-laptop"></i
                        ></a>
                </div>
                <span class="ml-3"> Laptop </span>
            </div>
            <div
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                >
                <div>
                    <a class="text-white" href="#"
                       ><i class="fa-solid fa-computer"></i
                        ></a>
                </div>
                <span class="ml-3"> PC </span>
            </div>
            <div
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                >
                <div>
                    <a class="text-white" href="#"><i class="fa-solid fa-tv"></i></a>
                </div>
                <span class="ml-3"> Màn hình </span>
            </div>
            <div
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                >
                <div>
                    <a class="text-white" href="#"
                       ><i class="fa-solid fa-keyboard"></i
                        ></a>
                </div>
                <span class="ml-3"> Bàn phím </span>
            </div>
            <div
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                >
                <div>
                    <a class="text-white mr-2" href="#"
                       ><i class="fa-solid fa-mouse"></i
                        ></a>
                </div>
                <span class="ml-3"> Chuột </span>
            </div>
            <div
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                >
                <div>
                    <a class="text-white mr-1" href="#"
                       ><i class="fa-solid fa-headphones"></i
                        ></a>
                </div>
                <span class="ml-3"> Tai nghe </span>
            </div>
            <div
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                >
                <div>
                    <a class="text-white mr-1" href="#"
                       ><i class="fa-solid fa-record-vinyl"></i
                        ></a>
                </div>
                <span class="ml-3"> Loa </span>
            </div>
            <div
                class="flex px-4 py-3 text-sm bg-dvt-black-1 rounded-xl cursor-pointer hover:bg-primary"
                >
                <div>
                    <a class="text-white" href="#"
                       ><i class="fa-solid fa-wifi"></i
                        ></a>
                </div>
                <span class="ml-3"> Router Wi-fi</span>
            </div>
        </div>
        <div class="brand_list overflow-y-auto px-3 flex flex-col gap-y-2 pb-4">
            Các thương hiệu
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
            ProductDAO productDAO = new ProductDAO();
            List<Product> productList = productDAO.getAllProducts(); // Assuming getProductList() returns a list of Product objects

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
    const bannerNav = document.getElementById('banner_nav');
    const navBrand = document.getElementById('nav_brand');
    const navCategory = document.getElementById('nav_category');

    navCategory.addEventListener('click', () => {
        bannerNav.classList.remove('active_brand');
        bannerNav.classList.add('active_category');
    });
    navBrand.addEventListener('click', () => {
        bannerNav.classList.add('active_brand');
        bannerNav.classList.remove('active_category');s
    });

</script>

<jsp:include page="./footer.jsp" />


