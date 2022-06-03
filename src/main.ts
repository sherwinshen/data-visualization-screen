import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/common.less";
import CountTo from "vue3-count-to";

createApp(App).use(CountTo).mount("#app");
