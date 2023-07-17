package controller;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "LogoutServlet", urlPatterns = {"/logout"})
public class LogoutController extends HttpServlet {

    //logout
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws
            IOException {
        request.getSession().removeAttribute("currentUser");
        response.sendRedirect("/store");
    }

}
