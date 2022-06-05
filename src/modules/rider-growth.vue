<template>
  <div class="rider-growth-wrapper">
    <div class="title-wrapper">
      <div class="title">外卖骑手概况</div>
      <div class="subtitle">Rider Growth rate</div>
    </div>
    <div class="chart-wrapper">
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Line, LineOptions } from "@antv/g2plot";

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {}
);

const current = ref("orderData");

const chartRef = ref(null) as any;
const chart = ref(null) as any;
const formatData = (data: any, type: string) => {
  const axisX = data.axisX;
  const chartData = [] as any[];
  data[type].data1.forEach((item: any, index: number) => {
    chartData.push({
      name: data[type].legend1,
      axisX: axisX[index],
      value: Number(item),
    });
  });
  data[type].data2.forEach((item: any, index: number) => {
    chartData.push({
      name: data[type].legend2,
      axisX: axisX[index],
      value: Number(item),
    });
  });
  return chartData;
};
const initChart = () => {
  current.value = current.value === "orderData" ? "rateData" : "orderData";
  if (!chart.value) {
    // 初始化图表
    if (chartRef.value) {
      const data = formatData(props.data, current.value);
      const options = {
        xField: "axisX",
        yField: "value",
        seriesField: "name",
        data,
        smooth: true,
        legend: {
          position: "top-right",
          itemName: {
            style: {
              fill: "#fff",
            },
          },
        },
        colorField: "name", // 部分图表使用 seriesField
        color: ["rgb(209,248,139)", "rgb(115,201,245)"],
        supportCSSTransform: true, // 外部设置了 transform 则必须要设置为 true
      } as LineOptions;
      chart.value = new Line(chartRef.value, options);
    }
    chart.value.render();
    return;
  }
  // 更新图表数据
  const data = formatData(props.data, current.value);
  chart.value.changeData(data);
};

onMounted(() => {
  initChart();
});

watch(
  () => props.data,
  () => {
    initChart();
  }
);
</script>

<style lang="less" scoped>
.rider-growth-wrapper {
  .chart-wrapper {
    height: 250px;
    .chart {
      height: 100%;
    }
  }
}
</style>
