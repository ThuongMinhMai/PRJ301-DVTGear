/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import context.DBContext;
import entity.Brand;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Kingc
 */
public class BrandDAO {
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    
        public List<Brand> getAllBrands() {
        List<Brand> brandList = new ArrayList<>();
        String query = "SELECT * FROM Brand";

        try (Connection conn = new DBContext().getConnection();
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                brandList.add(new Brand(rs.getInt("brandId"), rs.getString("name")));
            }
        } catch (Exception e) {
            // Handle the exception appropriately
        }
        return brandList;
    }
}
