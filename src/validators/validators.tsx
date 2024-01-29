
interface Validator{
    isValid: boolean,
    message: string | null
}

//FUNKCJA WALIDUJĄCA HASŁO -> ODDZIELNIE W CELU WYKORZYTSANIA W constValidators
const validatePassword = (value: string | undefined, fieldName: string) : Validator => {
    
    //KONFIGURACJA 
    const nazwaPola : string = fieldName;
    const minLength : number = 8;
    const maxLength : number = 64;
    const regex : RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*().,+\\-])(?=.*[0-9])[a-zA-Z0-9 !@#$%^&*().,+\\-]{8,64}$/;
    const formatDanychInfo : string = "minimum 8 znaków, wymaga 1 wielkiej litery, 1 małej litery, 1 cyfry, oraz znaku specjalnego z podanych: !@#$%^&*().,+- ";

    //zmienne wbudowane w metodę
    let thisMessage : string | null = null;
    let isStateValid: boolean = false; 
    
    //sprawdzanie warunków
    if(value !== undefined){
        if (value == "" || value == " ") {
            thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
            isStateValid = false;
        }
        else if(value.length < minLength || value.length > maxLength)
        {
            thisMessage = "Liczba znaków pola "+nazwaPola+" musi mieścić się w zakresie <"+minLength+","+maxLength+">";
            isStateValid = false;
        }else if(!regex.test(value)){
            thisMessage = "Nieprawidłowy format wprowadzonych danych do pola "+nazwaPola+" - Format danych "+formatDanychInfo+"";
            isStateValid = false;
        }else{
            thisMessage = null;
            isStateValid = true;
        }
    }else{
      thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
      isStateValid = false;
    }

    const returnInfo : Validator = {
        isValid : isStateValid,
        message : thisMessage
    }

    return returnInfo;
}

