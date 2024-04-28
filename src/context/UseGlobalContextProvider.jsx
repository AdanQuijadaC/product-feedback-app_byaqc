import { createContext, useContext, useEffect, useState } from "react";
import dataJSON from "../data.json";
const CreateContextGlobal = createContext();

export const UseContextGlobalProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    if (JSON.parse(localStorage.getItem("frontend_product_feedback_app_test")) === null) {
      return dataJSON;
    } else {
      return JSON.parse(localStorage.getItem("frontend_product_feedback_app_test"));
    }
  });

  // useEffect(() => {
  //   const dataLocalStorage = JSON.parse(localStorage.getItem("frontend_product_feedback_app_test"));

  //   if (dataLocalStorage === null) {
  //     localStorage.setItem("frontend_product_feedback_app_test", JSON.stringify(data));
  //   } else {
  //     setData(dataLocalStorage);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("frontend_product_feedback_app_test", JSON.stringify(data));
  }, [data]);
  return (
    <CreateContextGlobal.Provider value={{ data, setData }}>
      {children}
    </CreateContextGlobal.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(CreateContextGlobal);
};
