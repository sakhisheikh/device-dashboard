![relayrlogo](relayr.png)

# Relayr Frontend Challenge

## Introduction

Device Dashboard is a react based app powered by [Auth0](https://auth0.com/) with highly configurable features for both dev and production mode.

## `Components`

This app is built with certain essential components:

 * ReactJS
 * Redux
 * Context API
 * Webpack 4 
 * Webpack cli
 * React Loadable
 * React-google-maps
 * RechartsJS
 * Husky
 * Babel 7
 * React Material UI
 * axios
 * JSS (CSS in JS)
 * HMR (Hot Module Replacement)
 * CSS hot reload

## `Advance React Patterns`

These are the few most powerful react patterns are used while building this app.
 * `Render Props`
 * `State Reducers`


## `Features`

 * Webpack v3 replaced by v4 for more optimized build on both local and production environment
 * Code Splitting is done to minimize initial app load from `2mb` to `400kb` by importing components dynamically
 * Complete App size is reduced from `3.4mb` to `1.02mb`
 * `react-google-maps` added to track device location
 * `Redux` is added for readings statistics routes
 * `Husky` is added for linting and running unit tests before each commit. It makes sure zero code smells using `Eslint` and `Prettier`
 * All static files are cached with hashing strategy for better UX in production
 * Adhoc Presets `Webpack Visulaizer` is added to analyze production build for better app modules management.
 * `Recharts` is used for readings' visuals
 * `JSS` is used with [Material-UI](https://github.com/mui-org/material-ui) for modular css to avoid main thread blocking
 * Webpack config is seperated and kept very modular to adhere with app requirements for large scale in future
 * Webpack `mini-css-extract-plugin` is used in production build for lightweight css.
 * Unit tests are covered for app business logic components

## `Additional Functionalities`

 * [Auth0](https://auth0.com/) Integration
 * Google maps integration to get directions to device location
 * Readings Statistics

## `Get Started`

To install dependencies: ```npm install``` | ```yarn```

To run the server locally: ```npm run start``` | ```yarn start```

To create production build: ```npm run prebuild``` | ```yarn prebuild```

To commit code: ```git add .``` -> ```git commit -m "YOUR_MESSAGE"``` (husky begins for pre-commit hook)

## Notes
* Local environment is configured with `port 3001` to make sure [Auth0](https://auth0.com/) authentcation callback sends response on this port.
* Sign up first to access dashboard
* reading key is added in `api-server.js` to render shapes for particular readings.
