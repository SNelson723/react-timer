import { useRef } from 'react';
import { useTimersContext } from '../store/timersContext.tsx';
import Button from './UI/Button.tsx';
import Form, { FormHandle } from './UI/Form.tsx';
import Input from './UI/Input.tsx';

export default function AddTimer() {
  const form = useRef<FormHandle>(null);
  const { addTimer } = useTimersContext();

  function handleSaveTimer(data: unknown) {
    // get the data to dispatch the new timer to the context
    const extractedData = data as { name: string; duration: string };
    console.log(extractedData);
    // The + symbol converts the string to a number
    addTimer({ name: extractedData.name, duration: +extractedData.duration });
    form.current?.clear();
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
      <Input type="text" label="Name" id="name" />
      <Input type="number" label="Duration" id="duration" />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
}
