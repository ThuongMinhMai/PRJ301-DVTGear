package controller;

import dao.CustomerDAO;
import model.Customer;
import org.json.JSONObject;
import utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@WebServlet(name = "LoginServlet", urlPatterns = {"/login"})
public class LoginController extends HttpServlet {

    private static final String CLIENT_ID = "834117377959-0aabfn4t7gui4au7aopki3c10h9rsa53.apps.googleusercontent.com";

    //get login page
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("login.jsp").forward(request, response);
    }

    //login customer
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        //google login
        String googleLogin = request.getParameter("googleLogin");
        if (googleLogin != null) {

            String credentialCode = request.getParameter("credential");

            try {

                String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + URLEncoder.encode(credentialCode, "UTF-8");
                URL obj = new URL(url);
                HttpURLConnection con = (HttpURLConnection) obj.openConnection();

                // Set the request method to GET
                con.setRequestMethod("GET");

                int responseCode = con.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    // Read the response from the server
                    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8));
                    String inputLine;
                    StringBuilder responseBuilder = new StringBuilder();

                    while ((inputLine = in.readLine()) != null) {
                        responseBuilder.append(inputLine);
                    }
                    in.close();

                    String jsonResponse = responseBuilder.toString();

                    JSONObject json = new JSONObject(jsonResponse);
                    String audience = json.optString("aud", "");

                    if (audience.equals(CLIENT_ID)) {

                        String username = json.getString("email");
                        String avatarUrl = json.getString("picture");

                        CustomerDAO dao = new CustomerDAO();
                        Customer customer = dao.getCustomerByName(username);

                        if (customer == null) {
                            //auto register account (only use for Google login)
                            customer = dao.createCustomer(username, null, avatarUrl);
                        }

                        request.getSession().setAttribute("currentUser", customer);
                        response.sendRedirect("/store");
                    } else {
                        request.setAttribute("errorMessage", "Verification failed!");
                        request.getRequestDispatcher("login.jsp").forward(request, response);
                    }
                } else {
                    request.setAttribute("errorMessage", "Verification failed!");
                    request.getRequestDispatcher("login.jsp").forward(request, response);
                }
                return;
            } catch (Exception e) {
                request.setAttribute("errorMessage", "Verification failed!");
                request.getRequestDispatcher("login.jsp").forward(request, response);
                return;
            }

        }


        //normal login
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        //check missing value
        if (username.isEmpty() || password.isEmpty()) {
            request.setAttribute("errorMessage", "Missing username or password!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }

        //check registed
        CustomerDAO dao = new CustomerDAO();
        Customer customer = dao.getCustomerByName(username);
        if (customer == null) {
            request.setAttribute("errorMessage", "This username is not registered!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }

        //hash and check passowrd
        String hashedPassword = Utils.sha256Hash(password);
        if (!customer.getPassword().equals(hashedPassword)) {
            request.setAttribute("errorMessage", "Wrong password. Try again!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }

        //everthing is good, let's response
        request.getSession().setAttribute("currentUser", customer);
        response.sendRedirect("/store");

    }

}
