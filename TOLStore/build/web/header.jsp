<%-- 
    Document   : header
    Created on : Jun 5, 2023, 8:05:56 AM
    Author     : Kingc
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="model.Customer" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
  <head>
	<meta charset="UTF-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
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

      html {
		scroll-behavior: smooth;
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

      #contentDescription img {
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

      .sort-icon:hover p.name {
		opacity: 1;
      }

      .sort-icon .selected {
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


  <body class="text-white relative">
	<!-- Start header  -->
	<header class="flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-all py-4 bg-dvt-black-2">
	  <div class="mx-auto w-11/12 max-w-6xl flex justify-between items-center bg-transparent gap-6">
		<!-- Start Logo DVT -->
		<a href="http://localhost:8080/store">
		  <img class="h-16 object-cover" src="./assets/logo.png" alt="icon_DVT"/>
		</a>
		<!-- Search box -->
		<form action="/store/search" action="POST" class="flex-1 flex justify-center items-center relative">
		  <div class="flex-1 flex justify-center">
			<div class="min-w-[384px] relative">
			  <input
				class="rounded-3xl px-4 py-2 border-none outline-none bg-primary text-white placeholder-white w-full max-w-sm"
				type="text" name="searchTerm" placeholder="Tìm sản phẩm...."/>
			  <div
				class="flex justify-center items-center absolute top-[50%] right-[5px] transform -translate-y-1/2 w-[30px] h-[30px] bg-cover cursor-pointer bg-white rounded-[30px]">
				<ion-icon name="search-outline" class="w-5 h-5 filter invert"></ion-icon>
			  </div>
			</div>
		  </div>
		</form>
		<!-- Cart and login -->
		<div class="flex cart_login items-center gap-5">
		  <a href="/store/cart" class="relative">
			<img src="./assets/cart.png" class="w-9 h-9 filter invert"/>
			<div id="cartTotalDisplay"
				 class="absolute bg-primary rounded-full w-5 h-5 text-xs top-0 -right-1 flex justify-center items-center">
			  0
			</div>
		  </a>
		  <c:set var="customer" value="${sessionScope.currentUser}"  />



		  <div class="relative" id="header-user">

			<c:choose>
			  <c:when test="${customer==null}">
				<img src="./assets/user.png" class="w-9 h-9 cursor-pointer filter invert" onclick="moveToLogin()"/>
			  </c:when>
			  <c:otherwise>
				<img src="${customer.getAvatarUrl()}" class="w-9 h-9 cursor-pointer rounded-full" />
			  </c:otherwise>
			</c:choose>

			<c:if test="${customer != null}" >
			  <div id="header-user-menu"
				   class="absolute bg-dvt-black-2 border border-white -right-[5px] flex-col flex whitespace-nowrap text-white z-10 rounded-xl px-4 text-center py-2 font-bold hidden">
				<div class="absolute bg-dvt-black-2 w-6 h-6 right-[11px] rotate-45 top-2 -z-10 -translate-y-1/2 rounded-sm"></div>
				<img src="assets/robot.png" alt="robot" class="absolute h-[70%] -left-16 bottom-0"/>
				<div class="py-4 border-b border-salte-50/10 mb-2">
				  <span class="font-normal">Xin chào</span> ${customer.getUsername()}
				</div>
				<a href="/store/orders"
				   class="block py-2 px-4 rounded-3xl flex justify-center gap-2 w-full items-center hover:bg-primary cursor-pointer">
				  <ion-icon class="w-6 h-6" name="file-tray-stacked-outline"></ion-icon>
				  Đơn Hàng
				</a>
				<a href="/store/favorite"
				   class="block py-2 px-4 rounded-3xl flex justify-center gap-2 w-full items-center hover:bg-primary cursor-pointer">
				  <ion-icon class="w-6 h-6" name="heart-circle-outline"></ion-icon>
				  Sản Phẩm Yêu Thích
				</a>
				<form action="/store/logout" method="POST"
					  class="block py-2 px-4 rounded-3xl flex justify-center gap-2 w-full items-center hover:bg-primary cursor-pointer">
				  <ion-icon class="w-6 h-6" name="log-out-outline"></ion-icon>
				  <button type="submit">Đăng Xuất</button>
				</form>
			  </div>
			</c:if>
		  </div>
		</div>
	  </div>
	</header>
