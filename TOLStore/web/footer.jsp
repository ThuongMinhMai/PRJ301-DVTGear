<%-- 
    Document   : footer
    Created on : Jun 5, 2023, 8:08:48 AM
    Author     : Kingc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
<footer class="bg-dvt-black-2 py-12">
    <div class="container bg-dvt-black-2 mx-auto max-w-7xl w-11/12">
        <div class="row grid grid-cols-12">
            <div class="footer-col col-span-12 w-full mb-8 p-3 lg:col-span-3 md:col-span-6 sm:col-span-12">
                <h4 class="text-2xl w-full font-bold text-white capitalize mb-[30px] relative">
                    Công ty
                </h4>
                <ul>
                    <li>
                        <a class="text-lg capitalize text-gray-500 mb-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Về chúng tôi
                        </a>
                    </li>
                    <li>
                        <a class="text-lg capitalize text-gray-500 mb-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Dịch vụ
                        </a>
                    </li>
                    <li>
                        <a class="text-lg capitalize text-gray-500 mb-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Chính sách bảo mật
                        </a>
                    </li>
                    <li>
                        <a class="text-lg capitalize text-gray-500 mb-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Chương trình liên kết
                        </a>
                    </li>
                </ul>
            </div>

            <div class="footer-col col-span-12 w-full mb-8 p-3 lg:col-span-3 md:col-span-6 sm:col-span-12">
                <h4 class="text-2xl font-bold text-white capitalize mb-[30px] relative">
                    Hỗ Trợ
                </h4>
                <ul>
                    <li>
                        <a class="text-lg capitalize text-gray-500 mb-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Câu hỏi thường gặp
                        </a>
                    </li>
                    <li>
                        <a class="text-lg capitalize text-gray-500 mb-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Vận chuyển
                        </a>
                    </li>
                    <li>
                        <a class="text-lg capitalize text-gray-500 md-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Quay lại
                        </a>
                    </li>
                    <li>
                        <a class="text-lg capitalize text-gray-500 md-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Thanh toán
                        </a>
                    </li>
                </ul>
            </div>

            <div class="footer-col col-span-12 w-full mb-8 p-3 lg:col-span-3 md:col-span-6 sm:col-span-12">
                <h4 class="text-2xl font-bold text-white capitalize mb-[30px] relative">
                    Giờ làm việc
                </h4>
                <ul>
                    <li>
                        <a class="text-lg capitalize text-gray-500 mb-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Thứ Hai - Thứ Sáu: 9:00 - 23:00
                        </a>
                    </li>
                    <li>
                        <a class="text-lg capitalize text-gray-500 mb-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Thứ Bảy: 9:00 - 22:00
                        </a>
                    </li>
                    <li>
                        <a class="text-lg capitalize text-gray-500 mb-2 no-underline font-light block transition-all ease-in-out hover:text-white hover:pl-2"
                           href="#">
                            Chủ Nhật: 9:00 - 17:00
                        </a>
                    </li>
                </ul>
            </div>

            <div class="footer-col col-span-12 w-full mb-8 p-3 lg:col-span-3 md:col-span-6 sm:col-span-12">
                <h4 class="text-2xl font-bold text-white capitalize mb-[30px] relative">
                    Theo dõi chúng tôi
                </h4>
                <div class="social-links">
                    <a class="inline-block bg-white/20 h-10 w-10 text-center leading-10 rounded-[50%] text-white hover:bg-primary hover:text-white transition-all ease-in-out"
                       href="#">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a class="inline-block bg-white/20 h-10 w-10 text-center leading-10 rounded-[50%] text-white hover:bg-primary hover:text-white transition-all ease-in-out"
                       href="#">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a class="inline-block bg-white/20 h-10 w-10 text-center leading-10 rounded-[50%] text-white hover:bg-primary hover:text-white transition-all ease-in-out"
                       href="#">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a class="inline-block bg-white/20 h-10 w-10 text-center leading-10 rounded-[50%] text-white hover:bg-primary hover:text-white transition-all ease-in-out"
                       href="#">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>
<!-- End Footer -->

<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
<script>
    const cart = JSON.parse(localStorage.getItem("cart")) ?
        JSON.parse(localStorage.getItem("cart"))
        :
        {
            products: {},
            productCount: 0
        };
    const cartTotalDisplay = document.getElementById("cartTotalDisplay");
    const updateCartTotalDisplay = () => {
        cartTotalDisplay.innerHTML = cart.productCount;
    };

    updateCartTotalDisplay();

    const addToCart = (id, quantity = 1, storage) => {
        let flag = false;
        if (cart.products[id]) {
            if (cart.products[id] + quantity <= storage) {
                flag = true;
            }
        } else if (quantity <= storage) {
            flag = true;
        }
        if (!flag) {
            handleDisplayFailToost();
            return;
        }
        cart.products[id] = cart.products[id] ? cart.products[id] + Number(quantity) : Number(quantity);
        cart.productCount += Number(quantity);
        updateCartTotalDisplay();
        localStorage.setItem("cart", JSON.stringify(cart));
        handleDisplaySuccessToost();
    };

    const moveToLogin = () => {
        window.location.href = "http://localhost:8080/store/login";
    };

    const handleCloseSuccessToost = () => {
        const element = document.querySelector('#toostSuccessAddToCart');
        if (element) {
            element.remove();
        }
    };

    const handleCloseFailToost = () => {
        const element = document.querySelector('#toostFailAddToCart');
        if (element) {
            element.remove();
        }
    };

    const handleDisplayFailToost = () => {
        const htmlCode = `
            <div onclick="handleCloseFailToost()" id="toostFailAddToCart" class="fixed inset-0 bg-transparent flex justify-center items-center z-[999]">
                <div class="bg-dvt-black-2/70 rounded-md p-6 flex flex-col gap-4 justify-center items-center">
                    <img src="./assets/fail.png" alt="check" class="w-20 h-20" />
                    <div class="font-medium text-xl">Không đủ hàng!</div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('afterbegin', htmlCode);
        setTimeout(function () {
            const element = document.querySelector('#toostFailAddToCart');
            if (element) {
                element.remove();
            }
        }, 3000);
    };

    const handleDisplaySuccessToost = () => {
        const htmlCode = `
            <div onclick="handleCloseSuccessToost()" id="toostSuccessAddToCart" class="fixed inset-0 bg-transparent flex justify-center items-center z-[999]">
                <div class="bg-dvt-black-2/70 rounded-md p-6 flex flex-col gap-4 justify-center items-center">
                    <img src="./assets/check.png" alt="check" class="w-20 h-20" />
                    <div class="font-medium text-xl">Sản phẩm đã được thêm vào Giỏ Hàng</div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('afterbegin', htmlCode);
        setTimeout(function () {
            const element = document.querySelector('#toostSuccessAddToCart');
            if (element) {
                element.remove();
            }
        }, 3000);
    };
</script>
</body>
</html>
