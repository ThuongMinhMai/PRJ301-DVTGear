package dao;

import context.DBContext;
import model.Brand;
import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class BrandDAO {

    public List<Brand> getAllBrands() {
        List<Brand> brandList = new ArrayList<>();
        String query = "SELECT * FROM Brand";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                brandList.add(
                        new Brand.Builder()
                                .id(rs.getInt("brandId"))
                                .name(rs.getString("name"))
                                .build()
                );
            }
        } catch (Exception e) {
            // Handle the exception appropriately
        }
        return brandList;
    }

    public JSONArray calculateTotalProductsSoldByBrand() {
        JSONArray jsonArray = new JSONArray();

        String query = "SELECT b.name AS brand, COUNT(op.productId) AS totalSold FROM [Order] o INNER JOIN OrderProducts op ON o.orderId = op.orderId INNER JOIN Product p ON op.productId = p.productId INNER JOIN Brand b ON p.brandId = b.brandId WHERE o.status = 'COMPLETE' GROUP BY b.name";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query)) {

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                String brand = rs.getString("brand");
                int totalSold = rs.getInt("totalSold");

                // Create a JSON object for each brand and totalSold
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("brand", brand);
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
