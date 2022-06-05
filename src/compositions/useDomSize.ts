export default function (id: string) {
  const width = ref(0);
  const height = ref(0);

  onMounted(() => {
    const dom = document.getElementById(id) as HTMLElement;
    width.value = dom.clientWidth;
    height.value = dom.clientHeight;
  });

  return {
    width,
    height,
  };
}
