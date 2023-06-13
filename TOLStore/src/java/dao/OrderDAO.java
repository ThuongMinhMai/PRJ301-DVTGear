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

    public List<Order> getAllOrders(int id, String filterBy) {

        System.out.println(filterBy);

        List<Order> orderList = new ArrayList<>();
        String query = "SELECT o.orderId, o.date, o.status, op.quantity, op.price, "
                + "p.[name] AS productName, p.images AS productImages, p.productId, p.storage "
                + "FROM [Order] o "
                + "INNER JOIN OrderProducts op ON o.orderId = op.orderId "
                + "INNER JOIN Product p ON op.productId = p.productId "
                + "WHERE o.customerId = " + id;

        if (filterBy != null) {
            query += " AND o.status = '" + filterBy + "'";
        }

        query += " ORDER BY o.date DESC";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                int orderId = rs.getInt("orderId");
                Date date = rs.getDate("date");
                Status status = Status.valueOf(rs.getString("status"));
                int quantity = rs.getInt("quantity");
                int price = rs.getInt("price");
                int totalMoney = quantity * price;
//public Product(int id, String name, Category category, Brand brand, String images, int price, String description, int storage)
                Product product = new Product(
                        rs.getInt("productId"), // You don't need productId in this case, so set it to 0 or any default value
                        rs.getString("productName"),
                        null, // You don't need category information, so set it to null
                        null, // You don't need brand information, so set it to null
                        rs.getString("productImages"),
                        0,// You don't need the current price, so set it to 0 or any default value
                        null,
                        0 // You don't need the storages
                );

                Order order = null;
                for (Order o : orderList) {
                    if (o.getId() == orderId) {
                        order = o;
                        break;
                    }
                }

                if (order == null) {
                    order = new Order(orderId, null, date, status, new ArrayList<>());
                    orderList.add(order);
                }

                order.getOrderProducts().add(new OrderProduct(product, quantity, price));
                order.setTotalMoney(order.getTotalMoney() + totalMoney);
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

    public void updateStatusOrder(int orderId, String type) {

        System.out.println(orderId);
        System.out.println(type);

        String updateQuery = "UPDATE [Order] SET [status] = ? WHERE orderId = ?";
        try (Connection conn = new DBContext().getConnection();
                PreparedStatement updatePs = conn.prepareStatement(updateQuery)) {

            String currentStatus = getCurrentStatus(conn, orderId);

            if (type.equals("CANCELLED") && currentStatus.equals("PROCESSING")) {
                updatePs.setString(1, "CANCELLED");
                updatePs.setInt(2, orderId);
                int rowsUpdated = updatePs.executeUpdate();
                if (rowsUpdated > 0) {
                    System.out.println("Order status updated to CANCELLED.");
                } else {
                    System.out.println("Failed to update order status.");
                }
            } else if (type.equals("COMPLETE") && currentStatus.equals("DELIVERING")) {
                updatePs.setString(1, "COMPLETE");
                updatePs.setInt(2, orderId);
                int rowsUpdated = updatePs.executeUpdate();
                if (rowsUpdated > 0) {
                    System.out.println("Order status updated to COMPLETE.");
                } else {
                    System.out.println("Failed to update order status.");
                }
            } else if (type.equals("DELIVERING") && currentStatus.equals("PROCESSING")) {
                updatePs.setString(1, "DELIVERING");
                updatePs.setInt(2, orderId);
                int rowsUpdated = updatePs.executeUpdate();
                if (rowsUpdated > 0) {
                    System.out.println("Order status updated to DELIVERING.");
                } else {
                    System.out.println("Failed to update order status.");
                }
            } else {
                System.out.println("Invalid update type or order status.");
            }
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    private String getCurrentStatus(Connection conn, int orderId) throws SQLException {
        String statusQuery = "SELECT [status] FROM [Order] WHERE orderId = ?";
        try (PreparedStatement statusPs = conn.prepareStatement(statusQuery)) {
            statusPs.setInt(1, orderId);
            try (ResultSet rs = statusPs.executeQuery()) {
                if (rs.next()) {
                    return rs.getString("status");
                }
            }
        }
        throw new IllegalArgumentException("Invalid order ID: " + orderId);
    }

    public String approveOrder(int orderId) {
        String getProductQuery = "SELECT op.productId, op.quantity, p.storage "
                + "FROM OrderProducts op "
                + "INNER JOIN Product p ON op.productId = p.productId "
                + "WHERE op.orderId = ?";

        String updateStorageQuery = "UPDATE Product "
                + "SET storage = storage - ? "
                + "WHERE productId = ?";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement getProductPs = conn.prepareStatement(getProductQuery);
                PreparedStatement updateStoragePs = conn.prepareStatement(updateStorageQuery)) {
            conn.setAutoCommit(false); // Enable transaction

            getProductPs.setInt(1, orderId);
            ResultSet rs = getProductPs.executeQuery();

            boolean storageSuitable = true;

            while (rs.next()) {
                int productId = rs.getInt("productId");
                int quantity = rs.getInt("quantity");
                int storage = rs.getInt("storage");

                // Check if the available storage is sufficient
                if (storage < quantity) {
                    storageSuitable = false;
                    break;
                }

                // Update the storage for the product
                updateStoragePs.setInt(1, quantity);
                updateStoragePs.setInt(2, productId);
                updateStoragePs.addBatch();
            }

            rs.close();

            // If the storage is suitable, update the order status to "DELIVERING" and update the storage
            if (storageSuitable) {
                updateStatusOrder(orderId, "DELIVERING");
                updateStoragePs.executeBatch(); // Move the executeBatch() here
                conn.commit(); // Commit the transaction
                return "Order approved and storage updated successfully.";
            } else {
                // Handle the situation where storage is not suitable (e.g., display an error message)
                conn.rollback(); // Rollback the transaction
                return "Insufficient storage for some products. Order cannot be approved.";
            }
        } catch (Exception e) {
            System.out.println(e);
            return "An error occurred during order approval.";
        }
    }

}
