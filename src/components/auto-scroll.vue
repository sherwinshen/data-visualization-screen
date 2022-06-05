<template>
  <div class="auto-scroll" :id="id">
    <div
      class="header-wrapper"
      :style="{
        backgroundColor: actualConfig.headerBGC,
        height: `${actualConfig.headerHeight}px`,
        fontSize: `${actualConfig.headerFontSize}px`,
        color: actualConfig.headerColor,
      }"
    >
      <div
        class="header-item text"
        v-for="(item, index) in actualHeaderData"
        v-html="item"
        :key="index"
        :width="actualHeaderStyle[index]"
        :align="actualAligns[index]"
        :style="{ width: `${columnWidth[index]}px`, ...actualHeaderStyle[index] }"
      ></div>
    </div>
    <div class="row-wrapper" :style="{ height: `${height - actualConfig.headerHeight}px` }">
      <div
        class="row-list"
        v-for="(row, listIndex) in currentRowData"
        :key="`${row.index}-${listIndex}`"
        :color="actualConfig.evenRowBGC"
        :style="{
          height: `${rowHeights[listIndex]}px`,
          backgroundColor: row.index % 2 === 0 ? actualConfig.evenRowBGC : actualConfig.oddRowBGC,
          fontSize: `${actualConfig.rowFontSize}px`,
          color: actualConfig.rowColor,
        }"
      >
        <div
          class="row-item text"
          v-for="(item, rowIndex) in row.data"
          :key="rowIndex"
          v-html="item"
          :style="{ width: `${columnWidth[rowIndex]}px`, ...actualRowStyle[rowIndex] }"
          :align="actualAligns[rowIndex]"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";
import assign from "lodash/assign";
import cloneDeep from "lodash/cloneDeep";
import useDomSize from "@/compositions/useDomSize";

const props = withDefaults(
  defineProps<{
    config: any;
  }>(),
  {}
);

const defaultConfig = {
  // header数据
  headerData: [],
  // header样式
  headerStyle: [],
  // row数据
  rowData: [],
  // row样式
  rowStyle: [],
  // 是否使用索引
  indexFlag: false,
  // header索引内容
  headerIndexContent: "#",
  // row索引内容
  rowIndexContent: [],
  // header索引内容样式
  headerIndexStyle: {
    width: "80px",
  },
  // row索引内容样式
  rowIndexStyle: {
    width: "80px",
  },
  // 显示数据条数
  rowNum: 10,
  // 动画移动数据条数
  moveNum: 1,
  // 动画间隔时间
  duration: 2000,
  // 内容位置
  aligns: [],
  // 公共样式
  commonBGC: "#fff",
  headerBGC: "rgb(90,90,90)",
  headerHeight: 35,
  headerFontSize: 28,
  headerColor: "#fff",
  oddRowBGC: "#fff",
  evenRowBGC: "#fff",
  rowFontSize: 28,
  rowColor: "#000",
};

const id = `basic-scroll-${uuidv4()}`;
const { width, height } = useDomSize(id);
const isAnimationStart = ref(true);
const actualConfig = ref({}) as any;
const columnWidth = ref<number[]>([]);
const actualAligns = ref<string[]>([]);
const actualHeaderData = ref<any[]>([]);
const actualHeaderStyle = ref<any[]>([]);
const actualRowStyle = ref<any[]>([]);
const actualRowData = ref<any[]>([]);
const currentRowData = ref<any[]>([]);
const rowHeights = ref<number[]>([]);
const currentIndex = ref(0);
let avgHeight: number;

