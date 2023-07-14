package dao;

import context.DBContext;
import model.*;
import model.Order.Status;
import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDAO {

    Connection conn = null;
    PreparedStatement ps = null;

    ResultSet rs = null;

    public Order getOrderDetail(int orderId) {
	Order order = null;
	String query = "SELECT cus.username, o.date, o.receiver, o.address, o.phone, o.status, op.quantity, op.price, " + "p.[name] AS productName, p.images AS productImages, p.productId, p.storage, " + "CASE WHEN r.productId IS NOT NULL THEN 1 ELSE 0 END AS isRated " + "FROM [Order] o " + "INNER JOIN OrderProducts op ON o.orderId = op.orderId " + "INNER JOIN Customer cus ON o.customerId = cus.customerId " + "INNER JOIN Product p ON op.productId = p.productId " + "LEFT JOIN Rate r ON r.productId = p.productId AND r.customerId = cus.customerId " + "WHERE o.orderId = ? " + "ORDER BY o.date DESC";

	try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {

	    ps.setInt(1, orderId);
	    ResultSet rs = ps.executeQuery();

	    while (rs.next()) {
		if (order == null) {
		    String receiver = rs.getString("receiver");
		    String phone = rs.getString("phone");
		    String address = rs.getString("address");
		    String username = rs.getString("username");
		    Date date = rs.getDate("date");
		    Status status = Status.valueOf(rs.getString("status"));

		    order = new Order(orderId, username, date, status, receiver, address, phone);
		    order.setOrderProducts(new ArrayList<>());
		}

		int quantity = rs.getInt("quantity");
		int price = rs.getInt("price");
		int totalMoney = quantity * price;
		boolean isRated = rs.getInt("isRated") == 1;

		Product product = new Product(rs.getInt("productId"), rs.getString("productName"), null, null, rs.getString("productImages"), 0, null, 0);

		OrderProduct orderProduct = new OrderProduct(product, quantity, price);
		orderProduct.setIsRated(isRated);

		order.getOrderProducts().add(orderProduct);
		order.setTotalMoney(order.getTotalMoney() + totalMoney);
	    }
	} catch (Exception e) {
	    System.out.println(e);
	}

	return order;
    }

    public FetchResult<Order> getAllOrders(int page, int pageSize, String searchQuery, String searchType) {
	List<Order> orderList = new ArrayList<>();
	int totalCount = 0;
	String query = "SELECT o.orderId, cus.username, o.date, o.receiver, o.address, o.phone, o.status, op.quantity, op.price, " + "p.[name] AS productName, p.images AS productImages, p.productId, p.storage, " + "CASE WHEN r.productId IS NOT NULL THEN 1 ELSE 0 END AS isRated " + "FROM [Order] o " + "INNER JOIN OrderProducts op ON o.orderId = op.orderId " + "INNER JOIN Customer cus ON o.customerId = cus.customerId " + "INNER JOIN Product p ON op.productId = p.productId " + "LEFT JOIN Rate r ON r.productId = p.productId AND r.customerId = cus.customerId";

	if (searchQuery != null && !searchQuery.isEmpty() && searchType != null && !searchType.isEmpty()) {
	    switch (searchType) {
		case "phone":
		    query += " WHERE o.phone LIKE ?";
		    break;
		case "receiver":
		    query += " WHERE o.receiver LIKE ?";
		    break;
		case "customer":
		    query += " WHERE cus.username LIKE ?";
		    break;
		default:
		    break;
	    }
	}

	query += " ORDER BY o.date DESC";

	try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {

	    if (searchQuery != null && !searchQuery.isEmpty()) {
		ps.setString(1, "%" + searchQuery + "%");  // Set the search query parameter
	    }

	    try (ResultSet rs = ps.executeQuery()) {
		while (rs.next()) {
		    int orderId = rs.getInt("orderId");
		    String receiver = rs.getString("receiver");
		    String phone = rs.getString("phone");
		    String address = rs.getString("address");
		    String username = rs.getString("username");
		    Date date = rs.getDate("date");
		    Status status = Status.valueOf(rs.getString("status"));

		    int quantity = rs.getInt("quantity");
		    int price = rs.getInt("price");
		    int totalMoney = quantity * price;
		    boolean isRated = rs.getInt("isRated") == 1;

		    Product product = new Product(rs.getInt("productId"), rs.getString("productName"), null, null, rs.getString("productImages"), 0, null, 0);

		    Order order = null;
		    for (Order o : orderList) {
			if (o.getId() == orderId) {
			    order = o;
			    break;
			}
		    }

		    if (order == null) {
			order = new Order(orderId, username, date, status, receiver, address, phone);
			order.setOrderProducts(new ArrayList<>());
			orderList.add(order);
			totalCount++;
		    }

		    OrderProduct orderProduct = new OrderProduct(product, quantity, price);
		    orderProduct.setIsRated(isRated);

		    order.getOrderProducts().add(orderProduct);
		    order.setTotalMoney(order.getTotalMoney() + totalMoney);
		}
	    }
	} catch (Exception e) {
	    System.out.println(e);
	}

	int startIndex = (page - 1) * pageSize;
	int endIndex = Math.min(startIndex + pageSize, orderList.size());

	List<Order> pagedOrderList;

	if (endIndex < startIndex) {
	    pagedOrderList = new ArrayList<>();
	} else {
	    pagedOrderList = orderList.subList(startIndex, endIndex);
	}

	return new FetchResult<>(pagedOrderList, totalCount);
    }

    public FetchResult<Order> getAllCustomerOrders(int customerId, String filterBy, int page, int pageSize) {
	System.out.println(filterBy);

	int totalCount = 0;
	List<Order> orderList = new ArrayList<>();
	String query = "SELECT o.orderId, cus.username ,o.date, o.receiver, o.address, o.phone, o.status, op.quantity, op.price, " + "p.[name] AS productName, p.images AS productImages, p.productId, p.storage, " + "CASE WHEN r.productId IS NOT NULL THEN 1 ELSE 0 END AS isRated " + "FROM [Order] o " + "INNER JOIN OrderProducts op ON o.orderId = op.orderId " + "INNER JOIN Customer cus ON o.customerId = cus.customerId " + "INNER JOIN Product p ON op.productId = p.productId " + "LEFT JOIN Rate r ON r.productId = p.productId AND r.customerId = " + customerId + " WHERE o.customerId = " + customerId;

	if (filterBy != null) {
	    query += " AND o.status = '" + filterBy + "'";
	}

	query += " ORDER BY o.date DESC";

	try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query); ResultSet rs = ps.executeQuery()) {

	    while (rs.next()) {
		int orderId = rs.getInt("orderId");
		String receiver = rs.getString("receiver");
		String phone = rs.getString("phone");
		String address = rs.getString("address");
		String customer = rs.getString("username");
		Date date = rs.getDate("date");
		Status status = Status.valueOf(rs.getString("status"));

		int quantity = rs.getInt("quantity");
		int price = rs.getInt("price");
		int totalMoney = quantity * price;
		boolean isRated = rs.getInt("isRated") == 1;

		Product product = new Product(rs.getInt("productId"), rs.getString("productName"), null, null, rs.getString("productImages"), 0, null, 0);

		Order order = null;
		for (Order o : orderList) {
		    if (o.getId() == orderId) {
			order = o;
			break;
		    }
		}

		if (order == null) {
		    //Order(int id, String customer, Date date, Status status, String receiver, String address, String phone)

		    order = new Order(orderId, customer, date, status, receiver, address, phone);
		    order.setOrderProducts(new ArrayList<>());
		    orderList.add(order);
		    totalCount++;
		}

		//public OrderProduct(Product product, int quantity, int price)
		OrderProduct orderProuduct = new OrderProduct(product, quantity, price);
		orderProuduct.setIsRated(isRated);

		order.getOrderProducts().add(orderProuduct);
		order.setTotalMoney(order.getTotalMoney() + totalMoney);

	    }
	} catch (Exception e) {
	    System.out.println(e);
	}

	int orderListSize = orderList.size();
	int startIndex = (page - 1) * pageSize;
	if (startIndex > orderListSize - 1) {
	    return new FetchResult<>(new ArrayList<>(), totalCount);
	}

	int endIndex = startIndex + pageSize - 1;
	if (endIndex > orderListSize - 1) {
	    endIndex = orderListSize - 1;
	}

	return new FetchResult<>(orderList.subList(startIndex, endIndex + 1), totalCount);
    }

    public void createOrder(JSONObject jsonObject) {
	String address = jsonObject.getString("address");
	String receiver = jsonObject.getString("receiver");
	String phone = jsonObject.getString("phone");
	int customerId = jsonObject.getInt("customerId");
	JSONObject productsObj = jsonObject.getJSONObject("products");

	String orderQuery = "INSERT INTO [Order] (customerId, phone, address, [date], [status], receiver) VALUES (?, ?, ?, GETDATE(), 'PROCESSING',?)";
	try (Connection conn = new DBContext().getConnection(); PreparedStatement orderPs = conn.prepareStatement(orderQuery, Statement.RETURN_GENERATED_KEYS)) {

	    orderPs.setInt(1, customerId);
	    orderPs.setString(2, phone);
	    orderPs.setString(3, address);
	    orderPs.setString(4, receiver);

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
	try (Connection conn = new DBContext().getConnection(); PreparedStatement updatePs = conn.prepareStatement(updateQuery)) {

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

    public MutationResult approveOrder(int orderId) {
	String getProductQuery = "SELECT op.productId, op.quantity, p.storage " + "FROM OrderProducts op " + "INNER JOIN Product p ON op.productId = p.productId " + "WHERE op.orderId = ?";

	String updateStorageQuery = "UPDATE Product " + "SET storage = storage - ? " + "WHERE productId = ?";

	try (Connection conn = new DBContext().getConnection(); PreparedStatement getProductPs = conn.prepareStatement(getProductQuery); PreparedStatement updateStoragePs = conn.prepareStatement(updateStorageQuery)) {
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
		System.out.println("suitable");
		updateStatusOrder(orderId, "DELIVERING");
		updateStoragePs.executeBatch(); // Move the executeBatch() here
		conn.commit(); // Commit the transaction
		return new MutationResult(true, "Order approved and storage updated successfully.");
	    } else {
		// Handle the situation where storage is not suitable (e.g., display an error message)
		conn.rollback(); // Rollback the transaction
		return new MutationResult(false, "Insufficient storage for some products. Order cannot be approved.");
	    }
	} catch (Exception e) {
	    System.out.println(e);
	    return new MutationResult(false, "An error occurred during order approval.");
	}
    }

    public void deleteOrder(JSONObject jsonObject) {
	String query = "DELETE FROM [Order] \n" + "WHERE orderId = ?";

	System.out.println(jsonObject.getInt("id"));
	try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {
	    ps.setInt(1, jsonObject.getInt("id"));

	    int rowsUpdated = ps.executeUpdate();

	    if (rowsUpdated > 0) {
		System.out.println("Order deleted successfully.");
	    } else {
		System.out.println("Failed to deleted the order.");
	    }
	} catch (Exception e) {
	    System.err.println(e);
	}
    }

    private List<double[]> getRevenueChartData(int numDays) {
	List<double[]> chartData = new ArrayList<>();

	String query = "SELECT CAST(CONVERT(DATE, o.date) AS DATETIME) AS orderDate, COALESCE(SUM(op.quantity * op.price), 0) AS revenue " + "FROM [Order] o " + "INNER JOIN OrderProducts op ON o.orderId = op.orderId " + "WHERE o.[status] = 'COMPLETE' AND o.[date] >= DATEADD(DAY, -?, GETDATE()) " + "GROUP BY CAST(CONVERT(DATE, o.date) AS DATETIME) " + "ORDER BY CAST(CONVERT(DATE, o.date) AS DATETIME) ASC";

	try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {

	    ps.setInt(1, numDays);
	    ResultSet rs = ps.executeQuery();

	    while (rs.next()) {
		Timestamp orderDate = rs.getTimestamp("orderDate");
		double revenue = rs.getDouble("revenue");

		long timestamp = orderDate.getTime();
		chartData.add(new double[]{timestamp, revenue});
	    }

	} catch (Exception e) {
	    System.err.println(e);
	}

	return chartData;
    }

    public double calculateTotalRevenue(int numDays) {
	List<double[]> chartData = getRevenueChartData(numDays);
	double totalRevenue = 0;

	for (double[] data : chartData) {
	    totalRevenue += data[1]; // Revenue is stored at index 1
	}

	return totalRevenue;
    }

    public JSONArray getRevenueDataAtJson(int days) {

	List<double[]> chartData = getRevenueChartData(days);

	// Create a JSON array to store the chart data
	JSONArray jsonArray = new JSONArray();
	for (double[] dataPoint : chartData) {
	    long timestamp = (long) dataPoint[0];
	    double revenue = dataPoint[1];

	    // Create a JSON object for each data point
	    JSONObject jsonObject = new JSONObject();
	    jsonObject.put("timestamp", timestamp);
	    jsonObject.put("revenue", revenue);

	    jsonArray.put(jsonObject);
	}
	return jsonArray;
    }

}
