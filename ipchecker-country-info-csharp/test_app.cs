using System;
using System.Net.Http;
using System.Threading.Tasks;

class TestApp
{
    static async Task Main()
    {
        using var client = new HttpClient();
        var response = await client.GetStringAsync("http://localhost:8080/?ip=100.217.23.206");

        if (!response.Contains("US"))
        {
            throw new Exception("Expected US for IP starting with 100");
        }

        Console.WriteLine("Test passed");
    }
}
