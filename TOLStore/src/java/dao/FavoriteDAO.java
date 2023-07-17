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
 * @author Kingc
 */
public class FavoriteDAO {

    public boolean isFavorite(int productId, int customerId) {
        if (customerId == 0) {
            return false;
        }

        String query = "SELECT COUNT(*) AS count FROM Favorite WHERE productId = ? AND customerId = ?";

        try (Connection conn = new DBContext().getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, productId);
            ps.setInt(2, customerId);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    int count = rs.getInt("count");
                    return count > 0;
                }
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        return false;
    }

    public void addFavorite(int productId, int customerId) {

        String query = "INSERT INTO Favorite (productId, customerId) VALUES (?, ?)";

        try (Connection conn = new DBContext().getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, productId);
            ps.setInt(2, customerId);

            int rowsInserted = ps.executeUpdate();

            if (rowsInserted > 0) {
                System.out.println("Favorite added successfully.");
            } else {
                System.out.println("Failed to add the favorite.");
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public void deleteFavorite(int productId, int customerId) {
        String query = "DELETE FROM Favorite WHERE productId = ? AND customerId = ?";

        try (Connection conn = new DBContext().getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, productId);
            ps.setInt(2, customerId);

            int rowsDeleted = ps.executeUpdate();

            if (rowsDeleted > 0) {
                System.out.println("Favorite deleted successfully.");
            } else {
                System.out.println("Failed to delete the favorite.");
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

}
