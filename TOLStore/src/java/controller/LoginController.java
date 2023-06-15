package controller;

import dao.CustomerDAO;
import entity.Customer;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "LoginServlet", urlPatterns = {"/login"})
public class LoginController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        
        request.getRequestDispatcher("login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if (username.isEmpty() || password.isEmpty()) {
            request.setAttribute("errorMessage", "Missing username or password!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }

        CustomerDAO dao = new CustomerDAO();
        Customer customer = dao.getCustomerByName(username);
        
        
        if (customer == null) {
            request.setAttribute("errorMessage", "This username is not registered!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }
        if (!customer.getPassword().equals(password)) {
            request.setAttribute("errorMessage", "Wrong password. Try again!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }

        request.getSession().setAttribute("currentUser", customer);
        response.sendRedirect("/store");

    }

}
