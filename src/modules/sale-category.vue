<template>
  <div class="sale-category-wrapper">
    <div class="header">
      <div class="title-wrapper">
        <div class="title">当前热卖品类</div>
        <div class="subtitle">Hot Categories</div>
      </div>
      <div class="time">最后更新时间：{{ time }}</div>
    </div>
    <div class="chart-wrapper">
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Column, ColumnOptions } from "@antv/g2plot";

import useClock from "@/compositions/useClock";
const { time } = useClock();

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {}
);
const current = ref(0);
const chartRef = ref(null) as any;
const chart = ref(null) as any;
const formatData = (data: any, type: number) => {
  const chartData = [] as any[];
  const axisX = data[`data${type + 1}`].axisX;
  data[`data${type + 1}`].data1.forEach((item: any, index: number) => {
    chartData.push({
      name: "国内",
      axisX: axisX[index],
      value: Number(item),
    });
  });
  data[`data${type + 1}`].data2.forEach((item: any, index: number) => {
    chartData.push({
      name: "国外",
      axisX: axisX[index],
      value: Number(item),
    });
  });
  return chartData;
};
const initChart = () => {
  current.value = current.value === 0 ? 1 : 0;
  if (!chart.value) {
    // 初始化图表
    if (chartRef.value) {
      const data = formatData(props.data, current.value);
      const options = {
        data,
        legend: false,
        isStack: true,
        xField: "axisX",
        yField: "value",
        seriesField: "name",
        columnWidthRatio: 0.4,
        padding: [30, 0, 30, 30],
        color: ["rgb(150,150,150, 0.5)", "rgb(209,248,138)"],
        supportCSSTransform: true, // 外部设置了 transform 则必须要设置为 true
      } as ColumnOptions;
      chart.value = new Column(chartRef.value, options);
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
.sale-category-wrapper {
  .header {
    display: flex;
    justify-content: space-between;
    .time {
      width: 280px;
      font-size: 16px;
      margin-top: 10px;
    }
  }
  .chart-wrapper {
    height: 250px;
    .chart {
      height: 100%;
    }
  }
}
</style>
