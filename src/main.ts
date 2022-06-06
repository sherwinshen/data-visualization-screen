import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/common.less";
import CountTo from "vue3-count-to";
import ECharts from "@/plugins/echarts-plugin";

const app = createApp(App);
app.component("v-chart", ECharts).use(CountTo).mount("#app");
