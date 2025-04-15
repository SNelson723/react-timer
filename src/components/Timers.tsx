import { useTimersContext } from "../store/timersContext";
import Timer from "./Timer";


const Timers = () => {
  const { timers } = useTimersContext();
  return <ul>
    {timers.map((timer) => (
      <li key={timer.name}>
        <Timer {...timer} />
      </li>
    ))}
  </ul>;
}

export default Timers;
