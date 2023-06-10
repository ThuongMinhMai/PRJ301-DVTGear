
package api;

import dao.AdminDAO;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet(name = "AdminServlet", urlPatterns = {"/api/admins"})
public class AdminAPI extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        

        AdminDAO dao = new AdminDAO();
        String admins = dao.getAllAdmins();

        response.setStatus(HttpServletResponse.SC_OK);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Get admins succesfully!");
        jsonResponse.put("admins", admins);

        response.getWriter().write(jsonResponse.toString());
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        

        BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
        StringBuilder requestBody = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }
        reader.close();

        JSONObject jsonObject = new JSONObject(requestBody.toString());

        AdminDAO dao = new AdminDAO();
        dao.updateAdmins(jsonObject);

        response.setStatus(HttpServletResponse.SC_CREATED);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Update Admin's Email succesfully!!!");

        response.getWriter().write(jsonResponse.toString());
    }

}
