import { createContext } from "react";

type appContextType = {
  pageName: string;
  setPageName: (value: string) => void;
  currentItemSlider: number;
  setCurrentItemSlider: (value: number) => void;
};

const appContext: appContextType = {
  pageName: "",
  setPageName: () => {},
  currentItemSlider: 0,
  setCurrentItemSlider: () => {},
};

export const Context = createContext<appContextType>(appContext);
