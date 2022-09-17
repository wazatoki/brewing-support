import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/lib/locale/lang/ja";
import "reflect-metadata";
import { getDBInstance, getRemoteDBInstance } from "@/repositories/pouchdb";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { locale })
  .mount("#app");

getDBInstance().sync(getRemoteDBInstance(), {
  live: true,
});
