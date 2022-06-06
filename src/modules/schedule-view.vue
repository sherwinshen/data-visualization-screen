<template>
  <div class="schedule-view-wrapper">
    <div class="chart-wrapper">
      <v-chart :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as Echarts from "echarts";

const getVirtualData = (year: string) => {
  year = year || "2020";
  const date = +Echarts.number.parseDate(year + "-06-01");
  const end = +Echarts.number.parseDate(+year + 1 + "-12-31");
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([Echarts.format.formatTime("yyyy-MM-dd", time), Math.floor(Math.random() * 10000)]);
  }
  return data;
};

const data = getVirtualData("2020");

const option = {
  calendar: [
    {
      top: 30,
      left: 30,
      right: 0,
      bottom: 10,
      range: ["2020-06-01", "2020-12-31"],
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgb(127, 127, 127)",
        },
      },
      yearLabel: { show: false },
      dayLabel: {
        color: "rgb(127, 127, 127)",
        fontSize: 18,
      },
      monthLabel: {
        color: "rgb(127, 127, 127)",
        fontSize: 18,
      },
      itemStyle: {
        color: "rgb(48, 48, 48)",
        borderWidth: 1,
        borderColor: "rgb(48, 48, 48)",
      },
    },
  ],
  series: [
    {
      name: "步数",
      type: "scatter",
      coordinateSystem: "calendar",
      data,
      symbolSize: function (val: any) {
        return val[1] / 600;
      },
      itemStyle: {
        color: "rgb(208,248,138)",
      },
    },
    {
      name: "Top 12",
      type: "effectScatter",
      coordinateSystem: "calendar",
      data: data
        .sort(function (a: any, b: any) {
          return b[1] - a[1];
        })
        .slice(0, 12),
      symbolSize: function (val: any) {
        return val[1] / 500;
      },
      showEffectOn: "render",
      rippleEffect: {
        brushType: "stroke",
      },
      emphasis: {
        scale: 1.5,
      },
      itemStyle: {
        color: "rgb(208,248,138)",
        shadowBlur: 10,
        shadowColor: "#333",
      },
      zlevel: 1,
    },
  ],
};
</script>

<style lang="less" scoped>
.schedule-view-wrapper {
  width: 100%;
  height: 100%;

  .chart-wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>
