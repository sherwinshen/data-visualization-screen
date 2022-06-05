<template>
  <div class="average-age-wrapper">
    <div class="title-wrapper">
      <div class="title-left">
        <div class="title">外卖用户年龄分布&平均年龄</div>
        <div class="subtitle">Distribution of Age</div>
      </div>
      <div class="title-right">
        <div class="age">
          <count-to :startVal="startAge" :endVal="avgAge" :duration="1000" :decimals="2" />
          <span class="age-unit">岁</span>
        </div>
      </div>
    </div>
    <div class="chart-wrapper">
      <div ref="chartRef" class="chart"></div>
    </div>
    <div class="average-data-wrapper">
      <div class="average-data" v-for="(item, index) in data" :key="index">
        <div class="average-data-value">
          <count-to :startVal="item.startValue" :endVal="item.value" :duration="countToDuration" />
        </div>
        <div class="average-data-axis">
          <div class="point" :style="{ background: colors[index] }" />
          <div class="text">{{ item.axis }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { countToDuration, colors } from "@/const";
import { Bar, BarOptions } from "@antv/g2plot";

const props = withDefaults(
  defineProps<{
    data: any[];
    avgAge?: number;
  }>(),
  {
    avgAge: 0,
  }
);

const startAge = ref(0);
watch(
  () => props.avgAge,
  (newVal, oldVal) => {
    startAge.value = oldVal || 0;
  }
);

const chartRef = ref(null) as any;
const chart = ref(null) as any;
const initChart = () => {
  if (!chart.value) {
    // 初始化图表
    if (chartRef.value) {
      const options = {
        data: props.data.reverse(),
        isStack: true,
        xField: "value",
        yField: "type",
        seriesField: "axis",
        legend: false,
        color: colors,
        maxBarWidth: 20,
        xAxis: {
          grid: null,
          label: null,
          maxLimit: props.data.reduce((total, item) => {
            return total + item.value;
          }, 0),
        },
        yAxis: {
          grid: null,
          label: null,
          line: null,
        },
        supportCSSTransform: true, // 外部设置了 transform 则必须要设置为 true
      } as BarOptions;
      chart.value = new Bar(chartRef.value, options);
    }
    chart.value.render();
    return;
  }
  // 更新图表数据
  const data = props.data.reverse();
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
.average-age-wrapper {
  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .age {
      font-size: 68px;
      font-weight: 500;
      .age-unit {
        font-size: 32px;
        font-weight: normal;
        margin-left: 8px;
      }
    }
  }
  .chart-wrapper {
    height: 100px;
    .chart {
      height: 100%;
    }
  }
  .average-data-wrapper {
    display: flex;

    .average-data {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: bolder;

      .average-data-value {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }

      .average-data-axis {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 5px;

        .point {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .text {
          margin-left: 10px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
