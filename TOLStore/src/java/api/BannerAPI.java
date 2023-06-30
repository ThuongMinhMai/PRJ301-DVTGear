package api;

import dao.BannerDAO;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import utils.Utils;

@WebServlet(name = "BannerServlet", urlPatterns = {"/api/banner"})
public class BannerAPI extends HttpServlet {

    //get banner
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        BannerDAO dao = new BannerDAO();
        String bannerUrl = dao.getBanner();

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Get banner image succesfully!");
        jsonResponse.put("bannerUrl", bannerUrl);

        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(jsonResponse.toString());
    }

    //update banner
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        JSONObject requestBody = Utils.getRequestBody(request);
        BannerDAO dao = new BannerDAO();
        dao.updateBanner(requestBody);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Update Banner succesfully!!!");

        response.setStatus(HttpServletResponse.SC_CREATED);
        response.getWriter().write(jsonResponse.toString());
    }

}
