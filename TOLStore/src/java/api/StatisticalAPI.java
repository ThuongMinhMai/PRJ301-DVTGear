package api;

import dao.*;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "HistoricalAPI", urlPatterns = {"/api/statistical"})
public class StatisticalAPI extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String days = request.getParameter("historicalChartDays");

        OrderDAO orderDao = new OrderDAO();
        CustomerDAO customerDao = new CustomerDAO();
        BrandDAO brandDao = new BrandDAO();
        CategoryDAO categoryDao = new CategoryDAO();
        ProductDAO productDao = new ProductDAO();

        JSONObject jsonResponse = new JSONObject();
        if (days != null) {
            jsonResponse.put("historicalChart", orderDao.getRevenueDataAtJson(Integer.parseInt(days)));
        }
        jsonResponse.put("revenueThisWeek", orderDao.calculateTotalRevenue(7));
        jsonResponse.put("revenueThisMonth", orderDao.calculateTotalRevenue(30));
        jsonResponse.put("revenueThisYear", orderDao.calculateTotalRevenue(365));
        jsonResponse.put("totalCustomer", customerDao.getTotalCustomer());
        jsonResponse.put("totalProductsSoldByCategory", categoryDao.calculateTotalProductsSoldByCategory());
        jsonResponse.put("totalProductsSoldByBrand", brandDao.calculateTotalProductsSoldByBrand());
        jsonResponse.put("top5BestSellers", productDao.getTopBestSellers(5));
        jsonResponse.put("numberOfProcessingOrders", orderDao.getNumberOfProcessingOrders());
        jsonResponse.put("numberOfDeliveringOrders", orderDao.getNumberOfDeliveringProducts());

        response.getWriter().write(jsonResponse.toString());
    }
}
