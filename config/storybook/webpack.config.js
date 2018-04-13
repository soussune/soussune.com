const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const nuxtConf = require('../../nuxt.config')

const resolve = (p) => path.resolve(p)

module.exports = (storybookBaseConfig, configType, defaultConfig) => {
  const rootDir = resolve(nuxtConf.rootDir || '')
  const srcDir = resolve(nuxtConf.srcDir || '')

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
        }
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
