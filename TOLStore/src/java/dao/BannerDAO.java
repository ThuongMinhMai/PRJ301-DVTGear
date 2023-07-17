package dao;

import context.DBContext;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class BannerDAO {

    public void updateBanner(JSONObject jsonObject) {
        String query = "UPDATE Setting\n"
                + "SET bannerUrl = ?";

        try (Connection conn = new DBContext().getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setString(1, jsonObject.getString("bannerUrl"));

            int rowsUpdated = ps.executeUpdate();

            if (rowsUpdated > 0) {
                System.out.println("Banner updated successfully.");
            } else {
                System.out.println("Failed to update the banner.");
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public String getBanner() {
        String bannerUrl = null;

        String query = "SELECT bannerUrl FROM Setting";

        try (Connection conn = new DBContext().getConnection();
             PreparedStatement ps = conn.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                bannerUrl = rs.getString("bannerUrl");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return bannerUrl;

    }


}
