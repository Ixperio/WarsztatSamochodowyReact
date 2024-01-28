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

interface RegisterUser{
    name: string,
    surname: string,
    phone: string,
    birthday: string,
    email: string,
    emailConfirm: string,
    password: string,
    passwordConfirm: string,
    terms: boolean
}

let isLogged : boolean = false;

const apiService = {
    //TEST API - SAMOCHODY
  getTestCar: async (): Promise<TestCar> => {
    const response = await fetch(baseUrl + '/Car/Test');
   
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Coś poszło nie tak!');
      }
    
      const data: TestCar = await response.json();
      return data;
  },
  //TEST API - UŻYTKOWNICY
  getTestPerson: async (): Promise<string> => {
    const response = await fetch(baseUrl + '/Persons/Test');
   
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Coś poszło nie tak!');
      }
    
      const data = await response.json();
      return data;
  },
 //POBIERANIE RDZAJÓW PALIW
  getFuelTypes: async (): Promise<FuelTypes> => {
    const response = await fetch(baseUrl + '/Car/GetFuelTypes');
   
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Coś poszło nie tak!');
      }
    
      const data = await response.json();
      return data;
  },
  //PRZESYŁANIE DANYCH LOGOWANIA
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
        isLogged = true;
        return true;
      }
    
  },
  //SPRAWDZANIE CZY UŻYTKOWNIK JEST ZALOGOWANY
  isUserLogged: async (): Promise<boolean> => {

    if(Cookies.get("trustString") == undefined){
      console.log("NIEZALOGOWANY")
      Cookies.remove("trustString");
      isLogged = false;
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
        isLogged = false;
        return false;
      }else{
        isLogged = true;
        return true;
      }
    
    }

  },
  //REJESTRACJA NOWYCH UŻYTKOWNIKÓW - ZWRACA TRUE/FALSE W ZALEŻNOŚCI, CZY OPERACJA SIĘ POWIODŁA 
  userRegister: async (registeredData: RegisterUser): Promise<boolean> => {
    if(!isLogged){
        //użytkownik nie jest zalogowany 

        const dane : RegisterUser = {
            name: registeredData.name,
            surname: registeredData.surname,
            phone: registeredData.phone,
            birthday: registeredData.birthday,
            email: registeredData.email,
            emailConfirm: registeredData.emailConfirm,
            password: registeredData.password,
            passwordConfirm: registeredData.passwordConfirm,
            terms: registeredData.terms
        };

        const response = await fetch(baseUrl + '/Persons/Register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dane),
        });

        if (!response.ok) {
            //NIE UDAŁO SIĘ UTWORZYĆ KONTA
            return false;
          }else{
            //UŻYTKOWNIK POPRAWNIE UTWORZYŁ KONTO
            return true;
          }

    }else{
        //użytkownik jest zalogowany , przejdź do jego konta
        return false;
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
