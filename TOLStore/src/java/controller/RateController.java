package controller;

import dao.RateDAO;
import model.Customer;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "RateController", urlPatterns = {"/rate"})
public class RateController extends HttpServlet {

    //add rate
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        //check login
        Customer customer = (Customer) request.getSession().getAttribute("currentUser");
        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }

        //if loged
        int productId = Integer.parseInt(request.getParameter("productId"));
        int customerId = customer.getCustomerId();
        int rateValue = Integer.parseInt(request.getParameter("rateValue"));
        String rateContent = request.getParameter("rateContent");

        RateDAO rateDao = new RateDAO();
        rateDao.addRate(productId, customerId, rateContent, rateValue);

        //response to the added rate of the customer
        response.sendRedirect("http://localhost:8080/store/products?id=" + productId + "#rateSection");
    }

}
