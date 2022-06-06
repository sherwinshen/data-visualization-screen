<template>
  <div class="total-device-wrapper">
    <div class="chart-wrapper">
      <div ref="chartRef" class="chart"></div>
    </div>
    <div class="content-wrapper">
      <div class="title-wrapper">
        <div class="left">
          <div class="title">外卖登录设备</div>
          <div class="subtitle">Distribution of Internet devices</div>
        </div>
        <div class="right">
          <div class="age">
            <count-to :startVal="startNum" :endVal="num" :duration="countToDuration" />
            <span class="age-unit">台</span>
          </div>
        </div>
      </div>
      <div class="average-data-wrapper">
        <div class="average-data" v-for="(item, index) in refData" :key="index">
          <div class="average-data-value">
            <count-to :startVal="item.startValue" :endVal="item.value" :duration="countToDuration" />
          </div>
          <div class="average-data-axis">
            <div class="point" :style="{ background: item.color }" />
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { countToDuration, colors } from "@/const";
import { Rose, RoseOptions } from "@antv/g2plot";

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {}
);

const chartRef = ref(null) as any;
const chart = ref(null) as any;
const initChart = () => {
  if (!chart.value) {
    // 初始化图表
    if (chartRef.value) {
      const options = {
        data: (props.data as any).devices,
        xField: "key",
        yField: "value",
        seriesField: "key",
        legend: false,
        radius: 0.9,
        color: colors,
        label: false,
        pieStyle: {
          lineWidth: 0,
        },
        supportCSSTransform: true, // 外部设置了 transform 则必须要设置为 true
      } as RoseOptions;
      chart.value = new Rose(chartRef.value, options);
    }
    chart.value.render();
    return;
  }
  // 更新图表数据
  const data = (props.data as any).devices;
  chart.value.changeData(data);
};

const startNum = ref(0);
const num = ref(0);
const refData = ref<any[]>([]);
const updateData = () => {
  startNum.value = num.value;
  const data = props.data as any;
  num.value = parseInt(data.totalDevices);
  if (refData.value.length > 0) {
    refData.value = data.devices.map((item: any, index: number) => ({
      startValue: refData.value[index].value,
      value: item.value,
      name: item.key,
      color: colors[index],
    }));
  } else {
    refData.value = data.devices.map((item: any, index: number) => ({
      startValue: 0,
      value: item.value,
      name: item.key,
      color: colors[index],
    }));
  }
};

onMounted(() => {
  updateData();
  initChart();
});

watch(
  () => props.data,
  () => {
    updateData();
    initChart();
  },
  {
    deep: true,
  }
);
</script>

<style lang="less" scoped>
.total-device-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  .chart-wrapper {
    flex: 0 200px;
    width: 200px;
    height: 100%;
    margin-right: 20px;
    .chart {
      width: 100%;
      height: 100%;
    }
  }
  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 25px 0px;
    box-sizing: border-box;

    .title-wrapper {
      display: flex;
      align-items: center;

      .left {
        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          margin-top: 10px;
        }
      }

      .right {
        flex: 1;
        font-weight: bold;
        text-align: right;

        .age {
          font-size: 56px;

          .age-unit {
            font-size: 20px;
            display: inline-block;
            margin-left: 5px;
          }
        }
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
          width: 100%;
        }

        .average-data-axis {
          display: flex;
          align-items: center;
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
}
</style>
