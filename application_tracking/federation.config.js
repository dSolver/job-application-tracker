
// application_tracking federation.config.js

const stage = process.env.BUILD_STAGE ?? "beta"

const remoteUrls = {
  "beta": {
    "shared": "http://localhost:3001/remoteEntry.js",
    "job_search": "http://localhost:3002/remoteEntry.js"
  },
  "gamma": {
    "shared": "http://localhost:3001/remoteEntry.js",
    "job_search": "http://localhost:3002/remoteEntry.js"
  },
  "prod": {
    "shared": "http://localhost:3001/remoteEntry.js",
    "job_search": "http://localhost:3002/remoteEntry.js"
  }
}

federationConfig = {
  name: "application_tracking",
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
          `,
    "job_search": `promise new Promise(resolve => {
            const urlParams = new URLSearchParams(window.location.search)
            const override = urlParams.get('job_search')
            // This part depends on how you plan on hosting and versioning your federated modules
            const remoteUrl = override || '${remoteUrls[stage]['job_search']}'
            const script = document.createElement('script')
            script.src = remoteUrl
            script.onload = () => {
              // the injected script has loaded and is available on window
              // we can now resolve this Promise
              const proxy = {
                get: (request) => window['job_search'].get(request),
                init: (arg) => {
                  try {
                    return window['job_search'].init(arg)
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
    "./RecentApplicationsCard": "./src/components/recent-applications-card.tsx",
    "./ApplicationService": "./src/services/application.service.ts"
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
