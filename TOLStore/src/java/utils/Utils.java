package utils;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;

public class Utils {

    public static String formatNum(int number) {

        // Create NumberFormat instance with desired formatting
        NumberFormat numberFormat = NumberFormat.getNumberInstance();
        String formattedNumber = numberFormat.format(number);

        return formattedNumber;
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
}
