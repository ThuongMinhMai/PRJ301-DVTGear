package api;

import dao.ProductDAO;
import model.FetchResult;
import model.Product;
import org.json.JSONArray;
import org.json.JSONObject;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "ProductServlet", urlPatterns = {"/api/products"})
public class ProductAPI extends HttpServlet {

    //get products
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //data pagination 
        String page = request.getParameter("page");
        String pageSize = request.getParameter("pageSize");
        String searchQuery = request.getParameter("searchQuery");

        if (page != null && pageSize != null) {
            int pageInt = Integer.parseInt(page);
            int pageSizeInt = Integer.parseInt(pageSize);
            ProductDAO dao = new ProductDAO();
            FetchResult<Product> fetchData = dao.getAllProducts(pageInt, pageSizeInt, searchQuery);
            List<Product> productList = fetchData.getItems();
            int totalCount = fetchData.getTotalCount();

            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "Get products succesfully!");
            jsonResponse.put("products", new JSONArray(productList));
            jsonResponse.put("totalCount", totalCount);

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonResponse.toString());
        } else {
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "page and pageSize paramater is required!");

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(jsonResponse.toString());
        }

    }

    //create product
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        JSONObject requestBody = Utils.getRequestBody(request);

        ProductDAO dao = new ProductDAO();
        dao.createProduct(requestBody);

        response.setStatus(HttpServletResponse.SC_CREATED);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Create Product succesfully!!!");

        response.getWriter().write(jsonResponse.toString());
    }

    //update product
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        JSONObject requestBody = Utils.getRequestBody(request);

        try {
            ProductDAO dao = new ProductDAO();
            dao.updateProduct(requestBody);

            response.setStatus(HttpServletResponse.SC_OK);

            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "Update Product succesfully!!!");

            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}
