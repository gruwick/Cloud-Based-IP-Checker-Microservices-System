using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

Environment.SetEnvironmentVariable("ASPNETCORE_URLS", "http://0.0.0.0:8080");

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (HttpRequest request) =>
{
    string ip = request.Query["ip"];
    if (string.IsNullOrEmpty(ip))
        return Results.Json(new { error = "ip parameter is missing" });

    ip = ip.Trim();
    string result = "";

    if (ip.Contains("."))
    {
        string[] parts = ip.Split(".");
        if (parts.Length == 4)
        {
            string start = parts[0];
            if (start == "100") result = "US";
            else if (start == "101") result = "UK";
            else if (start == "102") result = "China";
            else result = "Invalid";
            return Results.Json(new { country = result });
        }
    }

    return Results.Json(new { country = "Invalid" });
});

app.MapGet("/countryinfo", (HttpRequest request) =>
{
    string ip = request.Query["ip"];
    if (string.IsNullOrEmpty(ip))
        return Results.Json(new { error = "ip parameter is missing" });

    ip = ip.Trim();
    string result = "";

    if (ip.Contains("."))
    {
        string[] parts = ip.Split(".");
        if (parts.Length == 4)
        {
            string start = parts[0];
            if (start == "100") result = "US";
            else if (start == "101") result = "UK";
            else if (start == "102") result = "China";
            else result = "Invalid";
            return Results.Json(new { country = result });
        }
    }

    return Results.Json(new { country = "Invalid" });
});

app.Run();
