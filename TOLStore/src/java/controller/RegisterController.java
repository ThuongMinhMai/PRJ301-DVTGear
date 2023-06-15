package controller;

import dao.CustomerDAO;
import entity.Customer;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "RegisterServlet", urlPatterns = {"/register"})
public class RegisterController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("register.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");

        if (username.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
            request.setAttribute("errorMessage", "Missing username or/and password or/and confirm password!");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }

        if (!password.equals(confirmPassword)) {
            request.setAttribute("errorMessage", "The password confirmation does not match!");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }

        CustomerDAO dao = new CustomerDAO();
        Customer customer = dao.getCustomerByName(username);
        if (customer != null) {
            request.setAttribute("errorMessage", "Username already exists!");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }

        Customer newCustomer = dao.createCustomer(username, password);

        request.getSession().setAttribute("currentUser", newCustomer);
        response.sendRedirect("/store");

    }

}
