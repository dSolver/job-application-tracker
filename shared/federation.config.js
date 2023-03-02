
// shared federation.config.js

const stage = process.env.BUILD_STAGE ?? "beta"

const remoteUrls = {
  "beta": {},
  "gamma": {},
  "prod": {}
}

federationConfig = {
  name: "shared",
  filename: 'remoteEntry.js',
  remotes: {},
  exposes: {
    "./Search": "./src/components/search/search.tsx"
  },
  shared: {
    "react": {
      "requiredVersion": "18.2",
      "singleton": true,
      "eager": true
    },
    "react-dom": {
      "requiredVersion": "18.2",
      "singleton": true,
      "eager": true
    },
    "@mui/material": {
      "requiredVersion": "5.11.10",
      "singleton": true,
      "eager": true
    },
    "@emotion/react": {
      "requiredVersion": "11.10.6",
      "singleton": true,
      "eager": true
    },
    "@emotion/styled": {
      "requiredVersion": "11.10.6",
      "singleton": true,
      "eager": true
    },
    "lodash": {
      "requiredVersion": "^4.17.21",
      "singleton": true,
      "eager": true
    },
    "axios": {
      "requiredVersion": "^1.3.4",
      "singleton": true,
      "eager": true
    }
  }
}

if (stage === "prod") {
  // do not provide override capability
  federationConfig.remotes = Object.keys(remoteUrls.prod).reduce((s, k) => {
    return {
      ...s,
      [k]: k + '@' + remoteUrls.prod[k]
    }
  }, {})
}

exports.federationConfig = federationConfig;
