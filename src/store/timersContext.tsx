import { createContext, useContext, useReducer, type ReactNode } from "react";
import Timer from "../components/Timer";

type Timer = {
  name: string;
  duration: number;
};

// This is the value that will be passed to the context consumers and managed by the context provider
type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimersState = {
  isRunning: false,
  timers: [],
};

// this will be used as generic type for createContext
// This overall merged type will be accessible across the application
type TimersContextValue = TimersState & {
  // methods that will be called to manimpulate the state
  addTimer: (timer: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

// this fn is executed to create a context object for managing the context of application-wide data
export const TimersContext = createContext<TimersContextValue | null>(null);

// custom hooks
export const useTimersContext = () => {
  const ctx = useContext(TimersContext);
  if (ctx === null) {
    throw new Error(
      "TimersContext is null. Make sure to wrap your component with TimersContextProvider."
    );
  }
  return ctx;
};

// different action types => disciminate using union types
// this is how you should typically define the action types in a reducer function
type StartTimersAction = {
  type: 'START_TIMERS';
}

type StopTimersAction = {
  type: 'STOP_TIMERS';
}

type AddTimerAction = {
  type: 'ADD_TIMER';
  payload: Timer;
}

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

// defines the actions that will handle the state and produce a new one
// needs to return the same structure as the initial state
const timersReducer = (state: TimersState, action: Action): TimersState => {
  // never directly change the state, always return a new copy
  if (action.type === 'START_TIMERS') {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === 'STOP_TIMERS') {
    return {
      ...state,
      isRunning: false,
    };
  }
  if (action.type === 'ADD_TIMER') {
    return {
      ...state,
      timers: [...state.timers, action.payload!],
    };
  }
  return state;
};

type TimersContextProviderProps = {
  children: ReactNode;
};

const TimersContextProvider = ({ children }: TimersContextProviderProps) => {
  // useReducer is used to manage the state of the context and needs two arguments to work correctly (reducer function, initial state)
  // reducer is the function automatically executed by react whenever a new action is dispatched => it will return a new state based on the action type and payload
  // the reducer is destructured into an array that returns the current state and a dispatch function to update the state
  // the dispatch function is used to send actions to the reducer function to update the state
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  // needs the state that's maintained by the reducer and the dispatch function to update the state
  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer: (timer) => {
      dispatch({ type: "ADD_TIMER", payload: timer });
    },
    startTimers: () => {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimers: () => {
      dispatch({ type: "STOP_TIMERS" });
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
};

export default TimersContextProvider;
