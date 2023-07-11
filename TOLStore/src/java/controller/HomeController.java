package controller;

import dao.BannerDAO;
import dao.ProductDAO;
import model.FetchResult;
import model.Product;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "HomeServlet", urlPatterns = {""})
public class HomeController extends HttpServlet {

  //get home page with 20 newest products
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    ProductDAO productDAO = new ProductDAO();
    BannerDAO bannerDAO = new BannerDAO();

    FetchResult<Product> fetchData = productDAO.getSearchedProducts(null, null, null, null, 1, 20);

    request.setAttribute("productList", fetchData.getItems());
    request.setAttribute("bannerUrls", bannerDAO.getBanner());
    request.getRequestDispatcher("home.jsp").forward(request, response);

  }

}
