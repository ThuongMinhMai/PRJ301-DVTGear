public List<Order> getAllOrders(int id, String filterBy) {
    System.out.println(filterBy);

    List<Order> orderList = new ArrayList<>();
    String query = "SELECT o.orderId, o.date, o.status, op.quantity, op.price, "
            + "p.[name] AS productName, p.images AS productImages, p.productId, p.storage, "
            + "CASE WHEN r.productId IS NOT NULL THEN 1 ELSE 0 END AS isRated "
            + "FROM [Order] o "
            + "INNER JOIN OrderProducts op ON o.orderId = op.orderId "
            + "INNER JOIN Product p ON op.productId = p.productId "
            + "LEFT JOIN Rate r ON r.productId = p.productId AND r.orderId = o.orderId AND r.customerId = " + id
            + " WHERE o.customerId = " + id;

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
            boolean isRated = rs.getInt("isRated") == 1;

            Product product = new Product(
                    rs.getInt("productId"),
                    rs.getString("productName"),
                    null,
                    null,
                    rs.getString("productImages"),
                    0,
                    null,
                    0
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
            product.setRated(isRated);
        }
    } catch (Exception e) {
        System.out.println(e);
    }

    return orderList;
}
