/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import dao.ProductDAO;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Kingc
 */
@WebServlet(name = "SearchController", urlPatterns = {"/search"})
public class SearchController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String category = request.getParameter("category");
        String brand = request.getParameter("brand");
        String searchTerm = request.getParameter("searchTerm");
        String sortBy = request.getParameter("sortBy");
        
        ProductDAO productDAO = new ProductDAO();
        request.setAttribute("productList", productDAO.getSearchedProducts(searchTerm, category, brand, sortBy));
        
        request.getRequestDispatcher("search.jsp").forward(request, response);
    }

}
