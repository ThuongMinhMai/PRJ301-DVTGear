package controller;

import dao.ProductDAO;
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

@WebServlet(name = "CartController", urlPatterns = {"/cart"})
public class CartController extends HttpServlet {

    //Get Cart Page

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");

        request.getRequestDispatcher("cart.jsp").forward(request, response);
    }

    //Post id products in cart from client, to get real products at json format
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        JSONObject body = Utils.getRequestBody(request);
        ProductDAO productDAO = new ProductDAO();

        List<Product> products = productDAO.getCartProducts(body);

        JSONObject jsonResponse = new JSONObject();

        jsonResponse.put("message", "Get cart products successfully!");
        jsonResponse.put("products", new JSONArray(products));

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.getWriter().write(jsonResponse.toString());

    }

}
