package controller;

import dao.CustomerDAO;
import model.Customer;
import java.io.IOException;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "LoginServlet", urlPatterns = {"/login"})
public class LoginController extends HttpServlet {

    //get login page
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("login.jsp").forward(request, response);
    }

    //login customer
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        //google login
        String googleLogin = request.getParameter("googleLogin");
        if (googleLogin != null) {
            String username = request.getParameter("username");
            String avatarUrl = request.getParameter("avatarUrl");

            CustomerDAO dao = new CustomerDAO();
            Customer customer = dao.getCustomerByName(username);

            if (customer == null) {
                //auto register account (only use for google login)
                customer = dao.createCustomer(username, null, avatarUrl);
            }

            request.getSession().setAttribute("currentUser", customer);
            response.sendRedirect("/store");
            return;
        }

        //normal login
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        //check missing value
        if (username.isEmpty() || password.isEmpty()) {
            request.setAttribute("errorMessage", "Missing username or password!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }
        
        //check registed
        CustomerDAO dao = new CustomerDAO();
        Customer customer = dao.getCustomerByName(username);
        if (customer == null) {
            request.setAttribute("errorMessage", "This username is not registered!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }

        //hash and check passowrd
        String hashedPassword = Utils.sha256Hash(password);
        if (!customer.getPassword().equals(hashedPassword)) {
            request.setAttribute("errorMessage", "Wrong password. Try again!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }

        //everthing is good, let's response
        request.getSession().setAttribute("currentUser", customer);
        response.sendRedirect("/store");

    }

}
