package dao;

import context.DBContext;
import model.Category;
import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CategoryDAO {

    public List<Category> getAllCategories() {
        List<Category> categoryList = new ArrayList<>();

        String query = "SELECT * FROM Category";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                categoryList.add(
                        new Category.Builder()
                                .id(rs.getInt("categoryId"))
                                .name(rs.getString("name"))
                                .build());
            }
        } catch (Exception e) {
            // Handle the exception appropriately
        }

        return categoryList;
    }

    public JSONArray calculateTotalProductsSoldByCategory() {
        JSONArray jsonArray = new JSONArray();

        String query = "SELECT c.name AS category, SUM(p.sold) AS totalSold FROM Product p "
                + "INNER JOIN Category c ON p.categoryId = c.categoryId "
                + "GROUP BY c.name";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                String category = rs.getString("category");
                int totalSold = rs.getInt("totalSold");

                // Create a JSON object for each category and totalSold
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("category", category);
                jsonObject.put("totalProducts", totalSold);

                // Add the JSON object to the JSON array
                jsonArray.put(jsonObject);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return jsonArray;
    }

}
