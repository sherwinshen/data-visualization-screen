<template>
  <div class="average-view-wrapper">
    <div class="content-wrapper">
      <div class="title">实时订单趋势图</div>
      <div class="subtitle">Number Of Real-time Orders</div>
      <div class="total">
        <count-to :start-val="startVal" :end-val="endVal" :duration="countToDuration" separator="," autoplay />
      </div>
      <div class="tiny-title">周同比增长率</div>
      <div class="percent-text">
        <span class="percent-text-1">
          <count-to :start-val="startPercent" :end-val="percent" :duration="countToDuration" :decimals="2" suffix="%" />
        </span>
      </div>
    </div>
    <div class="chart-wrapper">
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Line, LineOptions } from "@antv/g2plot";
import { countToDuration, colors } from "@/const";

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {}
);

const chartRef = ref(null) as any;
const chart = ref(null) as any;
const formatData = (data: any) => {
  const chartData = [] as any[];
  data.data.forEach((item: any, index: number) => {
    chartData.push({
      time: data.date[index],
      value: item,
    });
  });
  return chartData;
};
const initChart = () => {
  if (!chart.value) {
    // 初始化图表
    if (chartRef.value) {
      const options = {
        xField: "time",
        yField: "value",
        data: formatData(props.data),
        smooth: true,
        slider: {
          height: 25,
        },
        padding: [30, 10, 65, 10],
        color: colors[0],
        supportCSSTransform: true, // 外部设置了 transform 则必须要设置为 true
      } as LineOptions;
      chart.value = new Line(chartRef.value, options);
    }
    chart.value.render();
    return;
  }
  // 更新图表数据
  const data = formatData(props.data);
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

const startVal = 0;
const endVal = 23242;
const startPercent = 0;
const kpi = 999999;
const percent = (23242 / kpi) * 100;
</script>

<style lang="less" scoped>
.average-view-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .content-wrapper {
    flex: 0 0 280px;
    width: 280px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
    .total {
      font-size: 68px;
      font-weight: bolder;
      letter-spacing: 2px;
      padding: 10px 0;
    }

    .tiny-title {
      font-size: 18px;
      color: #fff;
      line-height: 36px;
    }

    .percent-text {
      font-size: 28px;
      letter-spacing: 2px;

      .percent-text-1 {
        color: rgb(197, 251, 121);
        font-weight: bolder;
      }
    }
  }

  .chart-wrapper {
    flex: 1;
    height: 100%;
    .chart {
      height: 100%;
    }
  }
}
</style>
