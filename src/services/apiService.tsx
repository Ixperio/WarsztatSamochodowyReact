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

interface FuelCarTypes{
  id: number,
  name: string
}

interface UserData{
  name: string,
  surname: string,
  birthday: string,
  email: string,
  city: string,
  postCode: string,
  adress: string,
  phone: string
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

//UPDATE USER DATA

interface UserUpdate2{
    name: string,
    trustString: string
}

interface UserUpdate{
  data: string,
  trustString: string
}
//Samochody interfejsy

interface WersjaMarkaPaliwo{
  name: string
}

interface ModelSamochodu{
  name: string;
  wersjaNadwozia: WersjaMarkaPaliwo;
  marka: WersjaMarkaPaliwo;

}

interface MyCar{
  id: number;
  vin: string;
  nazwa: string;
  modelSamochodu: ModelSamochodu
  rokProdukcji: number;
  rodzajPaliwa: WersjaMarkaPaliwo;
  pojemnoscSkokowa: number;
  prezbieg: number;
  nr_rejestracyjny: string;
}

interface CarModelInput{
  wersjaNadwozia: string;
  marka: string;
  trustString: string
}

interface CarModelOutput{
  id: number;
  name: string;
  wersjaNadwozia: WersjaMarkaPaliwo;
  marka: WersjaMarkaPaliwo;
}

interface AddNewCar{
  vin: string;
  nazwa: string;
  modelSamochoduId: number;
  rokProdukcji: number;
  pojemnoscSkokowa: number;
  rodzajPaliwaId: number;
  przebieg: number;
  nr_rejestracyjny: string;
  trustString?: string;
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
  getFuelTypes: async (): Promise<FuelCarTypes> => {
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
      
        if(dataResponse == null){
          return false;
        }else{
          Cookies.set('trustString', dataResponse.trustString, { expires: 7 });
          isLogged = true;
          return true;
        }
        
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

  getUserData: async (): Promise<UserData | undefined> => {
    
    // Cookies.get("trustString")
    if(Cookies.get("trustString") == undefined){
      console.log("NIEZALOGOWANY")
      return undefined;
    }else{
      const trustString: string | undefined = Cookies.get("trustString")
      if(trustString !== undefined){
      }
      
      type DataType = {
        truststring: string | undefined,
    }

    const data: DataType = {
        truststring: trustString
    };

    const response = await fetch(baseUrl + '/Persons/GetUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Coś poszło nie tak!');
      }else{
        return await response.json();
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
  },

  //UPDATY , Z WYKORZYSTANIEM PUT
  updateName: async (newName: string): Promise<boolean> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : UserUpdate2 = {
          name: newName,
          trustString: cookie
        }
    
        const response = await fetch(baseUrl + '/Persons/UpdateName', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(!response.ok){
          return false;
        }else{
          return true;
        }

    }else{
        return false;
    }
    
  },

  updateSurname: async (newSurname: string): Promise<boolean> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : UserUpdate = {
          data: newSurname,
          trustString: cookie
        }
    
        const response = await fetch(baseUrl + '/Persons/UpdateSurname', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(!response.ok){
          return false;
        }else{
          return true;
        }

    }else{
        return false;
    }
    
  },

  updatePhone: async (newPhone: string): Promise<boolean> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : UserUpdate = {
          data: newPhone,
          trustString: cookie
        }
    
        const response = await fetch(baseUrl + '/Persons/UpdatePhone', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(!response.ok){
          return false;
        }else{
          return true;
        }

    }else{
        return false;
    }
    
  },

  updateAddress: async (newAddress: string): Promise<boolean> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : UserUpdate = {
          data: newAddress,
          trustString: cookie
        }
    
        const response = await fetch(baseUrl + '/Persons/UpdateAdress', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(!response.ok){
          return false;
        }else{
          return true;
        }

    }else{
        return false;
    }
    
  },

  updateCity: async (newCity: string): Promise<boolean> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : UserUpdate = {
          data: newCity,
          trustString: cookie
        }
    
        const response = await fetch(baseUrl + '/Persons/UpdateCity', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(!response.ok){
          return false;
        }else{
          return true;
        }

    }else{
        return false;
    }
    
  },

  updatePost: async (newPost: string): Promise<boolean> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : UserUpdate = {
          data: newPost,
          trustString: cookie
        }
    
        const response = await fetch(baseUrl + '/Persons/UpdateCity', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(!response.ok){
          return false;
        }else{
          return true;
        }

    }else{
        return false;
    }
    
  },
  //DELETE - WYKORZYSTANIE DELETE
  delete: async (password: string): Promise<boolean> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : UserUpdate = {
          data: password,
          trustString: cookie
        }

      const response = await fetch(baseUrl + '/Persons/UserDelete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if(response.ok){
        Cookies.remove("trustString")
        return true;
      }else{
        return false;
      }

    }else{
      return false;
    }
  },
  //Lista smaochodów usera
  getMyCars: async (): Promise<MyCar | undefined> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : TrustString = {
          trustString: cookie
        }
    
        const response = await fetch(baseUrl + '/Car/GetMyCars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(!response.ok){
          return undefined;
        }else{
          return await response.json();
        }

    }else{
        return undefined;
    }
    
  },
  //Lista dostępnych typów pojazdów
  getCarModels: async (nadwozie: string, marka: string): Promise<CarModelOutput | undefined> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : CarModelInput = {
          trustString: cookie,
          wersjaNadwozia: nadwozie,
          marka: marka
        }
    
        const response = await fetch(baseUrl + '/Car/GetCarModels', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(!response.ok){
          return undefined;
        }else{
          return await response.json();
        }

    }else{
        return undefined;
    }
    
  },
  getCarModelTypes: async (): Promise<FuelCarTypes | undefined> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : TrustString = {
          trustString: cookie
        }
    
        const response = await fetch(baseUrl + '/Car/GetCarModelTypes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(!response.ok){
          return undefined;
        }else{
          return await response.json();
        }

    }else{
        return undefined;
    }
    
  },
  getCarBrand: async (): Promise<FuelCarTypes | undefined> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : TrustString = {
          trustString: cookie
        }
    
        const response = await fetch(baseUrl + '/Car/GetBrands', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(!response.ok){
          return undefined;
        }else{
          return await response.json();
        }

    }else{
        return undefined;
    }
    
  },
  addCar: async (values: AddNewCar): Promise<boolean> => {

    const cookie : string | undefined = Cookies.get("trustString");

    if(cookie !== undefined){

        const data : AddNewCar = {
          vin: values.vin,
          nazwa:values.nazwa,
          modelSamochoduId: values.modelSamochoduId,
          rokProdukcji: values.rokProdukcji,
          pojemnoscSkokowa: values.pojemnoscSkokowa,
          rodzajPaliwaId: values.rodzajPaliwaId,
          przebieg: values.przebieg,
          nr_rejestracyjny: values.nr_rejestracyjny,
          trustString: cookie
        }
        console.log(data)
    
        const response = await fetch(baseUrl + '/Car/AddCar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        console.log("Doszwedłem")
        if(!response.ok){
          return false;
        }else{
          return true;
        }

    }else{
        return false;
    }
    
  }

}; 

export default apiService;
