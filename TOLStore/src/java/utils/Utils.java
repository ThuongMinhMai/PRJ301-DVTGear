package utils;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class Utils {

  public static String formatNum(int number) {

    // Create NumberFormat instance with desired formatting
    NumberFormat numberFormat = NumberFormat.getNumberInstance();

    return numberFormat.format(number);
  }


  public static List<String> parseJSONStringArray(String jsonString) {
    List<String> res = new ArrayList<>();
    try {
      JSONArray jsonArray = new JSONArray(jsonString);

      for (int i = 0; i < jsonArray.length(); i++) {
        res.add(jsonArray.getString(i));
      }

    } catch (Exception e) {
      e.printStackTrace();
    }

    return res;
  }

  public static String sha256Hash(String input) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));

      // Convert the byte array to a hexadecimal string representation
      StringBuilder hexString = new StringBuilder();
      for (byte b : hashBytes) {
        String hex = Integer.toHexString(0xff & b);
        if (hex.length() == 1) {
          hexString.append('0');
        }
        hexString.append(hex);
      }
      return hexString.toString();
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
      return "";
    }
  }

  public static JSONObject getRequestBody(HttpServletRequest request) throws ServletException, IOException {
    BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream(), StandardCharsets.UTF_8)); // Specify UTF-8 encoding
    StringBuilder requestBody = new StringBuilder();
    String line;
    while ((line = reader.readLine()) != null) {
      requestBody.append(line);
    }
    reader.close();

    return new JSONObject(requestBody.toString());
  }

  public static String formatDate(Date inputDate) {
    String outputPattern = "dd-MM-yyyy";
    SimpleDateFormat outputFormat = new SimpleDateFormat(outputPattern);
    return outputFormat.format(inputDate);
  }
}
