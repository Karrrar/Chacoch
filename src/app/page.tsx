'use client';

import Stage from "@/chacoch/Stage";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounceTime, fromEvent, Subscription } from "rxjs";

export default function Home() {
  const [speed, setSpeed] = useState<number>(400);
  const [speedValue, setSpeedValue] = useState<number>(400);
  const [start, setStart] = useState<boolean>(false);

  const speedRef = useRef<HTMLInputElement>(null);

  const handleSpeedChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSpeedValue(+event.target.value);
  }, [speed]);

  useEffect(() => {
    if (!speedRef.current) return;
    const speed$: Subscription = fromEvent<Event>(speedRef.current, "input").pipe(
      debounceTime(500)
    ).subscribe(event => {
      const newSpeed = Number((event.target as HTMLInputElement).value);
      setSpeed(newSpeed);
    });

    return () => speed$.unsubscribe();
  }, []);

  return (
    <>
      <Stage rows={10} cols={10} speed={speed} start={start} />
      <button>Play</button>
      <input ref={speedRef} type="range" min="50" max="1000" step={50} value={speedValue} onChange={handleSpeedChange} />
      <p>{speedValue}</p>
    </>
  );
}
