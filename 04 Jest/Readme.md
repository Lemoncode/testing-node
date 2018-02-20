# 04 Jest

In this sample we are going to add Jest configuration:

Summary steps:

- Install necessary libs.
- Add Jest configuration.
- Add specs using Jest.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 Boilerplate TypeScript_ as starting point.

- Let's start by installing the necessary libraries:

- [jest](https://github.com/facebook/jest): JavaScript Testing library with runner, assertion, mocks, etc.
- [@types/jest](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/df38f202a0185eadfb6012e47dd91f8975eb6151/types/jest): Typings for jest.
- [ts-jest](https://github.com/kulshekhar/ts-jest): A preprocessor with sourcemap support to help use Typescript with Jest.

```bash
npm install jest @types/jest ts-jest -D

```
## Configuration

- Jest test commands:
  - `npm test`: to single run
  - `npm run test:watch`: to run all specs after changes.

NOTE:
> --watchAll To rerun all tests.

> --watch To rerun tests related to changed files.

> --verbose Display individual test results with the test suite hierarchy.

> -i or --runInBand Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging

### ./package.json
```diff
{
  ...
  "scripts": {
    "start": "env-cmd .env npm run start:env",
    "start:env": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
    "start:dev": "npm run build && gulp dev --gulpfile config/gulp/dev.js",
    "start:prod": "node public/app.js",
-   "build": "gulp build --gulpfile config/gulp/base.js"
+   "build": "gulp build --gulpfile config/gulp/base.js",
+   "test": "jest --verbose",
+   "test:watch": "jest --watchAll --verbose -i"
  },
  ...
}

```

- [Jest configuration](https://facebook.github.io/jest/docs/en/configuration.html):

### ./package.json

```diff
{
  ...
  "dependencies": {
    ...
- }
+ },
+ "jest": {
+  "testRegex": "\\.spec\\.ts$",
+   "moduleFileExtensions": [
+     "js",
+     "json",
+     "ts"
+   ],
+   "restoreMocks": true
+ }

```

> `testRegex`: The pattern Jest uses to detect test files.
>
> `moduleFileExtensions`: An array of file extensions your modules use. If you require modules without specifying a file extension, these are the extensions Jest will look for.
>
> `restoreMocks`: Automatically restore mock state between every test.

- `ts-jest` configuration:

### ./package.json
```diff
{
  ...
  "jest": {
    "testRegex": "\\.spec\\.ts$",
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
-   "restoreMocks": true
+   "restoreMocks": true,
+   "transform": {
+     ".ts": "<rootDir>/node_modules/ts-jest/preprocessor.js"
+   }
  }
}

```

## Adding tests:

Let's launch tests in watch mode:

```bash
npm run test:watch

```

- Now, we could add specs for login `controller` methods:

### ./src/routers/login/controller.spec.ts

```javascript
import { Request, Response } from 'express';
import { LoginController } from './controller';

describe('LoginController', () => {
  describe('post', () => {
    it('should be send 401 status code when passing login and password equals undefined', () => {
      // Arrange
      const login = undefined;
      const password = undefined;

      const req: Partial<Request> = {
        body: {
          login,
          password,
        },
      };

      const res: Partial<Response> = {
        sendStatus: jest.fn(),
      };

      const controller = LoginController();

      // Act
      controller.post(req as Request, res as Response);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should be send 401 status code when passing login and password equals null', () => {
      // Arrange
      const login = null;
      const password = null;

      const req: Partial<Request> = {
        body: {
          login,
          password,
        },
      };

      const res: Partial<Response> = {
        sendStatus: jest.fn(),
      };

      const controller = LoginController();

      // Act
      controller.post(req as Request, res as Response);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should be send 401 status code when passing login equals "login" and password equals "password"', () => {
      // Arrange
      const login = 'login';
      const password = 'password';

      const req: Partial<Request> = {
        body: {
          login,
          password,
        },
      };

      const res: Partial<Response> = {
        sendStatus: jest.fn(),
      };

      const controller = LoginController();

      // Act
      controller.post(req as Request, res as Response);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should be send 401 status code when passing login equals "admin" and password equals "password"', () => {
      // Arrange
      const login = 'admin';
      const password = 'password';

      const req: Partial<Request> = {
        body: {
          login,
          password,
        },
      };

      const res: Partial<Response> = {
        sendStatus: jest.fn(),
      };

      const controller = LoginController();

      // Act
      controller.post(req as Request, res as Response);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should be send 401 status code when passing login equals "login" and password equals "test"', () => {
      // Arrange
      const login = 'login';
      const password = 'test';

      const req: Partial<Request> = {
        body: {
          login,
          password,
        },
      };

      const res: Partial<Response> = {
        sendStatus: jest.fn(),
      };

      const controller = LoginController();

      // Act
      controller.post(req as Request, res as Response);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should be send 201 status code when passing login equals "admin" and password equals "test"', () => {
      // Arrange
      const login = 'admin';
      const password = 'test';

      const req: Partial<Request> = {
        body: {
          login,
          password,
        },
      };

      const res: Partial<Response> = {
        sendStatus: jest.fn(),
      };

      const controller = LoginController();

      // Act
      controller.post(req as Request, res as Response);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });
  });
});

```

## Debugging Jest

Jest is running over node, so we could use VS Code for debugging jest specs:

### Using VS Code

As we know, VS Code provides by default a [node debugger](https://code.visualstudio.com/Docs/editor/debugging):

- Adding debug launch.json in VS Code:

 ![Debug VS Code](../99%20Readme%20Resources/04%20Jest/00%20Adding%20debug%20launch.json%20in%20VS%20Code.png)

 - Configuring launch.json to single and watchAll runs:

### ./.vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest single run",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "--verbose"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest watchAll run",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "--watchAll",
        "--verbose",
        "-i"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}

```

![Debugging](../99%20Readme%20Resources/04%20Jest/01%20Debugging.png)
