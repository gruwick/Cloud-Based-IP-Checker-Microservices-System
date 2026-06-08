import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Test_TotalValid {
    public static void main(String[] args) throws Exception {

        int count = 0;

        if (TotalValid.checkIP("192.168.1.1")) count++;
        if (TotalValid.checkIP("2001:db8::1")) count++;

        if (count != 2) {
            throw new Exception("Expected total_valid to be 2");
        }

        System.out.println("Java CI test passed");
    }
}


