package controller;

import dao.OrderDAO;
import entity.Customer;
import java.io.IOException;
import java.io.PrintWriter;
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

        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }

        OrderDAO orderDAO = new OrderDAO();
        request.setAttribute("orderList", orderDAO.getAllOrders(customer.getCustomerId()));

        request.getRequestDispatcher("orders.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        if (request.getSession().getAttribute("currentUser") == null) {
            response.sendRedirect("/store/login");
            return;
        }

        Customer customer = (Customer) request.getSession().getAttribute("currentUser");

        String phone = request.getParameter("phone");
        String address = request.getParameter("address");
        String products = request.getParameter("products");

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("phone", phone);
        jsonObject.put("address", address);
        jsonObject.put("products", new JSONObject(products));
        jsonObject.put("customerId", customer.getCustomerId());

        OrderDAO orderDAO = new OrderDAO();
        orderDAO.createOrder(jsonObject);

        response.sendRedirect("/store/orders");
    }

}
