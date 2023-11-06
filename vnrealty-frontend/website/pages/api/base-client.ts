import { AxiosRequestConfig, AxiosResponse } from "axios";

export class BaseClient {
  protected transformOptions(options: AxiosRequestConfig) {
    // const token = sessionStorage.getItem("accessToken");

    // if (token) {
    //   options.headers = {
    //     ...options.headers,
    //     Authorization: "Bearer " + token,
    //   };
    // }
    return Promise.resolve(options);
  }
  
  protected transformResult(
    url: string,
    response: AxiosResponse,
    process: (response: AxiosResponse) => any
  ) {
    if (response.status !== 200 && response.status !== 204) {
      // const vm = window.VueInstance;
      // if(response.status == 401){
      // if(AppRoute.currentRoute.path != "/login"){
      // 	AppRoute.replace({
      // 		path: "login",
      // 		query: {
      // 			redirect:
      // 				AppRoute.currentRoute.path,
      // 		},
      // 	});
      // }
      // console.log('Phiên đăng nhập đã hết hạn');
      // //vm.$notify({title: vm.$t("Error").toString(),message: 'Phiên đăng nhập đã hết hạn',type: 'error',position: 'bottom-right',});
      // }
      // else if(response.status == 500){
      // 	vm.$notify({title: vm.$t("SystemError").toString(),message: '500',type: 'error',position: 'bottom-right',});
      // }
      // else{
      // 	vm.$notify({title: vm.$t("SystemError").toString(),message: response.status.toString(),type: 'error',position: 'bottom-right',});
      // }
    }
    
    return process(response);
  }
}
