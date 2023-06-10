/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import dao.BannerDAO;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

/**
 *
 * @author Kingc
 */
@WebServlet(name = "BannerServlet", urlPatterns = {"/api/banner"})
public class BannerAPI extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        

        BannerDAO dao = new BannerDAO();
        String bannerUrl = dao.getBanner();

        response.setStatus(HttpServletResponse.SC_OK);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Get banner image succesfully!");
        jsonResponse.put("bannerUrl", bannerUrl);

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

        BannerDAO dao = new BannerDAO();
        dao.updateBanner(jsonObject);

        response.setStatus(HttpServletResponse.SC_CREATED);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Update Banner succesfully!!!");

        response.getWriter().write(jsonResponse.toString());
    }

}
