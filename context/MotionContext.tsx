import { Children, createContext, useState } from "react";

type stateType = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const initialState: stateType = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

export type sharedLayoutDataType = {
  setCurrent: (value: string) => void;
  current: string;
  contextValue: any;
  setValue: (value: stateType) => void;
};

export const SharedLayoutDataContext = createContext<sharedLayoutDataType>({
  current: "",
  setCurrent: () => {},
  contextValue: initialState,
  setValue: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function SharedLayoutData({ children }: Props) {
  const [current, setCurrent] = useState("");
  const [contextValue, setState] = useState(initialState);

  return (
    <SharedLayoutDataContext.Provider
      value={{
        current,
        setCurrent,
        contextValue: contextValue,
        setValue: setState,
      }}
    >
      {children}
    </SharedLayoutDataContext.Provider>
  );
}
