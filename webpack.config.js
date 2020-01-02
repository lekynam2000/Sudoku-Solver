const path = require("path");
module.exports = {
  entry: {
      main:"./src/index.js",
  },
  output:{
    filename: "[name].js",
    path: path.resolve(__dirname,'dist')
  },
  devServer:{
    contentBase:path.join(__dirname,"dist"),
    port:9000
  }
  ,
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use:{
          loader : 'babel-loader',
          options : {
            presets:["@babel/preset-env","@babel/preset-react"]
          }
        }
      },
      {
        test:/\.scss$/,
        use:[
          {loader:'style-loader'},
          {loader:'css-loader'},
          {loader:"sass-loader"}
        ]
      },
      {
        test:/\.(jpg|png)$/,
        use:[
          {loader:'url-loader'},
        ]
      }

    ]

  }
}
