import { getUserData, getMapData } from "@/api/index";
import { duration, colors } from "@/const";

export default function ({ once = true }) {
  const ready = ref(false);
  const userData = ref({}) as any; // 用户数据
  const mapData = ref({}) as any; // 地图数据
  const ageData = ref([]) as any; // 年龄数据
  const deviceData = ref({}) as any; // 设备数据
  const realTimeOrder = ref({ date: [], data: [] }) as any;
  let task: any;

  const getNowTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  };

  const getAndHandleUserData = async () => {
    try {
      userData.value = await getUserData();
      // 处理 ageData
      (userData.value?.age || []).forEach((item: any, index: number) => {
        if (ageData.value[index]) {
          ageData.value[index] = {
            startValue: ageData.value[index].value,
            value: item.value,
            axis: item.key,
            color: colors[index],
            type: "年龄分布",
          };
          ageData.value = [...ageData.value];
        } else {
          ageData.value.push({
            startValue: 0,
            value: item.value,
            axis: item.key,
            color: colors[index],
            type: "年龄分布",
          });
        }
      });
      // 处理 deviceData
      deviceData.value = {
        totalDevices: userData.value.totalDevices,
        devices: userData.value.devices,
      };
      // 处理 realTimeOrder
      realTimeOrder.value = {
        date: [...realTimeOrder.value.date, getNowTime()],
        data: [...realTimeOrder.value.data, userData.value.realTimeOrder],
      };
    } catch (err) {
      console.log(err);
    }
  };
  const requestData = async () => {
    getMapData().then((res) => {
      mapData.value = res;
    }); // 地图数据
    await getAndHandleUserData();
    // 为体现效果延后1s展示内容
    setTimeout(() => {
      ready.value = true;
    }, 1000);
    if (!once) {
      task = setInterval(async () => {
        getAndHandleUserData();
      }, duration);
    }
  };

  onMounted(() => {
    requestData();
  });

  onBeforeMount(() => {
    task && clearInterval(task);
  });

  return {
    ready,
    mapData,
    userData,
    ageData,
    deviceData,
    realTimeOrder,
  };
}
