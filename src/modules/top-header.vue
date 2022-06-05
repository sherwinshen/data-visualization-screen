<template>
  <div class="top-header">
    <div class="left">
      <img
        class="logo"
        src="https://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/54149aa06f26afcf26f42d66c999ee8b.png"
      />
      <div class="logo-text">
        <div class="cn-text">外卖业务数据大盘</div>
        <div class="en-text">Delivery Overview of Business Data</div>
      </div>
    </div>
    <div class="right">
      <div class="time">{{ time }}</div>
      <div class="author">@sherwin</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useClock from "@/compositions/useClock";

const { time } = useClock();
</script>

<style lang="less" scoped>
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 180px;
  background: @second-bg-color;
  border-bottom: 10px solid #fff;
  .left,
  .right {
    height: 100%;
    padding: 0 64px;
  }
  .left {
    display: flex;
    align-items: center;
    .logo {
      width: 395px;
      height: 99px;
    }
    .logo-text {
      margin-left: 40px;
      color: white;
      font-weight: bold;
      font-size: 60px;
      letter-spacing: 2px;
      .en-text {
        font-size: 35px;
        letter-spacing: 1px;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .time {
      font-size: 46px;
      font-weight: 500;
      color: #fff;
      width: 500px;
    }
    .author {
      color: @main-color;
      font-size: 46px;
      width: 200px;
      margin-left: 4px;
    }
  }
}
</style>
