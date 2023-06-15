package api;

import dao.OrderDAO;
import entity.Order;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet(name = "OrderServlet", urlPatterns = {"/api/orders"})
public class OrderAPI extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String orderId = request.getParameter("orderId");

        if (orderId != null) {
            OrderDAO orderDAO = new OrderDAO();
//            OrderAdmin order = orderDAO.getOrderDetail(Integer.parseInt(orderId));

            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "Get order succesfully!");
//            jsonResponse.put("order", order);

            response.getWriter().write(jsonResponse.toString());
            return;
        }

        OrderDAO orderDao = new OrderDAO();
        List<Order> orderList = orderDao.getAllOrders();

        response.setStatus(HttpServletResponse.SC_OK);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Get orders succesfully!");
        jsonResponse.put("orders", new JSONArray(orderList));

        response.getWriter().write(jsonResponse.toString());
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(request.getInputStream(), "UTF-8")); // Specify UTF-8 encoding
        StringBuilder requestBody = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }
        reader.close();

        JSONObject jsonObject = new JSONObject(requestBody.toString());

        OrderDAO orderDAO = new OrderDAO();
        String message = orderDAO.approveOrder(jsonObject.getInt("orderId"));

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", message);

        response.getWriter().write(jsonResponse.toString());
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(request.getInputStream(), "UTF-8")); // Specify UTF-8 encoding
        StringBuilder requestBody = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }
        reader.close();

        JSONObject jsonObject = new JSONObject(requestBody.toString());

        try {
            OrderDAO dao = new OrderDAO();
//            dao.deleteOrder(jsonObject);

            response.setStatus(HttpServletResponse.SC_OK);

            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "Delete Order succesfully!!!");

            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            System.err.println(e);
        }
    }

}
