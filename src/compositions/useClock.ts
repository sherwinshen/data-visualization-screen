import dayjs from "dayjs";

export default function (format = "YYYY-MM-DD HH:mm:ss") {
  let timer: NodeJS.Timer | undefined;
  const time = ref("");
  const setTime = () => {
    time.value = dayjs().format(format);
  };
  onMounted(() => {
    setTime();
    timer = setInterval(() => {
      setTime();
    }, 1000);
  });
  onBeforeMount(() => {
    timer && clearInterval(timer);
  });

  return {
    time,
  };
}
