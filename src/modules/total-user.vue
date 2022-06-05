<template>
  <div class="total-user-wrapper">
    <div class="title">外卖用户总数</div>
    <div class="subtitle">User Total Count</div>
    <count-to class="total-num" :start-val="startTodayUser" :end-val="todayUser" :duration="countToDuration"></count-to>
    <div class="growth-wrapper">
      <div class="growth-day">
        每日增长率:
        <count-to
          :start-val="startGrowthLastDay"
          :end-val="growthLastDay"
          :duration="countToDuration"
          :decimals="2"
          suffix="%"
        />
      </div>
      <div class="growth-month">
        每月增长率:
        <count-to
          :start-val="startGrowthLastMonth"
          :end-val="growthLastMonth"
          :duration="countToDuration"
          :decimals="2"
          suffix="%"
        />
      </div>
    </div>
    <div class="percent-wrapper">
      <div class="percent" :style="`width: ${Math.min(growthLastDay, 100)}%`"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { countToDuration } from "@/const";

const props = withDefaults(
  defineProps<{
    todayUser?: number;
    growthLastDay?: number;
    growthLastMonth?: number;
  }>(),
  {
    todayUser: 0,
    growthLastDay: 0,
    growthLastMonth: 0,
  }
);

const startTodayUser = ref(0);
const startGrowthLastDay = ref(0);
const startGrowthLastMonth = ref(0);
watch(
  () => props.todayUser,
  (newVal, oldVal) => {
    startTodayUser.value = oldVal || 0;
  },
  {
    immediate: true,
  }
);
watch(
  () => props.growthLastDay,
  (newVal, oldVal) => {
    startGrowthLastDay.value = oldVal || 0;
  },
  {
    immediate: true,
  }
);
watch(
  () => props.growthLastMonth,
  (newVal, oldVal) => {
    startGrowthLastMonth.value = oldVal || 0;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.total-user-wrapper {
  .total-num {
    font-size: 68px;
    font-weight: 500;
    letter-spacing: 2px;
    padding: 10px 0px;
  }
  .growth-wrapper {
    display: flex;
    align-items: center;
    font-size: 30px;
    .growth-day {
      color: #c5fb79;
      flex: 1;
    }
    .growth-month {
      color: #63a900;
      flex: 1;
    }
  }
  .percent-wrapper {
    width: 100%;
    height: 20px;
    border: 1px solid #fff;
    margin-top: 10px;
    padding: 2px;
    box-sizing: border-box;
    .percent {
      height: 100%;
      background: rgb(150, 150, 150);
      transition: all 1s linear;
    }
  }
}
</style>
