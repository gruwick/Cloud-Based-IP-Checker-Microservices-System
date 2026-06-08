FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY app.csproj .
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

ENV DOTNET_USE_POLLING_FILE_WATCHER=1

COPY --from=build /app/out .

EXPOSE 8080
ENTRYPOINT ["dotnet", "app.dll"]
