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
+   "testRegex": "\\.spec\\.tsx?$",
+   "moduleFileExtensions": [
+     "js",
+     "jsx",
+     "json",
+     "ts",
+     "tsx"
+   ],
+   "restoreMocks": true
+ }

```

> `testRegex`: The pattern Jest uses to detect test files.
>
> `moduleFileExtensions`: An array of file extensions your modules use. If you require modules without specifying a file extension, these are the extensions Jest will look for.
>
> `restoreMocks`: Automatically restore mock state between every test.
