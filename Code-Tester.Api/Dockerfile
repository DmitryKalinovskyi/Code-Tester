# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Add python3, g++, .net, java to the container for code running.
USER root
RUN apt-get update
RUN apt-get install python3 -y
RUN apt-get install g++ -y
RUN apt-get install openjdk-17-jdk -y

USER app

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Code-Tester.Api/Code-Tester.Api.csproj", "Code-Tester.Api/"]
RUN dotnet restore "./Code-Tester.Api/Code-Tester.Api.csproj"
COPY . .
WORKDIR "/src/Code-Tester.Api"
RUN dotnet build "./Code-Tester.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Code-Tester.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Code-Tester.Api.dll"]