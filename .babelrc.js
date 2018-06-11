const NODE_VERSION = "10.3" // TODO - depend on NODE_VERSION file?

const buildEnv = process.env.LIFTOFF_BUILDTARG
const envTargets = {
  client: {
    // TODO - will eventually widen the range and see how it goes
    "browsers": [">1% in us", "not ie 11", "not op_mini all"] 
  },
  server: {
    "node": NODE_VERSION
  }
}

const dev = process.env.NODE_ENV === 'development'

const presets = [
  "@babel/preset-typescript",
  ["@babel/preset-react",
    { development: dev }
  ],
  ["@babel/preset-env",
    { "targets": envTargets[buildEnv] }
  ]
]

const plugins = [
  "@babel/plugin-syntax-dynamic-import",
  "babel-plugin-universal-import",
  ["babel-plugin-styled-components", {
    ssr: true
  }]
]

module.exports = { presets, plugins }
