<template>
  <div class="center-header-wrapper">
    <div class="item-wrapper">
      <div class="center-header-item" v-for="(item, index) in headerData" :key="index">
        <div class="left">
          <div class="bg">
            <div class="img" :style="{ backgroundImage: `url('${item.img}')` }" />
          </div>
        </div>
        <div class="right">
          <div class="title">{{ item.title }}</div>
          <div class="subtitle">{{ item.subTitle }}</div>
          <div class="total">
            <count-to
              :start-val="item.startVal"
              :end-val="item.endVal"
              :duration="countToDuration"
              separator=","
              autoplay
            />
          </div>
        </div>
      </div>
    </div>
    <div class="project-wrapper">
      <div class="project" v-for="(item, index) in project" :key="index">
        <div class="project-img">
          <img :src="item.img" />
        </div>
        <div class="project-text">{{ item.title }}</div>
        <div class="project-value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { countToDuration } from "@/const";

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {}
);

const project = ref<any[]>([]);
const headerData = ref<any[]>([]);
const initData = (newProps: any, oldProps: any) => {
  project.value = [
    {
      title: "转化率",
      value: `${props.data.covertRate}%`,
      img: "https://www.youbaobao.xyz/datav-res/success.png",
    },
    {
      title: "退单率",
      value: `${props.data.returnRate}%`,
      img: "https://www.youbaobao.xyz/datav-res/failed.png",
    },
  ];
  headerData.value = [
    {
      title: "今日销售额",
      subTitle: "Today's Sales Amount",
      startVal: (oldProps && oldProps.salesToday) || 0,
      endVal: newProps.salesToday,
      img: "https://www.youbaobao.xyz/datav-res/money.png",
    },
    {
      title: "今日订单量",
      subTitle: "Today's Total Orders",
      startVal: (oldProps && oldProps.orderToday) || 0,
      endVal: newProps.orderToday,
      img: "https://www.youbaobao.xyz/datav-res/order.png",
    },
    {
      title: "今日交易用户数",
      subTitle: "Today's Payed Users",
      startVal: (oldProps && oldProps.orderUser) || 0,
      endVal: newProps.orderUser,
      img: "https://www.youbaobao.xyz/datav-res/member.png",
    },
    {
      title: "今日新增用户数",
      subTitle: "Today's New Users",
      startVal: (oldProps && oldProps.userToday) || 0,
      endVal: newProps.userToday,
      img: "https://www.youbaobao.xyz/datav-res/follow.png",
    },
  ];
};
watch(
  () => props.data,
  (newProps, oldProps) => {
    initData(newProps, oldProps);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.center-header-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  .item-wrapper {
    display: flex;

    .center-header-item {
      flex: 1;
      display: flex;

      .left {
        display: flex;
        align-items: center;
        .bg {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 150px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-color: @main-color;
          border-radius: 50%;

          .img {
            width: 50%;
            height: 50%;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 40px;
        width: 410px;

        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          letter-spacing: 1px;
          margin-top: 10px;
        }

        .total {
          font-size: 56px;
          font-weight: 500;
          letter-spacing: 2px;
          margin-top: 10px;
        }
      }
    }
  }

  .project-wrapper {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .project {
      display: flex;
      flex-direction: column;
      align-items: center;

      .project-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 90px;
      }

      img {
        width: 100%;
        height: 100%;
      }

      .project-text {
        font-size: 18px;
        margin-top: 10px;
      }

      .project-value {
        font-size: 28px;
        font-weight: 700;
        margin-top: 5px;
      }
    }
  }
}
</style>
