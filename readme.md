# bare-express-boilerplate

Made for personal uses.

Starting from `yarn init` and figuring out which libs to use is kind of hassle, so I just make a boilerplate consisted of libraries that I usually use.

`npm` should work, but I made this with `yarn`.

Run with `yarn install` for dependencies, then `yarn nodemon` for development.

## Before using

If you (ever) decided to use this boilerplate, please change `package.json` first before using.

Also Dockerfile and Kubernetes configuration files needs to be changed to fit your needs too.

## Required env tags

```JS
  // what we're using on
  process.env = {
    "NODE_ENV":"", // 'production' or 'development' for now
  }
```

## Error Handling

Ideas from [here](https://expressjs.com/en/guide/error-handling.html), [here](https://dev.to/nedsoft/central-error-handling-in-express-3aej), [here](https://medium.com/@SigniorGratiano/express-error-handling-674bfdd86139), [here](https://gist.github.com/zcaceres/2854ef613751563a3b506fabce4501fd), and [here](https://thecodebarbarian.com/80-20-guide-to-express-error-handling)

Custom error handler and definitions of errors are exists inside `/src/lib/error.js`

To use it, please call it first, e.g:
```JS 
// from ./src/routes
const { ErrorHandler, ERRORS } = require('../lib/error')
```

Then inside each route, we can deal with error by passing it down with `next()`, e.g:
```JS
next(new ErrorHandler(ERRORS.notFound))
```

We can still throw default error with just `next(err)`, and it should be handled automatically on express. 
In this case, internal code will always ended with 998 in the end.

## Docker

Yes, this boilerplate was made with Docker in mind. Using `node:10-alpine` as the base image.

## Next

?