import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class TotalValid {
    public static void main(String[] args)throws IOException{
        HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0",8080), 0);
        
        server.createContext("/totalvalid", new HttpHandler(){
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                if(!exchange.getRequestMethod().equals("GET")){
                    exchange.sendResponseHeaders(405, 0);
                    return;
                }
                String totalQuery = exchange.getRequestURI().getQuery();
                String cutQuery = totalQuery.replace("items=", "");
                String[] ipPart = cutQuery.split(",");
                int totalValid = 0;
                for(String ip : ipPart){
                    if( checkIP(ip)){
                        totalValid++;
                    }
                }
                String json = "{\"total_valid\":" + totalValid + "}";
                exchange.sendResponseHeaders(200,json.length());
                OutputStream out = exchange.getResponseBody();
                out.write(json.getBytes());
                out.close();
            }
        });

        server.start();
        System.out.println("The Server is running");

        if (System.getenv("CI") != null) {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
            }
            server.stop(0);
        }
    }

    public static boolean checkIP(String ip){
        ip = ip.trim();
        
        if(ip.contains(".")){
            String[] ipv4 = ip.split("\\.");
            if(ipv4.length == 4){
                return true;
            }
        }
        if(ip.contains(":")){
            String[] ipv6 = ip.split(":");
            if(ipv6.length >= 2 && ipv6.length<=8){
                return true;
            }
        }
        return false;
    }
}
