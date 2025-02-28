# Web Client - Code Tester

This is a Vite-based web application for testing code in various programming languages, including C++, Java, and Python. It features a rich text editor with syntax highlighting and integrates with Redux and RxJS for state management and reactive programming.

## Features
- Code editing with CodeMirror
- Syntax highlighting for C++, Java, and Python
- Ant Design UI components
- State management with Redux Toolkit
- Reactive programming with RxJS and Redux-Observable
- Storybook for UI component development
- Unit testing with Vitest

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed, then run:

```sh
npm install
```

## Development

To start the development server:

```sh
npm run dev
```

## Build

To build the application:

```sh
npm run build
```

## Linting

To run ESLint:

```sh
npm run lint
```

## Storybook

To run Storybook for UI development:

```sh
npm run storybook
```

To build Storybook:

```sh
npm run build-storybook
```

## Testing

To run tests using Vitest:

```sh
npm run test
```

## Dependencies

### Main Dependencies
- `react`, `react-dom` - Core React libraries
- `vite` - Build tool
- `@reduxjs/toolkit`, `react-redux` - State management
- `rxjs`, `redux-observable` - Reactive programming
- `codemirror`, `@codemirror/lang-*` - Code editor
- `antd`, `@ant-design/icons` - UI components

### Dev Dependencies
- `eslint`, `eslint-plugin-*` - Linting
- `storybook`, `@storybook/*` - UI development
- `vitest`, `@vitest/*` - Testing

## License
This project is licensed under the MIT License.


