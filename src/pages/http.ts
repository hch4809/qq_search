const http: any = {};

// 终止请求
const get: any = (url: string, data: any = {}, config?: any) => {
  console.log(config);
  let params: string = "";
  Object.keys(data).map((ele: string, i) => {
    params += (i === 0 ? "" : "&") + ele + "=" + data[ele];
  });
  return fetch(url + "?" + params, {
    method: "get",
    signal: config.signal,
  }).then((res: any) => {
    return res.json();
  });
};

http.get = get;

export default http;
