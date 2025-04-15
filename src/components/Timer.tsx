import Container from "./UI/Container.tsx";
import { type Timer as TimerProps } from "../store/timersContext.tsx";

const Timer = ({ name, duration }: TimerProps) => {
  return (
    <Container as="article">
      <h2>TODO: TIMER NAME</h2>
    </Container>
  );
};

export default Timer;
