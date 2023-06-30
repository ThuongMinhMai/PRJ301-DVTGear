package api;

import dao.AdminDAO;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import utils.Utils;

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

    //update admin
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        JSONObject requestBody = Utils.getRequestBody(request);

        AdminDAO dao = new AdminDAO();
        dao.updateAdmins(requestBody);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Update Admin's Email succesfully!!!");

        response.setStatus(HttpServletResponse.SC_CREATED);
        response.getWriter().write(jsonResponse.toString());
    }

}
