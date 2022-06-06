<template>
  <div v-if="!ready">loading</div>
  <div v-else class="content-wrapper">
    <div class="left">
      <div class="module total-user">
        <total-user
          ref="totalUser"
          :today-user="userData.userToday"
          :growth-last-day="+userData.userGrowthLastDay || 0"
          :growth-last-month="+userData.userGrowthLastMonth || 0"
        ></total-user>
      </div>
      <div class="module average-age">
        <average-age :data="ageData" :avg-age="parseFloat(userData.averageAge) || 0"></average-age>
      </div>
      <div class="module total-device">
        <total-device :data="deviceData"></total-device>
      </div>
      <div class="module total-gender">
        <total-gender :data="userData.gender"></total-gender>
      </div>
      <div class="module rider-growth">
        <rider-growth :data="userData.rider"></rider-growth>
      </div>
      <div class="module sale-category">
        <sale-category :data="userData.category"></sale-category>
      </div>
    </div>
    <div class="right">
      <div class="module center-header">
        <center-header :data="userData"></center-header>
      </div>
      <div class="module country-category">
        <nav-menu :data="['ALL', '北京', '上海', '深圳', '杭州', '南京', '武汉']"></nav-menu>
      </div>
      <div class="inline">
        <div class="module sale-data">
          <sale-data :data="mapData"></sale-data>
        </div>
        <div class="module plan-list">
          <plan-list :data="userData.areaSales"></plan-list>
        </div>
      </div>
      <div class="inline">
        <div class="order-trend">
          <div class="module sale-category">
            <nav-menu :data="['订单量', '销售额', '用户数', '退单量']" bg-color="#9dc35b"></nav-menu>
          </div>
          <div class="module average-view">
            <average-view :data="realTimeOrder"></average-view>
          </div>
          <div class="module schedule-view">
            <schedule-view></schedule-view>
          </div>
        </div>
        <div class="module sale-rank">
          <sale-rank :data="userData.areaTop"></sale-rank>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TotalUser from "@/modules/total-user.vue";
import TotalGender from "@/modules/total-gender.vue";
import CenterHeader from "@/modules/center-header.vue";
import NavMenu from "@/components/nav-menu.vue";
import RiderGrowth from "@/modules/rider-growth.vue";
import SaleCategory from "@/modules/sale-category.vue";
import AverageAge from "@/modules/average-age.vue";
import TotalDevice from "@/modules/total-device.vue";
import AverageView from "@/modules/average-view.vue";
import PlanList from "@/modules/plan-list.vue";
import SaleRank from "@/modules/sale-rank.vue";
import SaleData from "@/modules/sale-data.vue";
import ScheduleView from "@/modules/schedule-view.vue";
import useData from "@/compositions/useData";

const { ready, mapData, userData, ageData, deviceData, realTimeOrder } = useData({ once: false });

const category1 = [
  {
    name: "ALL",
    key: "all",
  },
  {
    name: "北京",
    key: "beijing",
  },
  {
    name: "上海",
    key: "shanghai",
  },
  {
    name: "深圳",
    key: "shenzhen",
  },
  {
    name: "杭州",
    key: "hangzhou",
  },
  {
    name: "南京",
    key: "nanjing",
  },
  {
    name: "武汉",
    key: "wuhan",
  },
];
const category2 = [
  {
    name: "订单量",
    key: "order",
  },
  {
    name: "销售额",
    key: "sale",
  },
  {
    name: "用户数",
    key: "user",
  },
  {
    name: "退单量",
    key: "return",
  },
];
</script>

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
      padding: 0px;
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
    .sale-category {
      height: 60px;
      width: 1920px;
      margin-bottom: 24px;
      padding: 0px;
    }

    .average-view {
      height: 332px;
      width: 1920px;
      margin-bottom: 24px;
    }
    .schedule-view {
      height: 210px;
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
