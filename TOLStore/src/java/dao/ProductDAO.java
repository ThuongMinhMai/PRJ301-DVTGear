/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import context.DBContext;
import model.Brand;
import model.Category;
import model.Customer;
import model.Product;
import model.Rate;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.FetchResult;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Kingc
 */
public class ProductDAO {

    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;

    public Product getProductDetail(int id) {
        Product product = null;
        String query = "SELECT p.productId, p.name, c.name AS category, b.name AS brand, p.description, p.images, p.price, p.categoryId, p.brandId, p.storage, r.content, r.value, cust.customerId, cust.avatarUrl, cust.username, cust.password "
                + "FROM Product p "
                + "INNER JOIN Brand b ON p.brandId = b.brandId "
                + "INNER JOIN Category c ON p.categoryId = c.categoryId "
                + "LEFT JOIN Rate r ON p.productId = r.productId "
                + "LEFT JOIN Customer cust ON r.customerId = cust.customerId "
                + "WHERE p.productId = ?";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                int productId = rs.getInt("productId");
                String productName = rs.getString("name");
                Category category = new Category(rs.getInt("categoryId"), rs.getString("category"));
                Brand brand = new Brand(rs.getInt("brandId"), rs.getString("brand"));
                String description = rs.getString("description");
                String images = rs.getString("images");
                int price = rs.getInt("price");
                int storage = rs.getInt("storage");

                // Create a new Product instance
                product = new Product(productId, productName, category, brand, images, price, description, storage);

                // Create a list to store rate objects
                List<Rate> rateList = new ArrayList<>();

                // Retrieve rate and customer details from the result set
                do {
                    String content = rs.getString("content");
                    int value = rs.getInt("value");

                    // Retrieve customer details
                    int customerId = rs.getInt("customerId");
                    String avatarUrl = rs.getString("avatarUrl");
                    String username = rs.getString("username");

//                    do not need password
//                    String password = rs.getString("password");
                    // Create a new Customer instance
                    Customer customer = new Customer(customerId, username, null, avatarUrl);

                    // Create a new Rate instance
                    Rate rate = new Rate(customer, product, content, value);

                    // Add the rate to the rate list
                    if (customerId != 0) {
                        rateList.add(rate);
                    }
                } while (rs.next());

                // Set the rate list of the product
                product.setRateList(rateList);
            }
        } catch (Exception e) {
            System.err.println(e);
        }
        return product;
    }

    //get products that same category or brand. Maximum 8 products.
    public List<Product> getSameProducts(int productId) {
        List<Product> sameProducts = new ArrayList<>();

        String query = "SELECT TOP 8 p.productId, p.name, c.name AS category, b.name AS brand, p.description, "
                + "p.images, p.price, p.categoryId, p.brandId, p.storage "
                + "FROM Product p "
                + "INNER JOIN Brand b ON p.brandId = b.brandId "
                + "INNER JOIN Category c ON p.categoryId = c.categoryId "
                + "WHERE (p.categoryId = (SELECT categoryId FROM Product WHERE productId = ?) "
                + "OR p.brandId = (SELECT brandId FROM Product WHERE productId = ?)) "
                + "AND p.productId != ?";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setInt(1, productId);
            ps.setInt(2, productId);
            ps.setInt(3, productId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                sameProducts.add(new Product(
                        rs.getInt("productId"),
                        rs.getString("name"),
                        new Category(rs.getInt("categoryId"), rs.getString("category")),
                        new Brand(rs.getInt("brandId"), rs.getString("brand")),
                        rs.getString("images"),
                        rs.getInt("price"),
                        rs.getString("description"),
                        rs.getInt("storage")
                ));
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return sameProducts;
    }

    public FetchResult<Product> getAllProducts(int pageNumber, int pageSize, String searchQuery) {
        List<Product> productList = new ArrayList<>();
        int totalProducts = 0;

        String countQuery = "SELECT COUNT(*) AS total FROM Product";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement countPs = conn.prepareStatement(countQuery);
                ResultSet countRs = countPs.executeQuery()) {

            if (countRs.next()) {
                totalProducts = countRs.getInt("total");
            }

            String query = "SELECT p.productId, p.name, c.name AS category, b.name AS brand, p.description, p.images, p.price, p.categoryId, p.brandId, p.storage\n"
                    + "FROM Product p\n"
                    + "INNER JOIN Brand b ON p.brandId = b.brandId\n"
                    + "INNER JOIN Category c ON p.categoryId = c.categoryId\n";

            if (searchQuery != null && !searchQuery.isEmpty()) {
                query += "WHERE p.name LIKE ?\n";  // Add search query filter
            }

            query += "ORDER BY p.productId\n"
                    + "OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";

            try (PreparedStatement ps = conn.prepareStatement(query)) {
                int parameterIndex = 1;
                if (searchQuery != null && !searchQuery.isEmpty()) {
                    ps.setString(parameterIndex++, "%" + searchQuery + "%");  // Set the search query parameter
                }
                int offset = (pageNumber - 1) * pageSize;
                ps.setInt(parameterIndex++, offset);
                ps.setInt(parameterIndex, pageSize);

                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        productList.add(new Product(
                                rs.getInt("productId"),
                                rs.getString("name"),
                                new Category(rs.getInt("categoryId"), rs.getString("category")),
                                new Brand(rs.getInt("brandId"), rs.getString("brand")),
                                rs.getString("images"),
                                rs.getInt("price"),
                                rs.getString("description"),
                                rs.getInt("storage")
                        ));
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return new FetchResult<>(productList, totalProducts);
    }

    public FetchResult<Product> getSearchedProducts(String searchTerm, String categoryId, String brandId, String sortBy, int page, int pageSize) {
        List<Product> searchedProducts = new ArrayList<>();
        int totalCount = 0;

        StringBuilder queryBuilder = new StringBuilder("SELECT p.productId,p.name,c.name AS category,b.name AS brand,p.description,p.images,p.price,p.categoryId,p.brandId,p.storage\n")
                .append("FROM Product p\n")
                .append("INNER JOIN Brand b ON p.brandId=b.brandId\n")
                .append("INNER JOIN Category c ON p.categoryId = c.categoryId\n")
                .append("WHERE 1=1");

        if (searchTerm != null && !searchTerm.isEmpty()) {
            queryBuilder.append(" AND LOWER(p.name) LIKE ?");
        }

        if (categoryId != null && !categoryId.isEmpty()) {
            queryBuilder.append(" AND p.categoryId = ?");
        }

        if (brandId != null && !brandId.isEmpty()) {
            queryBuilder.append(" AND p.brandId = ?");
        }

        if (sortBy != null && !sortBy.isEmpty()) {
            switch (sortBy) {
                case "name":
                    queryBuilder.append(" order by p.name");
                    break;
                case "price":
                    queryBuilder.append(" order by p.price");
                    break;
                case "nameDesc":
                    queryBuilder.append(" order by p.name desc");
                    break;
                case "priceDesc":
                    queryBuilder.append(" order by p.price desc");
                    break;
                default: //newest
                    queryBuilder.append(" order by p.productId desc"); // Sort in descending order from original records
                    break;
                // Add more cases for additional sorting options if needed
            }
        }

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(queryBuilder.toString())) {

            int parameterIndex = 1;

            if (searchTerm != null && !searchTerm.isEmpty()) {
                ps.setString(parameterIndex++, "%" + searchTerm.toLowerCase() + "%");
            }

            if (categoryId != null && !categoryId.isEmpty()) {
                ps.setString(parameterIndex++, categoryId);
            }

            if (brandId != null && !brandId.isEmpty()) {
                ps.setString(parameterIndex++, brandId);
            }

            ResultSet rs = ps.executeQuery();

            // Count the total number of rows in the result set
            // Apply pagination
            int startIndex = (page - 1) * pageSize;
            int endIndex = startIndex + pageSize - 1;
            int currentRow = 0;

            while (rs.next()) {

                if (currentRow >= startIndex && currentRow <= endIndex) {
                    searchedProducts.add(new Product(
                            rs.getInt("productId"),
                            rs.getString("name"),
                            new Category(rs.getInt("categoryId"), rs.getString("category")),
                            new Brand(rs.getInt("brandId"), rs.getString("brand")),
                            rs.getString("images"),
                            rs.getInt("price"),
                            rs.getString("description"),
                            rs.getInt("storage")
                    ));
                }
                currentRow++;
                totalCount++;
            }

        } catch (Exception e) {
            System.out.println(e);
        }

        return new FetchResult<>(searchedProducts, totalCount);
    }

    public List<Product> getFavoriteProducts(int customerId) {
        List<Product> favoriteProducts = new ArrayList<>();
        String query = "SELECT p.productId, p.name, c.name AS category, b.name AS brand, p.description, p.images, p.price, p.categoryId, p.brandId, p.storage\n"
                + "FROM Product p\n"
                + "INNER JOIN Brand b ON p.brandId = b.brandId\n"
                + "INNER JOIN Category c ON p.categoryId = c.categoryId\n"
                + "INNER JOIN Favorite f ON p.productId = f.productId\n"
                + "WHERE f.customerId = ?";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setInt(1, customerId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                favoriteProducts.add(new Product(
                        rs.getInt("productId"),
                        rs.getString("name"),
                        new Category(rs.getInt("categoryId"), rs.getString("category")),
                        new Brand(rs.getInt("brandId"), rs.getString("brand")),
                        rs.getString("images"),
                        rs.getInt("price"),
                        rs.getString("description"),
                        rs.getInt("storage")
                ));
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return favoriteProducts;
    }

    public List<Product> getCartProducts(JSONObject jsonObject) {
        List<Product> productList = new ArrayList<>();
        JSONArray productIdList = jsonObject.getJSONArray("products");

        if (productIdList.length() == 0) {
            return productList; // Return an empty list if no products are provided
        }

        StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("SELECT p.productId, p.name,p.storage, c.name AS category, b.name AS brand, ");
        queryBuilder.append("p.description, p.images, p.price, p.categoryId, p.brandId ");
        queryBuilder.append("FROM Product p ");
        queryBuilder.append("INNER JOIN Brand b ON p.brandId = b.brandId ");
        queryBuilder.append("INNER JOIN Category c ON p.categoryId = c.categoryId ");
        queryBuilder.append("WHERE p.productId IN (");

        for (int i = 0; i < productIdList.length(); i++) {
            queryBuilder.append(productIdList.getInt(i));
            if (i < productIdList.length() - 1) {
                queryBuilder.append(", ");
            }
        }

        queryBuilder.append(")");

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(queryBuilder.toString());
                ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                productList.add(new Product(
                        rs.getInt("productId"),
                        rs.getString("name"),
                        new Category(rs.getInt("categoryId"), rs.getString("category")),
                        new Brand(rs.getInt("brandId"), rs.getString("brand")),
                        rs.getString("images"),
                        rs.getInt("price"),
                        rs.getString("description"),
                        rs.getInt("storage")
                ));
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return productList;
    }

    public void createProduct(JSONObject jsonObject) {
        String query = "INSERT INTO Product ([name], categoryId, brandId, [description], price, images, storage) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setString(1, jsonObject.getString("name"));
            ps.setInt(2, jsonObject.getInt("category"));
            ps.setInt(3, jsonObject.getInt("brand"));
            ps.setNString(4, jsonObject.getString("description"));
            ps.setInt(5, jsonObject.getInt("price"));
            ps.setString(6, jsonObject.getJSONArray("images").toString());
            ps.setInt(7, jsonObject.getInt("storage"));

            System.out.println(ps.toString());

            int rowsInserted = ps.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("New product inserted successfully.");
            } else {
                System.out.println("Failed to insert the new product.");
            }
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    public void updateProduct(JSONObject jsonObject) {
        String query = "UPDATE Product SET [name] = ?, categoryId = ?, brandId = ?, [description] = ?, price = ?, images = ?, storage= ? WHERE productId = ?";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setString(1, jsonObject.getString("name"));
            ps.setInt(2, jsonObject.getInt("category"));
            ps.setInt(3, jsonObject.getInt("brand"));
            ps.setString(4, jsonObject.getString("description"));
            ps.setInt(5, jsonObject.getInt("price"));
            ps.setString(6, jsonObject.getJSONArray("images").toString());
            ps.setInt(7, jsonObject.getInt("storage"));
            ps.setInt(8, jsonObject.getInt("id"));

            int rowsUpdated = ps.executeUpdate();

            if (rowsUpdated > 0) {
                System.out.println("Product updated successfully.");
            } else {
                System.out.println("Failed to update the product.");
            }
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    public void deleteProduct(JSONObject jsonObject) {
        String query = "DELETE FROM Product \n"
                + "WHERE productId = ?";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, jsonObject.getInt("id"));

            int rowsUpdated = ps.executeUpdate();

            if (rowsUpdated > 0) {
                System.out.println("Product deleted successfully.");
            } else {
                System.out.println("Failed to deleted the product.");
            }
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
