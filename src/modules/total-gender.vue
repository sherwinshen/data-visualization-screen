<template>
  <div class="total-gender-wrapper">
    <div class="total-gender-item">
      <div class="left">
        <img src="http://img.alicdn.com/tfs/TB1p9Luq8v0gK0jSZKbXXbK2FXa-500-500.png" />
      </div>
      <div class="right">
        <div class="title">男性用户人数</div>
        <div class="subtitle">Number of male users</div>
        <div class="age">
          <count-to :startVal="startMale" :endVal="endMale" :duration="countToDuration" />
          <span class="age-unit">万人</span>
        </div>
      </div>
    </div>
    <div class="total-gender-item">
      <div class="left">
        <img src="http://img.alicdn.com/tfs/TB1p9Luq8v0gK0jSZKbXXbK2FXa-500-500.png" />
      </div>
      <div class="right">
        <div class="title">女性用户人数</div>
        <div class="subtitle">Number of female users</div>
        <div class="age">
          <count-to :startVal="startFemale" :endVal="endFemale" :duration="countToDuration" />
          <span class="age-unit">万人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { countToDuration } from "@/const";

const props = withDefaults(
  defineProps<{
    data: any[];
  }>(),
  {}
);

const startMale = ref(0);
const endMale = ref(0);
const startFemale = ref(0);
const endFemale = ref(0);

watch(
  () => props.data,
  (newVal, oldVal) => {
    startMale.value = oldVal?.[0]?.value || 0;
    endMale.value = newVal?.[0]?.value || 0;
    startFemale.value = oldVal?.[1]?.value || 0;
    endFemale.value = newVal?.[1]?.value || 0;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.total-gender-wrapper {
  display: flex;
  padding: 20px 0px;
  .total-gender-item {
    flex: 1;
    display: flex;
    .left {
      flex: 0 68px;
      img {
        width: 68px;
        height: 68px;
      }
    }
    .right {
      flex: auto;
      margin-left: 24px;
      .age {
        font-size: 48px;
        font-weight: 500;
        margin-top: 10px;
        .age-unit {
          margin-left: 8px;
          font-size: 24px;
        }
      }
    }
  }
}
</style>
