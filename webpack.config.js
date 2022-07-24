module.exports = {


  devtool: "source-map",
  cache: true,

  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  resolve: {
    fallback: {
      os: false,
      assert: false,
      // http: false,
      // htthttps:false,
      // process: false,
      http: false,
      https: require.resolve("https-browserify"),
      process: require.resolve("process"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
  optimization: {

  concatenateModules: false,
  splitChunks: {
    chunks: 'all',

    },
  },

};
