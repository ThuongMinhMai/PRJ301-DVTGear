package api;

import dao.OrderDAO;
import model.FetchResult;
import model.MutationResult;
import model.Order;
import org.json.JSONArray;
import org.json.JSONObject;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "OrderServlet", urlPatterns = {"/api/orders"})
public class OrderAPI extends HttpServlet {

    //get order
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        //get order detail
        String orderId = request.getParameter("orderId");
        if (orderId != null) {
            OrderDAO orderDAO = new OrderDAO();
            Order order = orderDAO.getOrderDetail(Integer.parseInt(orderId));

            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "Get order successfully!");
            jsonResponse.put("order", new JSONObject(order));

            response.getWriter().write(jsonResponse.toString());
            return;
        }

        //get all orders
        //data pagination
        String page = request.getParameter("page");
        String pageSize = request.getParameter("pageSize");
        String searchQuery = request.getParameter("searchQuery");
        String searchType = request.getParameter("searchType");

        if (page != null && pageSize != null) {
            int pageInt = Integer.parseInt(page);
            int pageSizeInt = Integer.parseInt(pageSize);
            OrderDAO orderDao = new OrderDAO();
            FetchResult<Order> fetchData = orderDao.getAllOrders(pageInt, pageSizeInt, searchQuery, searchType);
            List<Order> orderList = fetchData.getItems();
            int itemsCount = fetchData.getTotalCount();

            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "Get orders succesfully!");
            jsonResponse.put("orders", new JSONArray(orderList));
            jsonResponse.put("itemsCount", itemsCount);

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonResponse.toString());
        } else {
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "page and pageSize paramater is required!");

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(jsonResponse.toString());
        }

    }

    //approve order
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject requestBody = Utils.getRequestBody(request);

        OrderDAO orderDAO = new OrderDAO();
        MutationResult mr = orderDAO.approveOrder(requestBody.getInt("orderId"));

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", mr.getMessage());
        jsonResponse.put("isSuccess", mr.isSuccess());

        response.getWriter().write(jsonResponse.toString());
    }

//    @Override
//    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
//            throws ServletException, IOException {
//        BufferedReader reader = new BufferedReader(
//                new InputStreamReader(request.getInputStream(), "UTF-8")); // Specify UTF-8 encoding
//        StringBuilder requestBody = new StringBuilder();
//        String line;
//        while ((line = reader.readLine()) != null) {
//            requestBody.append(line);
//        }
//        reader.close();
//
//        JSONObject requestBody = new JSONObject(requestBody.toString());
//
//        OrderDAO dao = new OrderDAO();
//        dao.deleteOrder(requestBody);
//
//        response.setStatus(HttpServletResponse.SC_OK);
//
//        JSONObject jsonResponse = new JSONObject();
//        jsonResponse.put("message", "Delete Order succesfully!!!");
//
//        response.getWriter().write(jsonResponse.toString());
//
//    }
}
