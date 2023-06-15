package controller;

import dao.OrderDAO;
import entity.Customer;
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
import org.json.JSONObject;

@WebServlet(name = "OrderController", urlPatterns = {"/orders"})
public class OrderController extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        Customer customer = (Customer) request.getSession().getAttribute("currentUser");
        String filterBy = request.getParameter("filter_by");
        
        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }
        
        OrderDAO orderDAO = new OrderDAO();
        List<Order> orderList = orderDAO.getAllCustomerOrders(customer.getCustomerId(), filterBy);
        
        request.setAttribute("orderList", orderList);
        
        request.getRequestDispatcher("orders.jsp").forward(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        Customer customer = (Customer) request.getSession().getAttribute("currentUser");
        
        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }
        
        String phone = request.getParameter("phone");
        String address = request.getParameter("address");
        String products = request.getParameter("products");
        String receiver = request.getParameter("receiver");
        
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("phone", phone);
        jsonObject.put("address", address);
        jsonObject.put("receiver", receiver);
        jsonObject.put("products", new JSONObject(products));
        jsonObject.put("customerId", customer.getCustomerId());
        
        OrderDAO orderDAO = new OrderDAO();
        orderDAO.createOrder(jsonObject);
        
        response.sendRedirect("/store/orders");
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
        orderDAO.updateStatusOrder(jsonObject.getInt("orderId"), jsonObject.getString("typeUpdate"));
        
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Update orders status succesfully!");
        
        response.getWriter().write(jsonResponse.toString());
        
    }
    
}
