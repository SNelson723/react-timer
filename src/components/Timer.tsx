import Container from "./UI/Container.tsx";
import {
  useTimersContext,
  type Timer as TimerProps,
} from "../store/timersContext.tsx";
import { useState, useEffect, useRef } from "react";

const Timer = ({ name, duration }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const interval = useRef<number | null>(null);
  const { isRunning } = useTimersContext();

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  // Update the remaining time every 50ms => useEffect keeps the timer running after the component is mounted
  // useEffect is a hook that runs after the component is mounted
  // The empty array as the second argument means that the effect will only run once, when the component is mounted
  // The setInterval function is used to update the remaining time every 50ms
  // The setRemainingTime function is used to update the remaining time
  // The remaining time is updated by subtracting 50ms from the previous remaining time
  // The setInterval function is cleared when the component is unmounted
  useEffect(() => {
    let timer: number;
    if (isRunning) {
      // initialise the timer
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          // if the timer is already at 0, don't update it
          if (prevTime <= 0) {
            return prevTime;
          }
          return prevTime - 50;
        });
      }, 50);

      // set the interval ref's current => therefore this doesn't clear until remaining time hits 0
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    // React.Strictmode runs the effect twice in development mode, so we need to clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
};

export default Timer;
