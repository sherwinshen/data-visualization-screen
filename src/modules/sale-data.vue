<template>
  <div class="sale-data-wrapper">
    <div class="chart-wrapper">
      <v-chart :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as ECharts from "echarts";
import mapData from "@/api/mocks/mapData";

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {}
);

const flag = ref(false); // 为方便调试，只监听一次watch更新
const option = ref({});
const { allBarData, geoCoordMap } = mapData as any;

const handleData = () => {  
  ECharts.registerMap("china", props.data);
  const cities = ["长春", "上海", "青岛", "杭州", "成都", "广州"];
  const colors = ["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#04B9FF"];
  const geoGpsMap = {
    1: [125.8154, 44.2584],
    2: [125.8154, 44.2584],
    3: [117.1582, 36.8701],
    4: [117.1582, 36.8701],
    5: [103.9526, 30.7617],
    6: [103.9526, 30.7617],
  } as any;

  // 散点数据
  const convertData = function (data: any) {
    const res = [];
    const cities = Object.keys(data);
    const values = Object.values(data);
    for (let i = 0; i < cities.length; i++) {
      const geoCoord = geoCoordMap[cities[i]];
      if (geoCoord) {
        res.push({
          name: cities[i],
          value: geoCoord.concat(values[i]),
        });
      }
    }
    return res;
  };

  // 飞线数据
  const convertToLineData = function (data: any, gps: any) {
    const res = [];
    const cities = Object.keys(data);
    for (let i = 0; i < cities.length; i++) {
      const toCoord = geoCoordMap[cities[i]];
      const fromCoord = gps;
      if (fromCoord && toCoord) {
        res.push([fromCoord, toCoord]);
      }
    }
    return res;
  };

  const categoryData = [];
  for (let i = 0; i < cities.length; i++) {
    categoryData.push(Object.keys(allBarData[`d${i + 1}`]));
  }

  const barData = [];
  for (let i = 0; i < cities.length; i++) {
    barData.push(Object.values(allBarData[`d${i + 1}`]));
  }

  const options = [];
  for (let i = 0; i < cities.length; i++) {
    options.push({
      backgroundColor: "#424446",
      title: [
        {
          text: "外卖销售大盘",
          subtext: "数据由慕课外卖大数据提供",
          top: "2%",
          textStyle: {
            color: "#fff",
            fontSize: 35,
            fontWeight: 700,
          },
          subtextStyle: {
            color: "#fff",
          },
        },
        {
          text: cities[i] + "销售额统计情况",
          left: "75%",
          top: "8%",
          textStyle: {
            color: "#fff",
            fontSize: 25,
          },
        },
      ],
      xAxis: {
        type: "value",
        scale: true,
        position: "top",
        min: 0,
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 2,
          color: "#aaa",
        },
      },
      yAxis: {
        type: "category",
        inverse: true,
        nameGap: 16,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#ddd",
          },
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: "#ddd",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#ddd",
        },
        data: categoryData[i],
      },
      series: [
        {
          type: "bar",
          data: barData[i],
          realtimeSort: true,
          itemStyle: {
            color: colors[i],
          },
        },
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          data: convertData(allBarData[`d${i + 1}`]),
          symbolSize: function (val: any) {
            return val[2] / 40;
          },
          // 涟漪样式
          rippleEffect: {
            brushType: "stroke",
          },
          emphasis: {
            scale: 1.5,
          },
          label: {
            position: "right",
            show: true,
            formatter: (params: any) => {
              return params.data.name;
            },
          },
          itemStyle: {
            color: colors[i],
            shadowColor: colors[i],
            shadowBlur: 10,
          },
          zlevel: 1,
        },
        {
          type: "lines",
          data: convertToLineData(allBarData[`d${i + 1}`], geoGpsMap[i + 1]),
          effect: {
            show: true,
            period: 4,
            symbol: "arrow",
            symbolSize: 3,
            trailLength: 0.02,
          },
          lineStyle: {
            color: colors[i],
            width: 0.1,
            opacity: 0.5,
            curveness: 0.3,
          },
          zlevel: 2,
        },
      ],
    });
  }

  const baseOption = {
    animationDuration: 0,
    animationDurationUpdate: 300,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
    title: {
      text: "外卖销售大盘",
      color: "#fff",
      fontSize: 36,
    },
    timeline: {
      axisType: "category",
      autoPlay: true,
      playInterval: 3000,
      left: "10%",
      right: "5%",
      bottom: "3%",
      width: "80%",
      data: cities,
      label: {
        color: "#ddd",
      },
      emphasis: {
        label: {
          color: "#fff",
        },
        controlStyle: {
          color: "#aaa",
          borderColor: "#aaa",
        },
      },
      symbolSize: 10,
      lineStyle: {
        color: "#555",
      },
      checkpointStyle: {
        color: "#83a748",
      },
      controlStyle: {
        showNextBtn: true,
        showPrevBtn: true,
        color: "#666",
        borderColor: "#666",
      },
      progress: {
        lineStyle: {
          color: "#555",
        },
        itemStyle: {
          color: "#666",
        },
      },
    },
    geo: {
      left: "15%",
      show: true,
      map: "china",
      roam: false,
      zoom: 1,
      center: [113.83531246, 34.0267395887],
      emphasis: {
        itemStyle: {
          areaColor: "#389BB7",
          borderWidth: 0,
        },
        label: {
          show: false,
        },
      },
      itemStyle: {
        borderColor: "rgba(147, 235, 248, 1)",
        borderWidth: 1,
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        shadowColor: "rgba(128, 217, 248, 1)",
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
    },
    grid: {
      right: "5%",
      top: "15%",
      bottom: "15%",
      width: "20%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "rgba(150,150,150,0.1)",
        },
      },
    },
    series: [],
  };

  option.value = {
    baseOption,
    options,
  };
};

watch(
  () => props.data,
  () => {
    if (flag.value) return true;
    handleData();
    flag.value = true;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.sale-data-wrapper {
  .chart-wrapper {
    height: 960px;
  }
}
</style>
