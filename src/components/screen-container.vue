<template>
  <div ref="screenRef" class="screen-container">
    <template v-if="isReady">
      <slot></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import elementResizeDetectorMaker from "element-resize-detector";
import { debounce } from "lodash";
/**
 * 使用大屏容器组件需要传入具体宽高的数值，否则默认使用文档显示区尺寸，可能会无法正常显示！！！
 */
const props = withDefaults(
  defineProps<{
    width?: number;
    height?: number;
  }>(),
  {
    width: 0,
    height: 0,
  }
);
const screenRef = ref<HTMLDivElement | null>(null);
const isReady = ref<boolean>(false); // 宽高设置完毕再渲染内容
// 实际尺寸
const width = ref<number>(0);
const height = ref<number>(0);

// 设置内容宽高(初始化)
const initContentSize = async () => {
  width.value = props.width || window.innerWidth;
  height.value = props.height || window.innerHeight;
  if (screenRef.value) {
    screenRef.value.style.width = `${width.value}px`;
    screenRef.value.style.height = `${height.value}px`;
  }
};
// 设置缩放比例
const setScale = () => {
  if (screenRef.value) {
    screenRef.value.style.transform = `scale(
      ${window.innerWidth / width.value},
      ${window.innerHeight / height.value}
    )`;
  }
};
const handleScale = debounce(setScale, 100);
const autoResizeInit = async () => {
  await initContentSize(); // 初始化内容尺寸
  setScale(); // 设置内容缩放比例（适应屏幕尺寸）
  isReady.value = true; // 宽高设置完毕
};

/**
 * 监听变动处理函数
 */
const erd = ref(null) as any;
const addDomSizeChangeListener = () => {
  // 创建实例-使用超快的基于滚动的方法
  erd.value = elementResizeDetectorMaker({
    strategy: "scroll",
  });
  // 使用指定监听器监听指定元素
  erd.value.listenTo(document.body, handleScale);
};
const cancelDomSizeChangeListener = () => {
  erd.value && erd.value.uninstall(document.body);
};

onMounted(async () => {
  autoResizeInit();
  addDomSizeChangeListener();
});
onBeforeUnmount(() => {
  cancelDomSizeChangeListener();
});
</script>

<style lang="less" scoped>
.screen-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  overflow: hidden;
  transform-origin: left top;
}
</style>
