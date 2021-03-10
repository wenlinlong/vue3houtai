module.exports = {
  //跨域
  devServer: {
    proxy: {
      '/api': {
        ws: false,
        target: 'http://localhost:7001',
        changeOrigin: true,
        withCredentials: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }

  }
}