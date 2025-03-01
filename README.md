# Code Tester Platform

Code Tester Platform consists of three main components:
- **Code Tester API**: An ASP.NET Core Web API for executing and testing code remotely.
- **Code Tester Web Client**: A React-based frontend for interacting with the API.
- **Docs**: Dinosaurus 😊 docs.

---

## Docker Compose
I've prepared a dev.docker-compose.yml file and a build_dev.sh script to easily build and start the **API**, **Web Client**, and **Docs** services in development.

To get started, simply run the following command:
```sh
sh build_dev.sh
```
This will:

Build the images for the **API**, **Web Client**, and **Docs** services.
Start all three services (API, Web Client, and Docs) using Docker Compose.


## Code Tester API

### Features
- Execute and test code remotely
- Supports Python, C++, and Java
- Built with ASP.NET Core Web API
- Integrated with Swagger for API documentation
- CORS enabled for cross-origin requests
- **Docker-only deployment** for security

View more details [here](Code-Tester.Api/README.md)


## Code Tester Web Client

### Features
- User-friendly interface to execute and test code
- Supports multiple programming languages
- Real-time execution results
- Built with React and TypeScript
- Communicates with the Code Tester API

View more details [here](web-client/README.md)

## Contribution Guide
We follow a **feature-based branching** workflow. To contribute:

1. Fork the repository and clone it locally.
2. Create a new branch from `main` using the following naming convention:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Implement your changes and commit them with meaningful messages.
4. Push your branch and create a pull request.
5. Wait for review and approval before merging.

---

## Repository Owner
This repository is maintained by **Dmytro Kalinovskyi**.

## License
This project is licensed under the MIT License.

