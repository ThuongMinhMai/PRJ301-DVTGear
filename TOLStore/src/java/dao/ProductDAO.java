/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import context.DBContext;
import entity.Brand;
import entity.Category;
import entity.Product;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
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
        String query = "SELECT p.productId, p.name, c.name AS category, b.name AS brand, p.description, p.images, p.price, p.categoryId, p.brandId ,p.storage "
                + "FROM Product p "
                + "INNER JOIN Brand b ON p.brandId = b.brandId "
                + "INNER JOIN Category c ON p.categoryId = c.categoryId "
                + "WHERE p.productId = ?";

        System.out.println("getProductDetail1");

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, id);
            System.out.println("getProductDetail2");
            ResultSet rs = ps.executeQuery();
            System.out.println("getProductDetail3");
            if (rs.next()) {
                int productId = rs.getInt("productId");
                String productName = rs.getString("name");
                Category category = new Category(rs.getInt("categoryId"), rs.getString("category"));
                Brand brand = new Brand(rs.getInt("brandId"), rs.getString("brand"));
                String description = rs.getString("description");
                String images = rs.getString("images");
                int price = rs.getInt("price");
                int storage = rs.getInt("storage");
//public Product(int id, String name, Category category, Brand brand, String images, int price, String description, int storage)
                // Create a new Product instance
                product = new Product(productId, productName, category, brand, images, price, description, storage);
            }
            System.out.println("getProductDetail4");
        } catch (Exception e) {
            System.out.println("getProductDetail5");
            System.err.println(e);
        }
        System.out.println("getProductDetail6");
        return product;
    }

    public List<Product> getSameProducts(int productId) {
        List<Product> sameProducts = new ArrayList<>();

        String query = "SELECT p.productId, p.name, c.name AS category, b.name AS brand, p.description, "
                + "p.images, p.price, p.categoryId, p.brandId, p.storage "
                + "FROM Product p "
                + "INNER JOIN Brand b ON p.brandId = b.brandId "
                + "INNER JOIN Category c ON p.categoryId = c.categoryId "
                + "WHERE p.categoryId = (SELECT categoryId FROM Product WHERE productId = ?) "
                + "AND p.productId != ?";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setInt(1, productId);
            ps.setInt(2, productId);
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

    public List<Product> getAllProducts() {
        List<Product> productList = new ArrayList<>();
        String query = "select p.productId,p.name,c.name as category,b.name as brand,p.description,p.images,p.price,p.categoryId,p.brandId, p.storage\n"
                + "from Product p\n"
                + "inner join Brand b on p.brandId=b.brandId\n"
                + "inner join Category c on p.categoryId = c.categoryId";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
//public Product(int id, String name, Category category, Brand brand, String images, int price, String description, int storage)
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

    public List<Product> getSearchedProducts(String searchTerm, String categoryId, String brandId, String sortBy) {
        List<Product> searchedProducts = new ArrayList<>();

        StringBuilder queryBuilder = new StringBuilder("select p.productId,p.name,c.name as category,b.name as brand,p.description,p.images,p.price,p.categoryId,p.brandId,p.storage\n")
                .append("from Product p\n")
                .append("inner join Brand b on p.brandId=b.brandId\n")
                .append("inner join Category c on p.categoryId = c.categoryId\n")
                .append("where 1=1");

        if (searchTerm != null && !searchTerm.isEmpty()) {
            queryBuilder.append(" and lower(p.name) like ?");
        }

        if (categoryId != null && !categoryId.isEmpty()) {
            queryBuilder.append(" and p.categoryId = ?");
        }

        if (brandId != null && !brandId.isEmpty()) {
            queryBuilder.append(" and p.brandId = ?");
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
//public Product(int id, String name, Category category, Brand brand, String images, int price, String description, int storage)
            while (rs.next()) {
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

        } catch (Exception e) {
            System.out.println(e);
        }

        return searchedProducts;
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
