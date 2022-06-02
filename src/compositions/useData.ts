import { getUserData, getMapData } from "@/api/index";

export default function ({ once = true }) {
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
          };
          ageData.value = [...ageData.value];
        } else {
          ageData.value.push({
            startValue: 0,
            value: item.value,
            axis: item.key,
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
  const requestData = () => {
    setTimeout(async () => {
      mapData.value = await getMapData(); // 地图数据
      await getAndHandleUserData();
    }, 1000);
    if (!once) {
      task = setInterval(async () => {
        await getAndHandleUserData();
      }, 8000);
    }
  };

  onMounted(() => {
    requestData();
  });
  onBeforeMount(() => {
    task && clearInterval(task);
  });

  return {
    mapData,
    userData,
    ageData,
    deviceData,
    realTimeOrder,
  };
}
