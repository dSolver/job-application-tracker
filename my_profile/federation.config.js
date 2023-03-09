
// my_profile federation.config.js

const stage = process.env.BUILD_STAGE ?? "beta"

const remoteUrls = {
  "beta": {
    "shared": "http://localhost:3001/remoteEntry.js"
  },
  "gamma": {
    "shared": "http://localhost:3001/remoteEntry.js"
  },
  "prod": {
    "shared": "http://localhost:3001/remoteEntry.js"
  }
}

federationConfig = {
  name: "my_profile",
  filename: 'remoteEntry.js',
  remotes: {
    "shared": `promise new Promise(resolve => {
            const urlParams = new URLSearchParams(window.location.search)
            const override = urlParams.get('shared')
            // This part depends on how you plan on hosting and versioning your federated modules
            const remoteUrl = override || '${remoteUrls[stage]['shared']}'
            const script = document.createElement('script')
            script.src = remoteUrl
            script.onload = () => {
              // the injected script has loaded and is available on window
              // we can now resolve this Promise
              const proxy = {
                get: (request) => window['shared'].get(request),
                init: (arg) => {
                  try {
                    return window['shared'].init(arg)
                  } catch(e) {
                    console.log('remote container already initialized')
                  }
                }
              }
              resolve(proxy)
            }
            // inject this script with the src set to the versioned remoteEntry.js
            document.head.appendChild(script);
          })
          `
  },
  exposes: {
    "./AddResumeButton": "./src/components/add-resume-button.tsx"
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
