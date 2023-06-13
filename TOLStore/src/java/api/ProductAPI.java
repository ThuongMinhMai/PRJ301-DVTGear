/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import dao.ProductDAO;

import entity.Product;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Kingc
 */
@WebServlet(name = "ProductServlet", urlPatterns = {"/api/products"})
public class ProductAPI extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        ProductDAO dao = new ProductDAO();
        List<Product> productList = dao.getAllProducts();

        response.setStatus(HttpServletResponse.SC_OK);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Get products succesfully!");
        jsonResponse.put("products", new JSONArray(productList));

        response.getWriter().write(jsonResponse.toString());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

       
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(request.getInputStream(), "UTF-8")); // Specify UTF-8 encoding
        StringBuilder requestBody = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }
        reader.close();

        JSONObject jsonObject = new JSONObject(requestBody.toString());

        ProductDAO dao = new ProductDAO();
        dao.createProduct(jsonObject);

        response.setStatus(HttpServletResponse.SC_CREATED);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", "Create Product succesfully!!!");

        response.getWriter().write(jsonResponse.toString());
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(request.getInputStream(), "UTF-8")); // Specify UTF-8 encoding
        StringBuilder requestBody = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }
        reader.close();

        JSONObject jsonObject = new JSONObject(requestBody.toString());

        try {
            ProductDAO dao = new ProductDAO();
            dao.updateProduct(jsonObject);

            response.setStatus(HttpServletResponse.SC_OK);

            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "Update Product succesfully!!!");

            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            System.err.println(e);
        }

    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(request.getInputStream(), "UTF-8")); // Specify UTF-8 encoding
        StringBuilder requestBody = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }
        reader.close();

        JSONObject jsonObject = new JSONObject(requestBody.toString());

        try {
            ProductDAO dao = new ProductDAO();
            dao.deleteProduct(jsonObject);

            response.setStatus(HttpServletResponse.SC_OK);

            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("message", "Delete Product succesfully!!!");

            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            System.err.println(e);
        }
    }

}
