<%-- 
    Document   : favorite
    Created on : Jun 14, 2023, 3:07:59 PM
    Author     : Kingc
--%>

<%@page import="utils.Utils" %>
<%@page import="model.Product" %>
<%@page import="java.util.List" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<jsp:include page="./header.jsp"/>

<div class="flex items-center w-11/12 max-w-6xl mx-auto py-12 relative mt-24">
  <div class="grow border-t-[3px] border-white"></div>
  <p class="px-5 py-0 text-2xl font-bold uppercase text-white">
    Các sản phẩm yêu thích
  </p>
  <div class="grow border-t-[3px] border-white"></div>
</div>

<div class="relative pb-16 w-11/12 max-w-6xl mx-auto">

  <%
    List<Product> productList = (List<Product>) request.getAttribute("favoriteProductList");

    if (productList.size() == 0) { %>

  <div class="w-full flex flex-col justify-center gap-3 items-center relative bg-dvt-black-2 rounded-md py-12">
    <img src="./assets/robot2.png" alt="robot2" class="h-64"/>
    <div class="font-bold text-3xl">Không tìm thấy sản phẩm nào!</div>
  </div>

  <%}%>

  <div class="relative justify-center grid grid-cols-12 gap-5">
    <%
      for (Product product : productList) {
    %>
    <div
        class="bg-dvt-black-2 flex flex-col rounded-3xl overflow-hidden cursor-pointer col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
      <a href="/store/products?id=<%= product.getId()%>" class="w-full overflow-hidden relative aspect-square">
        <% String imageUrl = Utils.parseJSONStringArray(product.getImages()).get(0);%>
        <img class="w-full h-full object-cover bt-[20px] transition duration-300 ease-linear hover:scale-125"
             src="<%=imageUrl%>" alt="product"/>
        <div class="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-tl-2xl py-3 px-5 text-2xl">
          <%= Utils.formatNum(product.getPrice())%>₫
        </div>
      </a>
      <div class="px-5 py-0 my-2 mx-0 name_product">
                <span class="font-bold line-clamp-2">
                    <%= product.getName()%>
                </span>
      </div>
      <div onclick="addToCart(<%= product.getId()%>, 1,<%= product.getStorage()%>)"
           class="mt-auto mx-auto px-4 py-2 rounded-[30px] bg-primary border-none uppercase cursor-pointer mb-4 hover:opacity-80">
        Thêm vào giỏ hàng
      </div>
    </div>
    <%
      }
    %>
  </div>
</div>

<jsp:include page="./footer.jsp"/>
