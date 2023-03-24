import { createContext } from "react";

type appContextType = {
  pageName: string;
  setPageName: (value: string) => void;
};

const appContext: appContextType = {
  pageName: "",
  setPageName: () => {},
};

export const Context = createContext<appContextType>(appContext);
