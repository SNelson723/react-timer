import Button from "./UI/Button.tsx";
import { useTimersContext } from "../store/timersContext.tsx";

export default function Header() {
  // The argument should be the context object created in the store that you want to reach out to

  const timersCtx = useTimersContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button>{timersCtx.isRunning ? "Stop" : "Start"} Timers</Button>
    </header>
  );
}
