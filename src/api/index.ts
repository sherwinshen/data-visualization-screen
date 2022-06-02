import request from "./request";

export function getUserData() {
  return request({
    url: "/screen/data",
    method: "get",
  });
}

export function getMapData() {
  return request({
    url: "/screen/map",
    method: "get",
  });
}