// 处理数据
const updateData = () => {
  // 将人为定义的config与defaultConfig合并
  actualConfig.value = assign(defaultConfig, props.config);
  // 处理header
  handleHeader();
  // 处理row
  handleRow();
  // 开始动画
  startAnimation();
};
// 处理header
const handleHeader = () => {
  const config = actualConfig.value;
  const _headerData = cloneDeep(config.headerData);
  const _headerStyle = cloneDeep(config.headerStyle);
  let _rowData = cloneDeep(config.rowData);
  const _rowStyle = cloneDeep(config.rowStyle);
  const _aligns = cloneDeep(config.aligns);

  if (_headerData.length === 0) return;

  // 处理索引列数据
  if (config.indexFlag) {
    _headerData.unshift(config.headerIndexContent);
    _headerStyle.unshift(config.headerIndexStyle);
    _rowData.forEach((item: any, index: number) => {
      if (config.rowIndexContent.length > 0 && config.rowIndexContent[index]) {
        item.unshift(config.rowIndexContent[index]);
      } else {
        item.unshift(index + 1);
      }
    });
    _rowStyle.unshift({ ...config.rowIndexStyle, backgroundColor: config.commonBGC, height: "100%" });
    _aligns.unshift("center");
  }

  // 动态计算宽度（个人定义的宽度优先）
  let usedWidth = 0;
  let usedColumnNum = 0;
  _headerStyle.forEach((item: any) => {
    if (item.width) {
      usedWidth += Number(item.width.replace("px", ""));
      usedColumnNum += 1;
    }
  });
  const avgWidth = (width.value - usedWidth) / (_headerData.length - usedColumnNum);
  const _columnWidth = new Array(_headerData.length).fill(avgWidth);
  _headerStyle.forEach((item: any, index: number) => {
    if (item.width) {
      _columnWidth[index] = Number(item.width.replace("px", ""));
    }
  });
  columnWidth.value = _columnWidth;

  actualHeaderData.value = _headerData;
  actualHeaderStyle.value = _headerStyle;
  actualRowStyle.value = _rowStyle;
  actualAligns.value = _aligns;
  // 为了滑动流畅，可以让滑动窗口大于等于两倍rowNum
  const { rowNum } = config;
  if (_rowData.length >= rowNum && _rowData.length < rowNum * 2) {
    _rowData = [..._rowData, ..._rowData];
  }
  actualRowData.value = _rowData.map((item: any, index: number) => ({
    data: item,
    index: index,
  }));
};
// 处理row
const handleRow = () => {
  let rowNum = actualConfig.value.rowNum;
  if (rowNum > actualRowData.value.length) {
    rowNum = actualRowData.value.length;
  }
  avgHeight = (height.value - actualConfig.value.headerHeight) / rowNum;
  rowHeights.value = new Array(rowNum).fill(avgHeight);
};
// 开始动画
const startAnimation = async () => {
  if (!isAnimationStart.value) {
    return;
  }
  const config = actualConfig.value;
  const { rowNum, moveNum, duration } = config;
  const totalNum = actualRowData.value.length;

  if (totalNum <= rowNum) return;

  // 1. 数据首尾拼接
  const index = currentIndex.value;
  const _rowData = cloneDeep(actualRowData.value);
  const tempData = _rowData.slice(index);
  tempData.push(..._rowData.slice(0, index));
  currentRowData.value = tempData;
  // 2.所有row的高度还原
  rowHeights.value = new Array(totalNum).fill(avgHeight);
  const waitTime = 300;
  await sleep(waitTime);
  // 3. 将要消失的row高度设置为0
  rowHeights.value.splice(0, moveNum, ...new Array(moveNum).fill(0));
  currentIndex.value += moveNum;
  // 4. 判断是否达到最后一组数据
  const isLast = currentIndex.value - totalNum;
  if (isLast >= 0) {
    currentIndex.value = isLast;
  }
  // 5. 等待duration时间间隔并重复
  await sleep(duration - waitTime);
  await startAnimation()
};

// 结束动画
const stopAnimation = () => {
  isAnimationStart.value = false;
};
const sleep = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

onMounted(() => {
  updateData();
});
onUnmounted(() => {
  stopAnimation();
});
watch(
  () => props.config,
  () => {
    updateData();
  }
);
</script>

<style lang="less" scoped>
.auto-scroll {
  height: 100%;
  width: 100%;
  .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header-wrapper {
    display: flex;
    align-items: center;
  }
  .row-wrapper {
    overflow: hidden;
    .row-list {
      overflow: hidden;
      display: flex;
      align-items: center;
      transition: all 0.3s linear;
    }
  }
}
</style>
