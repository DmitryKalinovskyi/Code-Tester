---
title: Code Tester API Documentation
description: API documentation for executing and testing code remotely
---

# Code Tester API

## Overview
The **Code Tester API** allows users to execute source code remotely with specified parameters. It supports multiple programming languages and provides detailed execution results.

## Endpoints

### Execute Code

```http
POST /api/code-tester
```

**Description:**
Executes source code with specified parameters.

**Request Body:**

```json
{
  "Language": "Python",
  "SourceCode": "print(1 + 2)",
  "Input": null
}
```

| Parameter   | Type   | Description                  |
|------------|--------|------------------------------|
| Language   | string | Language of the program      |
| SourceCode | string | Source code to execute       |
| Input      | string | Input provided to the program (optional) |

**Responses:**

- `200 OK`: Code executed successfully
- `400 Bad Request`: Execution error

**Response Example:**

```json
{
  "Output": "3",
  "Error": null,
  "ExecutionTimeMilliseconds": 15,
  "MemoryUsedBytes": 1024
}
```

---

### Get Supported Languages

```http
GET /api/code-tester/languages
```

**Description:**
Returns a list of supported programming languages.

**Response Example:**

```json
[ "Python", "C++", "Java" ]
```

## Models

### CodeTestRequest

| Property    | Type   | Description               |
|------------|--------|---------------------------|
| Language   | string | Language of the program   |
| SourceCode | string | Source code of the program |
| Input      | string | Input for the program (optional) |

### CodeTestResponse

| Property                | Type   | Description                  |
|-------------------------|--------|------------------------------|
| Output                 | string | Output from execution        |
| Error                  | string | Error message (if any)       |
| ExecutionTimeMilliseconds | long   | Time taken in milliseconds  |
| MemoryUsedBytes        | long   | Memory used in bytes         |

## Authentication
No authentication is required; the API is publicly accessible.

## Error Handling
If execution fails, the API returns a `400 Bad Request` with an error message.
