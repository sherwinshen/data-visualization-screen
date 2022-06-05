<template>
  <div class="sale-rank-item">
    <div class="list-title">{{ data.title }}</div>
    <div class="list-separator-wrapper">
      <div class="list-separator" />
    </div>
    <div class="chart-wrapper">
      <div class="img-wrapper">
        <img :src="data.img" alt="" />
      </div>
      <div ref="chartRef" class="chart"></div>
    </div>
    <div class="scroll-list-wrapper">
      <auto-scroll :config="data.scrollData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AutoScroll from "@/components/auto-scroll.vue";
import { Pie, PieOptions } from "@antv/g2plot";

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {}
);

const chartRef = ref(null) as any;
const chart = ref(null) as any;
const initChart = () => {
  const num = Math.abs(Number(props.data.rate.replace("%", "")));
  const chartData = [
    {
      type: "活跃用户",
      value: num,
    },
    {
      type: "非活跃用户",
      value: 100 - num,
    },
  ];
  if (!chart.value) {
    // 初始化图表
    if (chartRef.value) {
      const options = {
        data: chartData,
        angleField: "value",
        innerRadius: 0.6,
        colorField: "type",
        appendPadding: 10,
        color: ["rgb(209,248,138)", "rgb(150,150,150, 0.5)"],
        legend: false,
        label: false,
        pieStyle: {
          lineWidth: 0,
        },
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "12px",
              fontWeight: "normal",
              color: "rgb(209,248,138)",
            },
            content: `${num}%`,
            offsetY: 30,
          },
        },
        supportCSSTransform: true, // 外部设置了 transform 则必须要设置为 true
      } as PieOptions;
      chart.value = new Pie(chartRef.value, options);
    }
    chart.value.render();
    return;
  }
  // 更新图表数据
  chart.value.changeData(chartData);
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
.sale-rank-item {
  height: 100%;
  .list-title {
    font-size: 24px;
    padding: 6px 20px;
    box-sizing: border-box;
    line-height: 30px;
  }
  .list-separator-wrapper {
    position: relative;
    height: 20px;
    background: rgb(93, 93, 93);

    .list-separator {
      position: absolute;
      top: 2.5px;
      right: 15px;
      width: 15px;
      height: 15px;
      background: rgb(50, 50, 50);
    }
  }
  .category-wrapper {
    margin-top: 20px;
  }
  .chart-wrapper {
    width: 100%;
    height: 200px;
    margin-top: 20px;
    position: relative;
    .chart {
      height: 100%;
    }

    .img-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;

      img {
        width: 42px;
        height: 42px;
        margin-top: 65px;
      }
    }
  }
  .scroll-list-wrapper {
    margin-top: 20px;
    height: 230px;
  }
}
</style>
