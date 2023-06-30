package api;

import dao.CategoryDAO;
import model.Category;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet(urlPatterns = {"/api/categories"})
public class CategoryAPI extends HttpServlet {

    //get categories
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        CategoryDAO dao = new CategoryDAO();
        List<Category> categoryList = dao.getAllCategories();

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Get categories succesfully!");
        jsonResponse.put("categories", new JSONArray(categoryList));

        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(jsonResponse.toString());
    }

}
