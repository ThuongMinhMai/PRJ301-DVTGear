/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import context.DBContext;
import entity.Customer;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author Kingc
 */
public class CustomerDAO {

    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;

    public Customer getCustomerByName(String username) {
        Customer customer = null;
        String query = "SELECT TOP 1 * FROM Customer WHERE username = '" + username + "'";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                customer = new Customer(rs.getInt("customerId"), rs.getString("username"), rs.getString("password"));
            }
        } catch (Exception e) {
            // Handle the exception appropriately
        }

        return customer;
    }

    public Customer createCustomer(String username, String password) {
        Customer customer = null;
        String insertQuery = "INSERT INTO Customer (username, [password])\n"
                + "VALUES (?, ?)";
        String selectQuery = "SELECT TOP 1 * FROM Customer WHERE username = ?";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement insertPs = conn.prepareStatement(insertQuery);
                PreparedStatement selectPs = conn.prepareStatement(selectQuery)) {

            // Set parameters for the insert query
            insertPs.setString(1, username);
            insertPs.setString(2, password);

            // Execute the insert query
            insertPs.executeUpdate();

            // Set parameters for the select query
            selectPs.setString(1, username);

            // Execute the select query
            try (ResultSet rs = selectPs.executeQuery()) {
                if (rs.next()) {
                    customer = new Customer(rs.getInt("customerId"), rs.getString("username"), rs.getString("password"));
                }
            }
        } catch (Exception e) {
            // Handle the exception appropriately
        }

        return customer;
    }
}
