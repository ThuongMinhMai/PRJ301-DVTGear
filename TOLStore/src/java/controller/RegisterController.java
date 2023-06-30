package controller;

import dao.CustomerDAO;
import model.Customer;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.Utils;

@WebServlet(name = "RegisterServlet", urlPatterns = {"/register"})
public class RegisterController extends HttpServlet {

    //get register page
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("register.jsp").forward(request, response);
    }

    //register customer
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");

        //check missing value
        if (username.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
            request.setAttribute("errorMessage", "Missing username or/and password or/and confirm password!");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }

        //check psssword match with confirm password
        if (!password.equals(confirmPassword)) {
            request.setAttribute("errorMessage", "The password confirmation does not match!");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }

        //check already customer
        CustomerDAO dao = new CustomerDAO();
        Customer customer = dao.getCustomerByName(username);
        if (customer != null) {
            request.setAttribute("errorMessage", "Username already exists!");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }

        //everthing is good, let's create account
        String hashedPassword = Utils.sha256Hash(password);
        String avatarUrl = "https://icon-library.com/images/user-512_4557.png"; //default avatar
        Customer newCustomer = dao.createCustomer(username, hashedPassword, avatarUrl);

        request.getSession().setAttribute("currentUser", newCustomer);
        response.sendRedirect("/store");
    }
}
