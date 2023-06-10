package api;

import dao.BrandDAO;
import entity.Brand;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet(name = "BrandServlet", urlPatterns = {"/api/brands"})
public class BrandAPI extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        

        BrandDAO dao = new BrandDAO();
        List<Brand> brandList = dao.getAllBrands();

        response.setStatus(HttpServletResponse.SC_OK);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Get brands succesfully!");
        jsonResponse.put("brands", new JSONArray(brandList));

        response.getWriter().write(jsonResponse.toString());

    }

}
