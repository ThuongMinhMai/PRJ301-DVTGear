package controller;

import dao.FavoriteDAO;
import dao.ProductDAO;
import model.Customer;
import model.Product;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "FavoriteController", urlPatterns = {"/favorite"})
public class FavoriteController extends HttpServlet {

    //get Favorite Page, with favorite products of customer
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //check login
        Customer customer = (Customer) request.getSession().getAttribute("currentUser");
        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }

        //if loged
        ProductDAO productDAO = new ProductDAO();
        int customerId = customer.getCustomerId();
        List<Product> favoriteProductList = productDAO.getFavoriteProducts(customerId);

        request.setAttribute("favoriteProductList", favoriteProductList);
        request.getRequestDispatcher("favorite.jsp").forward(request, response);
    }

    //add or remove favorite product
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //check login
        Customer customer = (Customer) request.getSession().getAttribute("currentUser");
        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }

        //if loged
        int productId = Integer.parseInt(request.getParameter("productId"));
        int customerId = customer.getCustomerId();
        String action = request.getParameter("action");  //"add" or "remove"
        FavoriteDAO favoriteDAO = new FavoriteDAO();

        if (action.equals("add")) {
            favoriteDAO.addFavorite(productId, customerId);
        } else if (action.equals("remove")) {
            favoriteDAO.deleteFavorite(productId, customerId);
        }

        response.sendRedirect("/store/products?id=" + productId);
    }

}
