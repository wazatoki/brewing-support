const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: "resources",
  devServer: {
    port: 8080,
  },
});
