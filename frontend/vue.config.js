const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: "resources",
  devServer: {
    port: 8080,
  },
  pages: {
    index: {
      // entry for the page
      entry: "src/main.ts",
      title: "brewing support",
    },
  },
  // configureWebpack: {
  //   resolve: {
  //     fallback: { crypto: false, fs: false, stream: false },
  //   },
  // },
});
