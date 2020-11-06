import defaultAxios from "./axios/index";

export default defaultAxios;

declare module globalThis {
  export var axios: any;
}

declare interface CustomGlobal
{
  axios: typeof defaultAxios;
}
declare var window: CustomGlobal & Window;
