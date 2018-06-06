const NODE_VERSION = "10.3" // TODO - depend on NODE_VERSION file?

const buildEnv = process.env.LIFTOFF_BUILDTARG
const envTargets = {
  client: {
    "browsers": ["> 5%", "last 2 versions"] // TODO - will eventually widen the
                                            // range and see how it goes
  },
  server: {
    "node": NODE_VERSION
  }
}

const dev = NODE_ENV === 'deveoplment'

const presets = [
  "@babel/preset-typescript",
  ["@babel/preset-react",
    { development: dev }
  ]  
  ["@babel/preset-env",
    { "targets": envTargets[buildEnv] }
  ]
]

const plugins = [
  ["babel-plugin-styled-components", {
    ssr: true
  }]
]

module.exports = { presets, plugins }
