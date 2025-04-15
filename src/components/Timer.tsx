import Container from "./UI/Container.tsx";
import { type Timer as TimerProps } from "../store/timersContext.tsx";

const Timer = ({ name, duration }: TimerProps) => {
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{duration}</p>
    </Container>
  );
};

export default Timer;
