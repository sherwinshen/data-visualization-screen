<template>
  <div class="content-wrapper">
    <div class="left">
      <div class="module total-user">total-user</div>
      <div class="module average-age">average-age</div>
      <div class="module total-device">total-device</div>
      <div class="module total-gender">total-gender</div>
      <div class="module rider-growth">rider-growth</div>
      <div class="module sale-category">sale-category</div>
    </div>
    <div class="right">
      <div class="module center-header">center-header</div>
      <div class="module country-category">country-category</div>
      <div class="inline">
        <div class="module sale-data">sale-data</div>
        <div class="module plan-list">plan-list</div>
      </div>
      <div class="inline">
        <div class="module order-trend">order-trend</div>
        <div class="module sale-rank">sale-rank</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content-wrapper {
  width: 100%;
  height: 1970px;
  background-color: @main-bg-color;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 32px;
  .left {
    flex: 0 0 860px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .total-user {
      height: 300px;
    }
    .average-age {
      height: 320px;
    }
    .total-device {
      height: 280px;
    }
    .total-gender {
      height: 230px;
    }
    .rider-growth {
      height: 360px;
    }
    .sale-category {
      height: 360px;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    margin-left: 24px;
    min-width: 2956px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .center-header {
      height: 198px;
    }
    .country-category {
      height: 50px;
    }
    .sale-data {
      height: 1000px;
      width: 1920px;
    }
    .plan-list {
      height: 1000px;
      width: 1012px;
    }

    .order-trend {
      height: 650px;
      width: 1920px;
    }
    .sale-rank {
      height: 650px;
      width: 1012px;
    }
  }
  .module {
    background-color: @third-bg-color;
  }
  .inline {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
