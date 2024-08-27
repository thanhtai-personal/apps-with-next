import React, { createContext, useContext, ReactNode, Dispatch, Reducer, useEffect } from "react";
import { useReducerWithLogger } from "../hooks";

export interface ContextProviderProps {
  children: ReactNode;
  value?: any;
}

export interface IAction<T, K> {
  type: T,
  payload: K;
}

export interface ContextData<T, Action> {
  Provider: React.FC<ContextProviderProps>;
  useDataContext: () => T | null;
  useDataDispatchContext: () => Dispatch<Action> | null;
}

export const makeContext = <T, Action>(
  reducer: Reducer<T, Action>,
  initialData: T,
  contextName?: string,
): ContextData<T, Action> => {
  const DataContext = createContext<T | null>(null);
  const DataDispatchContext = createContext<Dispatch<Action> | null>(null);

  const ContextProvider: React.FC<ContextProviderProps> = ({ children, value }) => {
    const [data, dispatch] = useReducerWithLogger(reducer, initialData, contextName);

    useEffect(() => {
      if (value) {
        dispatch({
          type: "init_state",
          payload: { ...value }
        } as Action)
      }
    }, [value])

    return (
      <DataContext.Provider value={data}>
        <DataDispatchContext.Provider value={dispatch}>
          {children}
        </DataDispatchContext.Provider>
      </DataContext.Provider>
    );
  };

  const useDataContext = () => useContext(DataContext);
  const useDataDispatchContext = () => useContext(DataDispatchContext);

  return {
    Provider: ContextProvider,
    useDataContext,
    useDataDispatchContext
  };
};
