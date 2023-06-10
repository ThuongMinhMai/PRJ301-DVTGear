/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import context.DBContext;
import entity.Brand;
import entity.Category;
import entity.Order.Status;
import entity.OrderAdmin;
import entity.Product;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import entity.Order;
import entity.Order.OrderProduct;
import java.sql.SQLException;
import java.sql.Statement;
import org.json.JSONObject;

/**
 *
 * @author Kingc
 */
public class OrderDAO {

    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;

    public List<OrderAdmin> getAllOrdersAPI() {
        List<OrderAdmin> orderList = new ArrayList<>();
        String query = "SELECT \n"
                + "    [Order].orderId,\n"
                + "    Customer.username,\n"
                + "    [Order].[date],\n"
                + "    [Order].[status],\n"
                + "    SUM(OrderProducts.quantity * Product.price) AS total_money\n"
                + "FROM [Order]\n"
                + "JOIN Customer ON [Order].customerId = Customer.customerId\n"
                + "JOIN OrderProducts ON [Order].orderId = OrderProducts.orderId\n"
                + "JOIN Product ON OrderProducts.productId = Product.productId\n"
                + "GROUP BY\n"
                + "    [Order].orderId,\n"
                + "    Customer.username,\n"
                + "    [Order].[date],\n"
                + "    [Order].[status];";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                orderList.add(new OrderAdmin(
                        rs.getInt("orderId"),
                        rs.getString("username"),
                        rs.getDate("date"),
                        Status.valueOf(rs.getString("status")),
                        rs.getInt("total_money")
                ));
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return orderList;
    }

    public void deleteOrder(JSONObject jsonObject) {
        int orderId = jsonObject.getInt("id");

        String deleteOrderProductsQuery = "DELETE FROM OrderProducts WHERE orderId = ?";
        String deleteOrderQuery = "DELETE FROM [Order] WHERE orderId = ?";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement psDeleteOrderProducts = conn.prepareStatement(deleteOrderProductsQuery);
                PreparedStatement psDeleteOrder = conn.prepareStatement(deleteOrderQuery)) {

            // Delete the corresponding records in OrderProducts table
            psDeleteOrderProducts.setInt(1, orderId);
            psDeleteOrderProducts.executeUpdate();

            // Delete the order from Order table
            psDeleteOrder.setInt(1, orderId);
            int rowsUpdated = psDeleteOrder.executeUpdate();

            if (rowsUpdated > 0) {
                System.out.println("Order and related records deleted successfully.");
            } else {
                System.out.println("Failed to delete the order.");
            }
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    public List<Order> getAllOrders(int id) {
        List<Order> orderList = new ArrayList<>();
        String query = "SELECT o.orderId, o.date, o.status, op.quantity, op.price, "
                + "p.name AS productName, p.images AS productImages "
                + "FROM [Order] o "
                + "INNER JOIN OrderProducts op ON o.orderId = op.orderId "
                + "INNER JOIN Product p ON op.productId = p.productId"
                + "WHERE o.customerId = " + id;

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                int orderId = rs.getInt("orderId");
                Date date = rs.getDate("date");
                Status status = Status.valueOf(rs.getString("status"));
                int quantity = rs.getInt("quantity");
                int price = rs.getInt("price");

                Product product = new Product(
                        0, // You don't need productId in this case, so set it to 0 or any default value
                        rs.getString("productName"),
                        null, // You don't need category information, so set it to null
                        null, // You don't need brand information, so set it to null
                        // You don't need the current price, so set it to 0 or any default value
                        null,
                        rs.getString("productImages"),
                        0 // Assuming you don't need the description for this method
                );

                Order order = orderList.stream()
                        .filter(o -> o.getId() == orderId)
                        .findFirst()
                        .orElse(null);

                if (order == null) {
                    order = new Order(orderId, null, date, status, new ArrayList<>());
                    orderList.add(order);
                }

                order.getOrderProducts().add(new OrderProduct(product, quantity, price));
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return orderList;
    }

    public void createOrder(JSONObject jsonObject) {
        String address = jsonObject.getString("address");
        String phone = jsonObject.getString("phone");
        int customerId = jsonObject.getInt("customerId");
        JSONObject productsObj = jsonObject.getJSONObject("products");

        // Create the Order entry in the database
        String orderQuery = "INSERT INTO [Order] (customerId, phone, address, [date], [status]) VALUES (?, ?, ?, GETDATE(), 'PROCESSING')";
        try (Connection conn = new DBContext().getConnection();
                PreparedStatement orderPs = conn.prepareStatement(orderQuery, Statement.RETURN_GENERATED_KEYS)) {

            // Assuming you have a customerId associated with the order, retrieve it here
            orderPs.setInt(1, customerId);
            orderPs.setString(2, phone);
            orderPs.setString(3, address);

            int rowsInserted = orderPs.executeUpdate();
            if (rowsInserted > 0) {
                // Get the generated order ID
                ResultSet generatedKeys = orderPs.getGeneratedKeys();
                int orderId = 0;
                if (generatedKeys.next()) {
                    orderId = generatedKeys.getInt(1);
                }

                // Create the OrderProducts entries for each product in the order
                String orderProductQuery = "INSERT INTO OrderProducts (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)";
                try (PreparedStatement orderProductPs = conn.prepareStatement(orderProductQuery)) {
                    for (String productId : productsObj.keySet()) {
                        int quantity = productsObj.getInt(productId);
                        int price = getProductPrice(conn, Integer.parseInt(productId)); // Retrieve the price of the product

                        orderProductPs.setInt(1, orderId);
                        orderProductPs.setInt(2, Integer.parseInt(productId));
                        orderProductPs.setInt(3, quantity);
                        orderProductPs.setInt(4, price);

                        orderProductPs.executeUpdate();
                    }
                    System.out.println("New order created successfully.");
                }
            } else {
                System.out.println("Failed to create the new order.");
            }
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    private int getProductPrice(Connection conn, int productId) throws SQLException {
        String priceQuery = "SELECT price FROM Product WHERE productId = ?";
        try (PreparedStatement pricePs = conn.prepareStatement(priceQuery)) {
            pricePs.setInt(1, productId);
            try (ResultSet rs = pricePs.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt("price");
                }
            }
        }
        return 0; // Default value if price is not found or an error occurs
    }

}
