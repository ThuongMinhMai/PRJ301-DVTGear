/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import context.DBContext;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author Kingc
 */
public class RateDAO {

    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;

    public void addRate( int productId, int customerId, String rateContent, int rateValue) {
        String query = "INSERT INTO Rate (productId, customerId, content, value) VALUES (?, ?, ?, ?)";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {
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
            System.err.println(e);
        }
    }

}
