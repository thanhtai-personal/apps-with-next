import { useEffect, useReducer, Reducer, Dispatch } from "react"

export const useReducerWithLogger = <T, Action>(reducer: Reducer<T, Action>, initialData: T, contextName?: string): [T, Dispatch<Action>] => {
  const [state, dispatch] = useReducer(reducer, initialData);
  
  useEffect(() => {
    //Add more middle ware here...
    if (process.env.NODE_ENV === "development") {
      console.info('Next state', contextName, state);
    }
  }, [state]);

  return [state, dispatch];
};
