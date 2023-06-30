package controller;

import dao.FavoriteDAO;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import dao.ProductDAO;
import model.Customer;
import model.Product;
import java.util.List;

@WebServlet(name = "ProductController", urlPatterns = {"/products"})
public class ProductController extends HttpServlet {

    //get product detail page
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int productId = Integer.parseInt(request.getParameter("id"));

        ProductDAO productDao = new ProductDAO();
        FavoriteDAO favoriteDAO = new FavoriteDAO();

        Product product = productDao.getProductDetail(productId);
        List<Product> sameProductList = productDao.getSameProducts(productId);
        Customer customer = (Customer) request.getSession().getAttribute("currentUser");
        boolean isFavorite = (customer != null) ? favoriteDAO.isFavorite(productId, customer.getCustomerId()) : false;

        request.setAttribute("product", product);
        request.setAttribute("isFavorite", isFavorite);
        request.setAttribute("sameProductList", sameProductList);
        request.getRequestDispatcher("productDetail.jsp").forward(request, response);

    }
}
