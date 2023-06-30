package controller;

import dao.OrderDAO;
import model.Customer;
import model.Order;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.FetchResult;
import org.json.JSONArray;
import org.json.JSONObject;
import utils.Utils;

@WebServlet(name = "OrderController", urlPatterns = {"/orders"})
public class OrderController extends HttpServlet {

    //get order page, with filtered orders
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //check login
        Customer customer = (Customer) request.getSession().getAttribute("currentUser");
        String filterBy = request.getParameter("filter_by");
        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }

        String page = request.getParameter("page"); //page of pagination

        // if page is greater than 1, return orders at json format. (fetching more orders from client)
        OrderDAO orderDAO = new OrderDAO();
        if (page != null) {
            int pageInt = Integer.parseInt(page);
            if (pageInt > 1) {
                FetchResult<Order> fetchData = orderDAO.getAllCustomerOrders(customer.getCustomerId(), filterBy, pageInt, 5);

                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("message", "Get orders succesfully!");
                jsonResponse.put("itemsCount", fetchData.getTotalCount());
                jsonResponse.put("orders", new JSONArray(fetchData.getItems()));

                response.getWriter().write(jsonResponse.toString());
                return;
            }
        }

        //else, return order page with page 1
        FetchResult<Order> fetchData = orderDAO.getAllCustomerOrders(customer.getCustomerId(), filterBy, 1, 5);
        List<Order> orderList = fetchData.getItems();
        int itemsCount = fetchData.getTotalCount();

        request.setAttribute("orderList", orderList);
        request.setAttribute("itemsCount", itemsCount);
        request.getRequestDispatcher("orders.jsp").forward(request, response);
    }

    //create order
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        //check login
        Customer customer = (Customer) request.getSession().getAttribute("currentUser");
        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }

        String phone = request.getParameter("phone");
        String address = request.getParameter("address");
        String products = request.getParameter("products");
        String receiver = request.getParameter("receiver");

        JSONObject orderData = new JSONObject();
        orderData.put("phone", phone);
        orderData.put("address", address);
        orderData.put("receiver", receiver);
        orderData.put("products", new JSONObject(products));
        orderData.put("customerId", customer.getCustomerId());

        OrderDAO orderDAO = new OrderDAO();
        orderDAO.createOrder(orderData);

        response.sendRedirect("/store/orders?filter_by=PROCESSING");
    }

    //update order's status : cancelled or complete the order
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject requestBody = Utils.getRequestBody(request);
        int orderId = requestBody.getInt("orderId");
        String status = requestBody.getString("typeUpdate"); //CANCELLED OR COMPLETE

        OrderDAO orderDAO = new OrderDAO();
        orderDAO.updateStatusOrder(orderId, status);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Update orders status succesfully!");

        response.getWriter().write(jsonResponse.toString());
    }

}
