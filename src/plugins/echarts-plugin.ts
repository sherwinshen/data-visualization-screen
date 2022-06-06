import ECharts from "vue-echarts";
import { use } from "echarts/core";

import { CanvasRenderer } from "echarts/renderers";
import { BarChart, ScatterChart, LinesChart, EffectScatterChart } from "echarts/charts";
import {
  TimelineComponent,
  GeoComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  BarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
  TimelineComponent,
  GeoComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
]);

export default ECharts;
