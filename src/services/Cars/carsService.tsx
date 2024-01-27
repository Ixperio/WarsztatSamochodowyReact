import apiService from '../apiService';

//KONFIGURACJA LINKU DO API SERWISU
const routeLinkPerfix:string = "/Car";

const carService = {

  test: async () => {
    return apiService.get(routeLinkPerfix+'/Test')
  }

};

export default carService;