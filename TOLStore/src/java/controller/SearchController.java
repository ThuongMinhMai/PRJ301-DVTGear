package controller;

import dao.ProductDAO;
import model.FetchResult;
import model.Product;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "SearchController", urlPatterns = {"/search"})
public class SearchController extends HttpServlet {

  //get search page
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String category = request.getParameter("category");
    String brand = request.getParameter("brand");
    String searchTerm = request.getParameter("searchTerm");
    String sortBy = request.getParameter("sortBy");
    String page = request.getParameter("page"); //page of pagination

    ProductDAO productDAO = new ProductDAO();

    //if page is greater than 1, return products at json format (fetching more products from client)
    if (page != null) {
      int pageInt = Integer.parseInt(page);
      if (pageInt > 1) {
        FetchResult<Product> fetchData = productDAO.getSearchedProducts(searchTerm, category, brand, sortBy, pageInt, 12);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("itemsCount", fetchData.getTotalCount());
        jsonResponse.put("products", new JSONArray(fetchData.getItems()));

        response.getWriter().write(jsonResponse.toString());
        return;
      }
    }

    //else, return product page with page 1
    FetchResult<Product> fetchData = productDAO.getSearchedProducts(searchTerm, category, brand, sortBy, 1, 12);
    List<Product> productList = fetchData.getItems();
    int itemsCount = fetchData.getTotalCount();

    request.setAttribute("productList", productList);
    request.setAttribute("itemsCount", itemsCount);
    request.getRequestDispatcher("search.jsp").forward(request, response);
  }

}
