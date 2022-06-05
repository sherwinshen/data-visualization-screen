<template>
  <screen-container :width="3840" :height="2160">
    <top-header></top-header>
    <content-wrapper></content-wrapper>
  </screen-container>
</template>

<script setup lang="ts">
import ScreenContainer from "@/components/screen-container.vue";
import TopHeader from "@/modules/top-header.vue";
import ContentWrapper from "@/modules/content-wrapper.vue";
</script>

<style lang="less">
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: @main-bg-color;
}
</style>
