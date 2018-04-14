const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const nuxtConf = require('../../nuxt.config')

const resolve = (p) => path.resolve(p)

module.exports = (storybookBaseConfig, configType, defaultConfig) => {
  const rootDir = resolve(nuxtConf.rootDir || '')
  const srcDir = resolve(nuxtConf.srcDir || '')

  const sassResources = {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        path.resolve(__dirname, '../../src/assets/css/_vars.scss'),
        path.resolve(__dirname, '../../src/assets/css/mixin/_mediaquery.scss')
      ]
    }
  }
  defaultConfig.resolve.alias = {
    ...defaultConfig.resolve.alias,
    ...{
      '~~': rootDir,
      '~': srcDir
    }
  }

  defaultConfig.module.rules.push(
    {
      test: [/\.stories\.js$/, /index\.js$/],
      loaders: [require.resolve('@storybook/addon-storysource/loader')],
      include: [srcDir],
      enforce: 'pre'
    },
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader'
        },
        sassResources
      ]
    }
  )

  // Prevent webpack RuleSet error:
  // options/query provided without loader (use loader + options)
  defaultConfig.module.rules = defaultConfig.module.rules.filter((r) => !(r.optinos || r.query))

  // plugin for vue-loader v15
  defaultConfig.plugins.push(new VueLoaderPlugin())

  return defaultConfig
}
