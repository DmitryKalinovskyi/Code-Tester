import { useState, useEffect, Dispatch, SetStateAction } from "react";

const useLocalStorage = <S>(key: string, defaultValue: object | string = ""): [S, Dispatch<SetStateAction<S>>] => {
  const [value, setValue] = useState<S>(() => {
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
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;