<template>
  <div class="total-user">
    <div class="title">外卖用户总数</div>
    <div class="subtitle">User Total Count</div>
    <count-to class="total-num" l="preTodayUser" :endVal="todayUser" :duration="countToDuration"></count-to>
    <div class="growth-wrapper">
      <div class="growth-day">
        每日增长率:
        <count-to
          :start-val="preGrowthLastDay"
          :end-val="growthLastDay"
          :duration="countToDuration"
          :decimals="2"
          suffix="%"
        />
      </div>
      <div class="growth-month">
        每月增长率:
        <count-to
          :start-val="preGrowthLastMonth"
          :end-val="growthLastMonth"
          :duration="countToDuration"
          :decimals="2"
          suffix="%"
        />
      </div>
    </div>
    <div class="percent-wrapper">
      <div class="percent" :style="`width: ${growthLastDay}%`"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CountTo } from "vue3-count-to";
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

const preTodayUser = ref(0);
const preGrowthLastDay = ref(0);
const preGrowthLastMonth = ref(0);
watch(
  () => props.todayUser,
  (newVal, oldVal) => {
    preTodayUser.value = oldVal;
  }
);
watch(
  () => props.growthLastDay,
  (newVal, oldVal) => {
    preGrowthLastDay.value = oldVal;
  }
);
watch(
  () => props.growthLastMonth,
  (newVal, oldVal) => {
    preGrowthLastMonth.value = oldVal;
  }
);
</script>

<style lang="less" scoped>
.total-user {
  width: 100%;
  height: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  .total-num {
    font-size: 68px;
    font-weight: 500;
    letter-spacing: 2px;
    padding: 10px 0px;
  }
  .growth-wrapper {
    display: flex;
    align-items: center;
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
