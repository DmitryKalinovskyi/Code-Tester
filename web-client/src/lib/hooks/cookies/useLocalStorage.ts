import { useState, useEffect, Dispatch, SetStateAction } from "react";
import isCookiesAccepted from "../../config/isCookiesAccepted";

const useLocalStorage = <S>(key: string, defaultValue: any = "", neccessary: boolean = false): [S, Dispatch<SetStateAction<S>>] => {
  const [value, setValue] = useState<S>(() => {
    if(!neccessary && !isCookiesAccepted()){
      localStorage.removeItem(key);
      return defaultValue;
    }

    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || JSON.stringify(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    if(neccessary || isCookiesAccepted()){
      localStorage.setItem(key, JSON.stringify(value));
    }
    else{
      localStorage.removeItem(key);
    }
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;