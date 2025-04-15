import { createContext, useContext, type ReactNode } from "react";
import Timer from "../components/Timer";

type Timer = {
  name: string;
  duration: number;
}

// This is the value that will be passed to the context consumers and managed by the context provider
type TimersState = {
  isRunning: boolean;
  timers: Timer[]
}

// this will be used as generic type for createContext
// This overall merged type will be accessible across the application
type TimersContextValue = TimersState & {
  // methods that will be called to manimpulate the state
  addTimer: (timer: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
}

// this fn is executed to create a context object for managing the context of application-wide data
export const TimersContext = createContext<TimersContextValue | null>(null);

// custom hooks
export const useTimersContext = () => {
  const ctx = useContext(TimersContext);
  if (ctx === null) {
    throw new Error("TimersContext is null. Make sure to wrap your component with TimersContextProvider.");
  }
  return ctx;
};

type TimersContextProviderProps = {
  children: ReactNode;
};

const TimersContextProvider = ({children}: TimersContextProviderProps) => {
  const ctx: TimersContextValue = {
    timers: [],
    isRunning: false,
    addTimer: (timer) => {
      ctx.timers.push(timer);
    },
    startTimers: () => {
      ctx.isRunning = true;
    },
    stopTimers: () => {
      ctx.isRunning = false;
    }
  }
  return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>;
};

export default TimersContextProvider;
