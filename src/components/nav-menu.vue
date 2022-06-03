<template>
  <div class="nav-menu">
    <div :class="['item', selected === index ? 'selected' : '']" v-for="(item, index) in data" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    data: string[];
    bgColor?: string;
    fontColor?: string;
  }>(),
  {
    bgColor: "#414446",
    fontColor: "#fff",
  }
);
const selected = ref(0);
const task = ref(null) as any;
onMounted(() => {
  task.value = setInterval(() => {
    selected.value = selected.value + 1 >= props.data.length ? 0 : selected.value + 1;
  }, 3000);
});
onBeforeMount(() => {
  task.value && clearInterval(task.value);
});
</script>

<style lang="less" scoped>
.nav-menu {
  display: flex;
  align-items: center;
  height: 100%;
  .item {
    flex: 1;
    height: 100%;
    font-size: 24px;
    background: @forth-bg-color;
    color: rgb(144, 160, 174);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s linear;
    &.selected {
      background-color: v-bind(bgColor);
      color: v-bind(fontColor);
    }
  }
}
</style>