const validators = {

    validatePassword: (value: string | undefined, fieldName: string): Validator =>{
        return validatePassword(value, fieldName);
    },

    //PRZEKAZUJEMY 2 WARTOŚCI - value I fieldName (fieldName to label pola - aby wyświetlony komunikat zawierał nazwę pola do którego się odnosi)
    //validacja name i surname
    validateUsername: (value: string | undefined, fieldName: string): Validator => {
        
        //KONFIGURACJA 
        const nazwaPola : string = fieldName;
        const minLength : number = 2;
        const maxLength : number = 40;
        const regex : RegExp = /^[A-ZĄĘŻŚŹĆŃŁÓĘa-zżźćńłśąęó\s]{2,40}$/;
        const formatDanychInfo : string = ">1 duża litera , >1 mała litera, możliwa spacja, od 2 do 40 znaków "

        //zmienne wbudowane w metodę
        let thisMessage : string | null = null;
        let isStateValid: boolean = false; 
        
        //sprawdzanie warunków
        if(value !== undefined){
            if (value == "" || value == " ") {
                thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
            }
            else if(value.length <= minLength || value.length > maxLength)
            {
                thisMessage = "Liczba znaków pola "+nazwaPola+" musi mieścić się w zakresie <"+minLength+","+maxLength+">";

            }else if(!regex.test(value)){
                thisMessage = "Nieprawidłowy format wprowadzonych danych do pola "+nazwaPola+" - Format danych to [ "+formatDanychInfo+" ]";
            }else{
                thisMessage = null;
                isStateValid = true;
            }
        }else{
          thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
          isStateValid = false;
        }

        const returnInfo : Validator = {
            isValid : isStateValid,
            message : thisMessage
        }

        return returnInfo;

      },

      validateEmail: (value: string | undefined, fieldName: string): Validator => {
        
        //KONFIGURACJA 
        const nazwaPola : string = fieldName;
        const minLength : number = 2;
        const maxLength : number = 256;
        const regex : RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const formatDanychInfo : string = "duże i małe litery, możliwa spacja, od 2 do 40 znaków "

        //zmienne wbudowane w metodę
        let thisMessage : string | null = null;
        let isStateValid: boolean = false; 
        
        //sprawdzanie warunków
        if(value !== undefined){
            if (value == "" || value == " ") {
                thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
                isStateValid = false;
            }
            else if(value.length < minLength || value.length > maxLength)
            {
                thisMessage = "Liczba znaków pola "+nazwaPola+" musi mieścić się w zakresie <"+minLength+","+maxLength+">";
                isStateValid = false;

            }else if(!regex.test(value)){
                thisMessage = "Nieprawidłowy format wprowadzonych danych do pola "+nazwaPola+" - Format danych to [ "+formatDanychInfo+" ]";
                isStateValid = false;
            }else{
                thisMessage = null;
                isStateValid = true;
            }
        }else{
          thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
          isStateValid = false;
        }

        const returnInfo : Validator = {
            isValid : isStateValid,
            message : thisMessage
        }

        return returnInfo;

      },

      validatePhone: (value: string | undefined, fieldName: string): Validator => {
        
        //KONFIGURACJA 
        const nazwaPola : string = fieldName;
        const minLength : number = 9;
        const maxLength : number = 9;
        const regex : RegExp = /^[0-9]{9}$/;
        const formatDanychInfo : string = "równo 9 cyfr [0-9] , bez odstępów"

        //zmienne wbudowane w metodę
        let thisMessage : string | null = null;
        let isStateValid: boolean = false; 
        
        //sprawdzanie warunków
        if(value !== undefined){
            if (value == "" || value == " ") {
                thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
            }
            else if(value.length < minLength || value.length > maxLength)
            {
                thisMessage = "Liczba znaków pola "+nazwaPola+" musi mieścić się w zakresie <"+minLength+","+maxLength+">";

            }else if(!regex.test(value)){
                thisMessage = "Nieprawidłowy format wprowadzonych danych do pola "+nazwaPola+" - Format danych to [ "+formatDanychInfo+" ]";
            }else{
                thisMessage = null;
                isStateValid = true;
            }
        }else{
          thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
          isStateValid = false;
        }

        const returnInfo : Validator = {
            isValid : isStateValid,
            message : thisMessage
        }

        return returnInfo;

      },

      validateAdress: (value: string | undefined, fieldName: string): Validator => {
        
        //KONFIGURACJA 
        const nazwaPola : string = fieldName;
        const minLength : number = 3;
        const maxLength : number = 100;
        const regex : RegExp = /^[a-zA-Z0-9\s]{3,100}$/;
        const formatDanychInfo : string = "cyfry, małe litery, duże litery, spacje , od 3 do 100 znaków"

        //zmienne wbudowane w metodę
        let thisMessage : string | null = null;
        let isStateValid: boolean = false; 
        
        //sprawdzanie warunków
        if(value !== undefined){
            if (value == "" || value == " ") {
                thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
            }
            else if(value.length < minLength || value.length > maxLength)
            {
                thisMessage = "Liczba znaków pola "+nazwaPola+" musi mieścić się w zakresie <"+minLength+","+maxLength+">";

            }else if(!regex.test(value)){
                thisMessage = "Nieprawidłowy format wprowadzonych danych do pola "+nazwaPola+" - Format danych to [ "+formatDanychInfo+" ]";
            }else{
                thisMessage = null;
                isStateValid = true;
            }
        }else{
          thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
          isStateValid = false;
        }

        const returnInfo : Validator = {
            isValid : isStateValid,
            message : thisMessage
        }

        return returnInfo;

      },

      validatePostCode: (value: string | undefined, fieldName: string): Validator => {
        
        //KONFIGURACJA 
        const nazwaPola : string = fieldName;
        const minLength : number = 6;
        const maxLength : number = 6;
        const regex : RegExp = /^\d{2}-\d{3}$/;
        const formatDanychInfo : string = " XX-XXX , gdzie X to liczba z przedziału [0-9] "

        //zmienne wbudowane w metodę
        let thisMessage : string | null = null;
        let isStateValid: boolean = false; 
        
        //sprawdzanie warunków
        if(value !== undefined){
            if (value == "" || value == " ") {
                thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
            }
            else if(value.length < minLength || value.length > maxLength)
            {
                thisMessage = "Liczba znaków pola "+nazwaPola+" musi mieścić się w zakresie <"+minLength+","+maxLength+">";

            }else if(!regex.test(value)){
                thisMessage = "Nieprawidłowy format wprowadzonych danych do pola "+nazwaPola+" - Format danych to [ "+formatDanychInfo+" ]";
            }else{
                thisMessage = null;
                isStateValid = true;
            }
        }else{
          thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
          isStateValid = false;
        }

        const returnInfo : Validator = {
            isValid : isStateValid,
            message : thisMessage
        }

        return returnInfo;

      },

      validateCity: (value: string | undefined, fieldName: string): Validator => {
        
        //KONFIGURACJA 
        const nazwaPola : string = fieldName;
        const minLength : number = 3;
        const maxLength : number = 40;
        const regex : RegExp = /^[\p{L}0-9\s\-]+$/;
        const formatDanychInfo : string = " akceptuje wszystkie litery, cyfry, znak `-` oraz spacje ";

        //zmienne wbudowane w metodę
        let thisMessage : string | null = null;
        let isStateValid: boolean = false; 
        
        //sprawdzanie warunków
        if(value !== undefined){
            if (value == "" || value == " ") {
                thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
            }
            else if(value.length < minLength || value.length > maxLength)
            {
                thisMessage = "Liczba znaków pola "+nazwaPola+" musi mieścić się w zakresie <"+minLength+","+maxLength+">";

            }else if(!regex.test(value)){
                thisMessage = "Nieprawidłowy format wprowadzonych danych do pola "+nazwaPola+" - Format danych to [ "+formatDanychInfo+" ]";
            }else{
                thisMessage = null;
                isStateValid = true;
            }
        }else{
          thisMessage = "Wartość pola "+nazwaPola+" nie może być pusta!";
          isStateValid = false;
        }

        const returnInfo : Validator = {
            isValid : isStateValid,
            message : thisMessage
        }

        return returnInfo;

      },

      validateDate: (value: string | undefined, fieldName: string): Validator => {
        // KONFIGURACJA
        const nazwaPola: string = fieldName;
        const formatDanychInfo: string = "Wartość powinna być w formacie daty";
      
        // Zmienne wbudowane w metodę
        let thisMessage: string | null = null;
        let isStateValid: boolean = false;
      
        // Sprawdzanie warunków
        if (value !== undefined) {
          const regex: RegExp = /^\d{4}-\d{2}-\d{2}$/;
      
          if (!regex.test(value)) {
            thisMessage =
              "Nieprawidłowy format wprowadzonych danych do pola " +
              nazwaPola +
              " - " +
              formatDanychInfo;
          } else {
            thisMessage = null;
            isStateValid = true;
          }
        } else {
          thisMessage = "Wartość pola " + nazwaPola + " nie może być pusta!";
          isStateValid = false;
        }
      
        const returnInfo: Validator = {
          isValid: isStateValid,
          message: thisMessage,
        };
      
        return returnInfo;
      },
      
      validatePasswordConfirm: (value1: string | undefined,value2: string | undefined, fieldName1: string, fieldName2: string): Validator => {
        
        let thisMessage : string | null = null;
        let isStateValid: boolean = false; 
        
        let returnValidateConfirm : Validator | undefined = undefined;

        //sprawdzanie warunków
        if(value1 !== undefined && value2 !== undefined){

            if(value1 === value2){
                returnValidateConfirm = validatePassword(value1, fieldName1);

                if(returnValidateConfirm.isValid){
                    returnValidateConfirm = validatePassword(value2, fieldName2);
                    if(returnValidateConfirm.isValid){
                        isStateValid = true;
                    }else{
                        isStateValid = false;
                    }
                }else{
                    isStateValid = false;
                }
            }else{
                thisMessage = "Hasła nie są identyczne!";
                isStateValid = false;
            }
        }else{
          thisMessage = "Pole hasło oraz potwierdź hasło nie mogą być puste!";
          isStateValid = false;
        }

        const returnInfo : Validator = {
            isValid : isStateValid,
            message : thisMessage
        }

        return returnInfo;

      }
}

export default validators;