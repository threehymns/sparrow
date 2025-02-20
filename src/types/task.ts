import type { KeyboardEvent } from "react";

export interface Task {
  text: string;
  completed: boolean;
  id: number;
}

export interface KeyboardHandlers {
  handleTaskKeyDown: (e: KeyboardEvent<HTMLElement>, index?: number) => void;
  handleInputKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  handleTitleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  taskRefs?: React.MutableRefObject<(HTMLElement | null)[]>;
}
