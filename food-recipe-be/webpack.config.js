const path = require('path')
const { NODE_ENV = 'production' } = process.env
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '/../**/*.entity.ts', '.js'],
    alias: {
      config: path.resolve('src/config'),
      controllers: path.resolve('src/controllers'),
      constants: path.resolve('src/constants'),
      entity: path.resolve('src/entity'),
      emails: path.resolve('src/emails'),
      middlewares: path.resolve('src/middlewares'),
      repositories: path.resolve('src/repositories'),
      routes: path.resolve('src/routes'),
      services: path.resolve('src/services'),
      utils: path.resolve('src/utils'),
      validations: path.resolve('src/validations')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'ts-loader'
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: NODE_ENV === 'development' ? './.env.development' : './.env.production',
      allowEmptyValues: true,
      systemvars: true
    }),
    new NodemonPlugin({
      script: './build/index.js',
      watch: path.resolve('./build'),
      verbose: true,
      env: {
        NODE_ENV: 'development'
      }
    })
  ],
  watch: NODE_ENV === 'development',
  externals: [nodeExternals()]
}
