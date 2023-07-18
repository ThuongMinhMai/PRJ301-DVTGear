/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import context.DBContext;
import model.Brand;
import model.Category;
import model.FetchResult;
import model.Product;
import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Kingc
 */
public class ProductDAO {
    public Product getProductDetail(int id) {
        Product product = null;
        String query = "SELECT p.productId, p.name, c.name AS category, b.name AS brand, p.description, p.images, p.price, p.categoryId, p.brandId, p.storage FROM Product p INNER JOIN Brand b ON p.brandId = b.brandId INNER JOIN Category c ON p.categoryId = c.categoryId WHERE p.productId = ? AND [disable] = 0";

        try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {
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
            }
        } catch (Exception e) {
            System.err.println(e);
        }
        return product;
    }

    //get products that same category or brand. Maximum 8 products.
    public List<Product> getSameProducts(int productId) {
        List<Product> sameProducts = new ArrayList<>();

        String query = "SELECT TOP 8 p.productId, p.name, c.name AS category, b.name AS brand, p.description, p.images, p.price, p.categoryId, p.brandId, p.storage FROM Product p INNER JOIN Brand b ON p.brandId = b.brandId INNER JOIN Category c ON p.categoryId = c.categoryId WHERE (p.categoryId = (SELECT categoryId FROM Product WHERE productId = ?) OR p.brandId = (SELECT brandId FROM Product WHERE productId = ?)) AND p.productId != ? AND [disable] = 0";

        try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setInt(1, productId);
            ps.setInt(2, productId);
            ps.setInt(3, productId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                sameProducts.add(new Product(rs.getInt("productId"), rs.getString("name"), new Category(rs.getInt("categoryId"), rs.getString("category")), new Brand(rs.getInt("brandId"), rs.getString("brand")), rs.getString("images"), rs.getInt("price"), rs.getString("description"), rs.getInt("storage")));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return sameProducts;
    }

    public FetchResult<Product> getAllProducts(int pageNumber, int pageSize, String searchQuery) {
        List<Product> productList = new ArrayList<>();
        int totalProducts = 0;

        String countQuery = "SELECT COUNT(*) AS total FROM Product";

        if (searchQuery != null && !searchQuery.isEmpty()) {
            countQuery += " WHERE [name] LIKE " + "'%" + searchQuery + "%'\n";  // Add search query filter
        }

        try (Connection conn = new DBContext().getConnection(); PreparedStatement countPs = conn.prepareStatement(countQuery); ResultSet countRs = countPs.executeQuery()) {

            if (countRs.next()) {
                totalProducts = countRs.getInt("total");
            }

            String query = "SELECT p.productId, p.disable, p.name, c.name AS category, b.name AS brand, p.description, p.images, p.price, p.categoryId, p.brandId, p.storage\nFROM Product p\nINNER JOIN Brand b ON p.brandId = b.brandId\nINNER JOIN Category c ON p.categoryId = c.categoryId\n";

            if (searchQuery != null && !searchQuery.isEmpty()) {
                query += "WHERE p.name LIKE ?\n";  // Add search query filter
            }

            query += "ORDER BY p.productId DESC\n" + "OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";

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
                        productList.add(new Product(rs.getInt("productId"), rs.getString("name"), new Category(rs.getInt("categoryId"), rs.getString("category")), new Brand(rs.getInt("brandId"), rs.getString("brand")), rs.getString("images"), rs.getInt("price"), rs.getString("description"), rs.getInt("storage"), rs.getBoolean("disable")));
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return new FetchResult<>(productList, totalProducts);
    }

    public FetchResult<Product> getSearchedProducts(String searchTerm, String categoryId, String brandId, String sortBy, int page, int pageSize) {
        List<Product> searchedProducts = new ArrayList<>();
        int totalCount = 0;

        StringBuilder queryBuilder = new StringBuilder("SELECT p.productId,p.name,c.name AS category,b.name AS brand,p.description,p.images,p.price,p.categoryId,p.brandId,p.storage\n").append("FROM Product p\n").append("INNER JOIN Brand b ON p.brandId=b.brandId\n").append("INNER JOIN Category c ON p.categoryId = c.categoryId\n").append("WHERE p.disable = 0");

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

        try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(queryBuilder.toString())) {

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
                    searchedProducts.add(new Product(rs.getInt("productId"), rs.getString("name"), new Category(rs.getInt("categoryId"), rs.getString("category")), new Brand(rs.getInt("brandId"), rs.getString("brand")), rs.getString("images"), rs.getInt("price"), rs.getString("description"), rs.getInt("storage")));
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
        String query = "SELECT p.productId, p.name, c.name AS category, b.name AS brand, p.description, p.images, p.price, p.categoryId, p.brandId, p.storage\n" + "FROM Product p\n" + "INNER JOIN Brand b ON p.brandId = b.brandId\n" + "INNER JOIN Category c ON p.categoryId = c.categoryId\n" + "INNER JOIN Favorite f ON p.productId = f.productId\n" + "WHERE f.customerId = ? AND p.disable = 0";

        try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setInt(1, customerId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                favoriteProducts.add(new Product(rs.getInt("productId"), rs.getString("name"), new Category(rs.getInt("categoryId"), rs.getString("category")), new Brand(rs.getInt("brandId"), rs.getString("brand")), rs.getString("images"), rs.getInt("price"), rs.getString("description"), rs.getInt("storage")));
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
        queryBuilder.append("WHERE p.disable = 0 AND p.productId IN (");

        for (int i = 0; i < productIdList.length(); i++) {
            queryBuilder.append(productIdList.getInt(i));
            if (i < productIdList.length() - 1) {
                queryBuilder.append(", ");
            }
        }

        queryBuilder.append(")");

        try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(queryBuilder.toString()); ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                productList.add(new Product(rs.getInt("productId"), rs.getString("name"), new Category(rs.getInt("categoryId"), rs.getString("category")), new Brand(rs.getInt("brandId"), rs.getString("brand")), rs.getString("images"), rs.getInt("price"), rs.getString("description"), rs.getInt("storage")));
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return productList;
    }

    public void createProduct(JSONObject jsonObject) {
        String query = "INSERT INTO Product ([name], categoryId, brandId, [description], price, images, storage, [disable]) " + "VALUES (?, ?, ?, ?, ?, ?, ?, 0)";

        try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setString(1, jsonObject.getString("name"));
            ps.setInt(2, jsonObject.getInt("category"));
            ps.setInt(3, jsonObject.getInt("brand"));
            ps.setNString(4, jsonObject.getString("description"));
            ps.setInt(5, jsonObject.getInt("price"));
            ps.setString(6, jsonObject.getJSONArray("images").toString());
            ps.setInt(7, jsonObject.getInt("storage"));

            int rowsInserted = ps.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("New product inserted successfully.");
            } else {
                System.out.println("Failed to insert the new product.");
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public void updateProduct(JSONObject jsonObject) {
        String query = "UPDATE Product SET [name] = ?, categoryId = ?, brandId = ?, [description] = ?, price = ?, images = ?, storage= ?, [disable] = ? WHERE productId = ?";

        System.out.println("updateProduct" + jsonObject.getBoolean("disable"));

        try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setString(1, jsonObject.getString("name"));
            ps.setInt(2, jsonObject.getInt("category"));
            ps.setInt(3, jsonObject.getInt("brand"));
            ps.setString(4, jsonObject.getString("description"));
            ps.setInt(5, jsonObject.getInt("price"));
            ps.setString(6, jsonObject.getJSONArray("images").toString());
            ps.setInt(7, jsonObject.getInt("storage"));
            ps.setBoolean(8, jsonObject.getBoolean("disable"));
            ps.setInt(9, jsonObject.getInt("id"));

            int rowsUpdated = ps.executeUpdate();

            if (rowsUpdated > 0) {
                System.out.println("Product updated successfully.");
            } else {
                System.out.println("Failed to update the product.");
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
