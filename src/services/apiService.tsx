import Cookies from 'js-cookie';

const baseUrl = 'https://localhost:7169/api'; 


interface TestCar {
    controller: boolean,
    service: boolean,
    repository: boolean
}

interface TrustString {
    trustString: string
}

interface FuelTypes{
  id: number,
  name: string
}

const apiService = {
  getTestCar: async (): Promise<TestCar> => {
    const response = await fetch(baseUrl + '/Car/Test');
   
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Coś poszło nie tak!');
      }
    
      const data: TestCar = await response.json();
      return data;
  },
  getTestPerson: async (): Promise<string> => {
    const response = await fetch(baseUrl + '/Persons/Test');
   
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Coś poszło nie tak!');
      }
    
      const data = await response.json();
      return data;
  },

  getFuelTypes: async (): Promise<FuelTypes> => {
    const response = await fetch(baseUrl + '/Car/GetFuelTypes');
   
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Coś poszło nie tak!');
      }
    
      const data = await response.json();
      return data;
  },


  postUserLogin: async (userEmail: string, userPassword: string): Promise<boolean> => {

    Cookies.remove('trustString');

    type DataType = {
        email: string,
        password: string
    }

    const data: DataType = {
        email: userEmail,
        password: userPassword
    };

    const response = await fetch(baseUrl + '/Persons/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {

        return false;

      }else{

        const dataResponse : TrustString = await response.json();

        Cookies.set('trustString', dataResponse.trustString, { expires: 7 });

        return true;
      }
    
  },


  isUserLogged: async (): Promise<boolean> => {
    
    // Cookies.get("trustString")
    if(Cookies.get("trustString") == undefined){
      console.log("NIEZALOGOWANY")
      return false;
    }else{
      const trustString: string | undefined = Cookies.get("trustString")
      if(trustString !== undefined){
      }
      
      type DataType = {
        truststring: string | undefined
    }

    const data: DataType = {
        truststring: trustString
    };

    const response = await fetch(baseUrl + '/Persons/GetUserType', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        return false;
      }else{
        return true;
      }
    
    }

  }


/*
  post: async (url: string, data: Record<string, any>): Promise<ResponseData> => {
    const response = await fetch(baseUrl + url, {
     
    });
    return handleResponse(response);
  },

  put: async (url: string, data: Record<string, any>): Promise<ResponseData> => {
    const response = await fetch(baseUrl + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (url: string): Promise<ResponseData> => {
    const response = await fetch(baseUrl + url, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } */



}; 

export default apiService;
