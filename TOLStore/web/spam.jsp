<%-- 
    Document   : spam
    Created on : Jun 19, 2023, 3:22:53 PM
    Author     : Kingc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            "dvt-black-2": "#1b1a21",
                            "dvt-black-1": "#2a303c",
                            primary: "#ea1c00",
                            success: "#05b171",
                            danger: "#ea4444"
                        }
                    }
                }
            };
        </script>

        <style>
            @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

            ::-webkit-scrollbar {
                width: 6px;
            }

            ::-webkit-scrollbar-track {
                background-color: #1b1a21;
            }

            ::-webkit-scrollbar-thumb {
                background-color: grey;
                border-radius: 6px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background-color: #ea1c00;
            }

            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            input[type="number"] {
                -moz-appearance: textfield; /* Firefox */
            }

            body {
                background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
                background-color: #2a303c;
                font-family: 'Roboto', sans-serif;
            }

            #header-user:hover #header-user-menu {
                display: flex;
            }

            #banner_nav .category_list::-webkit-scrollbar-thumb {
                background-color: #ea1c00;
                border-radius: 6px;
            }
            #banner_nav .brand_list::-webkit-scrollbar-thumb {
                background-color: #1b1a21;
                border-radius: 6px;
            }

            #banner_nav .category_list::-webkit-scrollbar,
            #banner_nav .brand_list::-webkit-scrollbar {
                width: 4px;
            }

            #banner_nav .category_list::-webkit-scrollbar-track,
            #banner_nav .brand_list::-webkit-scrollbar-track {
                background-color: transparent;
            }

            #banner_nav.active_brand {
                background-color: #ea1c00;
            }
            #banner_nav.active_brand nav {
                background-color: #1b1a21;
            }
            #banner_nav.active_brand nav #nav_brand {
                position: relative;
            }

            #banner_nav.active_brand nav #nav_brand::after {
                content: "";
                width: 48px;
                height: 48px;
                background-color: transparent;
                position: absolute;
                bottom: 0;
                left: 0;
                border-radius: 50%;
                transform: translateX(-100%);
                box-shadow: 24px 24px 0 0 #ea1c00;
            }

            #banner_nav.active_brand nav #nav_category::after {
                content: "";
                width: 48px;
                height: 48px;
                background-color: transparent;
                position: absolute;
                bottom: 0;
                left: 0;
                border-radius: 50%;
                transform: translateY(100%);
                box-shadow: -24px -24px 0 0 #1b1a21;
            }

            #banner_nav.active_brand .category_list {
                display: none;
            }

            #banner_nav.active_category {
                background-color: #1b1a21;
            }
            #banner_nav.active_category nav {
                background-color: #ea1c00;
            }
            #banner_nav.active_category nav #nav_category {
                position: relative;
            }
            #banner_nav.active_category nav #nav_category::after {
                content: "";
                width: 48px;
                height: 48px;
                background-color: transparent;
                position: absolute;
                bottom: 0;
                right: 0;
                border-radius: 50%;
                transform: translateX(100%);
                box-shadow: -24px 24px 0 0 #1b1a21;
            }
            #banner_nav.active_category nav #nav_brand::after {
                content: "";
                width: 48px;
                height: 48px;
                background-color: transparent;
                position: absolute;
                bottom: 0;
                right: 0;
                border-radius: 50%;
                transform: translateY(100%);
                box-shadow: 24px -24px 0 0 #ea1c00;
            }

            #banner_nav.active_category .brand_list {
                display: none;
            }

            #contentDescription img{
                margin: 5px auto;
            }

            .product {
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            }
            .product:hover {
                box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
                    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
                    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
            }
            .product:hover .name_product span {
                color: #ea1c00;
            }

            .footer-col h4::before {
                content: "";
                position: absolute;
                left: 0;
                bottom: -10px;
                background-color: #ea1c00;
                height: 2px;
                box-sizing: border-box;
                width: 50px;
            }

            .tab.selected {
                border-bottom: 2px solid #ea1c00;
                color: #ea1c00
            }

            .footer-col ul li:not(:last-child) {
                margin-bottom: 10px;
            }

            .sort-icon:hover p.name{
                opacity: 1;
            }

            .sort-icon .selected{
                background-color: #ea1c00;
            }

            .brand_list .brand {
                filter: grayscale(100%) brightness(0) invert(100%);
            }

            .brand_list .brand:hover {
                filter: grayscale(0%) brightness(100%) invert(0%);
            }



        </style>
        <title>TOL Store</title>
    </head>
    <body>
<!--        <select class="border py-2 border-white outline-none px-3 rounded bg-dvt-black-2" id="city">
            <option class="bg-inherit" value="" selected>Chọn tỉnh thành</option>
        </select>

        <select class="border py-2 border-white outline-none px-3 rounded bg-dvt-black-2" id="district">
            <option class="bg-inherit" value="" selected>Chọn quận huyện</option>
        </select>

        <select class="border py-2 border-white outline-none px-3 rounded bg-dvt-black-2" id="ward">
            <option class="bg-inherit" value="" selected>Chọn phường xã</option>
        </select>             


        <div class="py-2 px-4 bg-primary rounded-md text-white w-fit cursor-pointer" onclick="generateRandomAddress()">Spam address</div>
        <div class="py-2 px-4 bg-primary rounded-md text-white w-fit cursor-pointer" onclick="handleSubmitOrder()">Spam order</div>

        <script>
            function createRandomProductList() {
                const object = {};
                const numPairs = Math.floor(Math.random() * 5) + 1; // Random number of key-value pairs (1-5)

                for (let i = 0; i < numPairs; i++) {
                    const key = Math.floor(Math.random() * 40) + 1; // Random key (1-40)
                    const value = Math.floor(Math.random() * 5) + 1; // Random value (1-5)
                    object[key] = value;
                }

                return object;
            }
            const generateRandomProductList = () => {
                console.log(createRandomProductList());
            };




            const handleSubmitOrder = () => {


                const form = document.createElement('form');
// Set form attributes
                form.method = 'POST'; // HTTP method
                form.action = 'http://localhost:8080/store/orders'; // Server endpoint URL

// Create form fields
                const phoneElement = document.createElement('input');
                phoneElement.type = 'text';
                phoneElement.name = 'phone';
                phoneElement.value = '0000000000';
                const receiverElement = document.createElement('input');
                receiverElement.type = 'text';
                receiverElement.name = 'receiver';
                receiverElement.value = 'Mark Chu';
                const addressElement = document.createElement('input');
                addressElement.type = 'text';
                addressElement.name = 'address';
                addressElement.value = 'thành phố 0, quận 0, phường 0, đường 0';
                const productsElement = document.createElement('input');
                productsElement.type = 'text';
                productsElement.name = 'products';
                productsElement.value = JSON.stringify(createRandomProductList());
// Add form fields to the form
                form.appendChild(phoneElement);
                form.appendChild(receiverElement);
                form.appendChild(addressElement);
                form.appendChild(productsElement);
// Append the form to the document body
                document.body.appendChild(form);
//Before Submit the form
                localStorage.removeItem("cart");
// Submit the form   
                form.submit();
            };
        </script>-->
    </body>
</html>
