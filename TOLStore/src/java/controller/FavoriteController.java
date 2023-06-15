/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import dao.FavoriteDAO;
import dao.ProductDAO;
import entity.Customer;
import entity.Product;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Kingc
 */
@WebServlet(name = "FavoriteController", urlPatterns = {"/favorite"})
public class FavoriteController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Customer customer = (Customer) request.getSession().getAttribute("currentUser");

        ProductDAO productDAO = new ProductDAO();

        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }

        List<Product> favoriteProductList = productDAO.getFavoriteProducts(customer.getCustomerId());

        request.setAttribute("favoriteProductList", favoriteProductList);

        request.getRequestDispatcher("favorite.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Customer customer = (Customer) request.getSession().getAttribute("currentUser");

        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }
        int productId = Integer.parseInt(request.getParameter("productId"));
        String action = request.getParameter("action");
        FavoriteDAO favoriteDAO = new FavoriteDAO();

        if (action.equals("add")) {
            favoriteDAO.addFavorite(productId, customer.getCustomerId());
        } else if (action.equals("remove")) {
            favoriteDAO.deleteFavorite(productId, customer.getCustomerId());
        }

        response.sendRedirect("/store/products?id=" + productId);
    }

}
