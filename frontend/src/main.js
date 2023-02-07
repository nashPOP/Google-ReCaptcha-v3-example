import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueReCaptcha } from "vue-recaptcha-v3";

createApp(App)
  .use(VueReCaptcha, { siteKey: "6LdCNlwkAAAAAOvEJNKHU3weOGYiRiXBwoESn1Qw" })
  .use(router)
  .mount("#app");
