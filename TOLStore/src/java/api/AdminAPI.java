package api;

import dao.AdminDAO;
import org.json.JSONArray;
import org.json.JSONObject;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "AdminServlet", urlPatterns = {"/api/admins"})
public class AdminAPI extends HttpServlet {

    //get admins
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        AdminDAO dao = new AdminDAO();
        String admins = dao.getAllAdmins();

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Get admins succesfully!");
        jsonResponse.put("admins", admins);

        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(jsonResponse.toString());
    }

    //add or delete admin
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        JSONObject requestBody = Utils.getRequestBody(request);

        String type = requestBody.getString("type");

        String email = requestBody.getString("email");
        JSONArray adminsJson = requestBody.getJSONArray("admins");
        List<String> admins = Utils.parseJSONStringArray(requestBody.getJSONArray("admins").toString());

        if (email.isEmpty() || type.isEmpty()) {
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "Missing email or type");

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(jsonResponse.toString());

            return;
        }

        if (type.equals("add")) {
            if (admins.contains(email)) {
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("message", "this email is in use");

                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write(jsonResponse.toString());

                return;
            }

            adminsJson.put(email);
        } else if (type.equals("delete")) {

            for (int i = 0; i < adminsJson.length(); i++) {

                if (adminsJson.getString(i).equals(email)) {
                    adminsJson.remove(i);
                    break; // Exit the loop after removing the element
                }

            }
        }

        AdminDAO dao = new AdminDAO();

        dao.updateAdmins(adminsJson.toString());
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Update Admin's Email succesfully!!!");

        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(jsonResponse.toString());
    }

}
