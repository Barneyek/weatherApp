import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import VeeValidatePlugin from "./includes/validation";
import router from "./router";
import { auth } from "@/firebase/firebaseInit";

import "./assets/main.css";

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);

    app.mount("#app");
  }
});
