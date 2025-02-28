# Code Tester API

Code Tester API is an ASP.NET Core Web API for executing and testing code remotely. It supports multiple programming languages, including Python, C++, and Java, using a strategy-based execution model.

## Features
- Execute and test code remotely
- Supports Python, C++, and Java
- Built with ASP.NET Core Web API
- Integrated with Swagger for API documentation
- CORS enabled for cross-origin requests
- Docker support for containerized deployment

## Running the API

⚠️ This API should only be run inside a Docker container. Running it locally can lead to security risks.

## Docker Deployment

To build and run the API in a Docker container:

```sh
docker build -t code-tester-api .
docker run -p 8080:8080 -p 8081:8081 code-tester-api
```

### API URLs
- **Docker (HTTP)**: `http://localhost:8080`
- **Docker (HTTPS)**: `https://localhost:8081`

Swagger UI is available at:
```
http://localhost:8080/swagger
```

### Dockerfile Configuration
- Installs Python 3, C++, and Java to support code execution
- Uses .NET 8 runtime
- Exposes ports `8080` (HTTP) and `8081` (HTTPS)

## CORS Configuration

CORS is enabled to allow cross-origin requests. The default policy allows any origin, header, and method.

## License

This project is licensed under the MIT License.

