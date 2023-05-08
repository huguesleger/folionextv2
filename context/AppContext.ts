import { createContext } from "react";

type appContextType = {
  pageName: string;
  previousPage: string;
  setPageName: (value: string) => void;
  setPreviousPage: (value: string) => void;
};

const appContext: appContextType = {
  pageName: "",
  previousPage: "",
  setPageName: () => {},
  setPreviousPage: () => {},
};

export const Context = createContext<appContextType>(appContext);
