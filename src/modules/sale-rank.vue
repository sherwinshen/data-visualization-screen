<template>
  <div class="sale-rank-wrapper">
    <div class="title">地区商家销售排行</div>
    <div class="list-wrapper">
      <div class="list-inner" v-for="(item, index) in currentData" :key="`${index}-${item.title}`">
        <sale-rank-item :data="item"></sale-rank-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SaleRankItem from "@/components/sale-rank-item.vue";

const props = withDefaults(
  defineProps<{
    data: any[];
  }>(),
  {}
);

const flag = ref(false); // 为方便调试，只监听一次watch更新
let currentIndex = 0;
const allData = ref<any[]>([]); // 存储所有数据
const currentData = ref<any[]>([]);
const step = 3; // 显示数量
let task: any;
const imgList = [
  "https://img.alicdn.com/tfs/TB1Z171qebviK0jSZFNXXaApXXa-30-29.png",
  "https://img.alicdn.com/tfs/TB1b8Tzq7T2gK0jSZFkXXcIQFXa-28-24.png",
  "https://img.alicdn.com/tfs/TB12MbzqYY1gK0jSZTEXXXDQVXa-28-30.png",
];

const updateData = () => {
  const tempData = allData.value.slice(currentIndex, currentIndex + step);
  const temp = [];
  for (let i = 0; i < tempData.length; i++) {
    // 处理scrollData
    const rowData = [] as any[];
    const aligns = [];
    const shopData = tempData[i].shop;
    for (let j = 0; j < shopData.length; j++) {
      rowData[j] = [];
      aligns[j] = "center";
      for (let k = 0; k < 3; k++) {
        let text = "";
        switch (k) {
          case 0:
            text = shopData[j].shop;
            break;
          case 1:
            text = shopData[j].order;
            break;
          case 2:
            text = shopData[j].sales;
            break;
          default:
        }
        if (k === 2) {
          rowData[j].push(`<div style="color:rgb(178,209,126)">${text}</div>`);
        } else {
          rowData[j].push(`<div style="color:rgb(255,255,255)">${text}</div>`);
        }
      }
    }
    const scrollData = {
      headerData: ["商家", "订单数", "销售额"],
      indexFlag: false,
      rowData, // 表格数据
      aligns, // 表格排序
      rowNum: 4, // 显示行数
      oddRowBGC: "rgb(40, 40, 40)", // 奇数背景色
      evenRowBGC: "rgb(55, 55, 55)", // 偶数背景色
      rowFontSize: 20, // 表格文字大小
      headerFontSize: 22, // 表头文字大小
    };

    temp.push({
      title: tempData[i].city,
      img: imgList[i],
      scrollData,
      rate: tempData[i].rate,
    });
  }
  currentData.value = temp;
};
const updateIndex = () => {
  if (currentIndex >= allData.value.length - step) {
    currentIndex = 0;
  } else {
    currentIndex += step;
  }
};
const handleData = () => {
  updateData();
  // task = setInterval(() => {
  //   updateIndex();
  //   updateData();
  // }, 4000);
};

onUnmounted(() => task && clearInterval(task));

watch(
  () => props.data,
  (newValue) => {
    if (flag.value) return;
    allData.value = newValue;
    handleData();
    flag.value = true;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.sale-rank-wrapper {
  width: 100%;
  height: 100%;

  .list-wrapper {
    display: flex;
    width: 100%;
    height: 545px;
    margin-top: 20px;

    .list-inner {
      flex: 0 0 32%;
      width: 30%;
      background: rgb(45, 45, 45);
      margin: 0px 2%;
      &:first-child,
      &:last-child {
        margin: 0px;
      }
    }
  }
}
</style>
