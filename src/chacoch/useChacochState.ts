import { useState } from "react";
import { Position } from "./types";

export default function useChacochState() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  return { position, setPosition };
}
