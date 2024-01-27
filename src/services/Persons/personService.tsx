import apiService from '../apiService';

//KONFIGURACJA LINKU DO API SERWISU
const routeLinkPerfix:string = "/Persons";

const personService = {

  test: async () => {
    return apiService.get(routeLinkPerfix+'/Test')
  }

};

export default personService;