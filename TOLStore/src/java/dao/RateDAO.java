/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import context.DBContext;
import model.Customer;
import model.Product;
import model.Rate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


public class RateDAO {

    public void addRate(int productId, int customerId, String rateContent, int rateValue) {
        String query = "INSERT INTO Rate (productId, customerId, content, value) VALUES (?, ?, ?, ?)";

        try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, productId);
            ps.setInt(2, customerId);
            ps.setString(3, rateContent);
            ps.setInt(4, rateValue);

            int rowsInserted = ps.executeUpdate();

            if (rowsInserted > 0) {
                System.out.println("Rate added successfully.");
            } else {
                System.out.println("Failed to add the rate.");
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public List<Rate> getRateListForProduct(Product product) {
        List<Rate> rateList = new ArrayList<>();

        if (product == null) {
            return rateList;
        }

        String query = "SELECT r.content, r.value, cust.customerId, cust.avatarUrl, cust.username " + "FROM Rate r " + "LEFT JOIN Customer cust ON r.customerId = cust.customerId " + "WHERE r.productId = ?";

        try (Connection conn = new DBContext().getConnection(); PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, product.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String content = rs.getString("content");
                int value = rs.getInt("value");
                int customerId = rs.getInt("customerId");
                String avatarUrl = rs.getString("avatarUrl");
                String username = rs.getString("username");
                Customer customer = new Customer(customerId, username, null, avatarUrl);
                Rate rate = new Rate(customer, product, content, value);
                rateList.add(rate);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return rateList;
    }

}
