/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import dao.RateDAO;
import entity.Customer;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "RateController", urlPatterns = {"/rate"})
public class RateController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Customer customer = (Customer) request.getSession().getAttribute("currentUser");

        if (customer == null) {
            response.sendRedirect("/store/login");
            return;
        }

        String productId = request.getParameter("productId");
        String rateValue = request.getParameter("rateValue");
        String rateContent = request.getParameter("rateContent");

        RateDAO rateDao = new RateDAO();
        rateDao.addRate(Integer.parseInt(productId), customer.getCustomerId(), rateContent, Integer.parseInt(rateValue));

        response.sendRedirect("/store/orders?filter_by=COMPLETE");

    }

}
