import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);
app.use(router);

// api({
//   path: "/auth/authentication",
// }).then((e) => {
//   localStorage.access_token = e.access_token;
//   app.mount("#app");
// });
app.mount("#app");
