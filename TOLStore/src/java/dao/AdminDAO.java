package dao;

import context.DBContext;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AdminDAO {
    public String getAllAdmins() {
        String adminEmailList = null;
        String query = "SELECT [adminEmails]\n"
                + " FROM Setting";

        try (Connection conn = new DBContext().getConnection();
             PreparedStatement ps = conn.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                adminEmailList = rs.getString("adminEmails");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return adminEmailList;

    }

    public void updateAdmins(String newAdmins) {
        String query = "UPDATE Setting\n"
                + "SET adminEmails = ?";

        try (Connection conn = new DBContext().getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setString(1, newAdmins);

            int rowsUpdated = ps.executeUpdate();

            if (rowsUpdated > 0) {
                System.out.println("Admins updated successfully.");
            } else {
                System.out.println("Failed to update the admins.");
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
