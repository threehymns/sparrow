import React, { useRef } from "react";
import { SquarePenIcon } from "./ui/square-pen";

interface TaskInputProps {
  addTask: (taskText: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTask = () => {
    if (inputRef.current) {
      const taskValue = inputRef.current.value.trim();
      if (taskValue) {
        addTask(taskValue);
        inputRef.current.value = ""; // Clear input after adding the task
      }
    }
  };

  return (
    <div className="fixed bottom-3 left-1/2 z-10 mb-4 flex w-full max-w-md -translate-x-1/2 rounded-full border border-zinc-900 bg-zinc-950/75 p-1 outline-none ring-offset-4 ring-offset-black backdrop-blur transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20">
      <input
        type="text"
        placeholder="Add a new task..."
        ref={inputRef}
        className="w-full bg-transparent pl-4 outline-none placeholder:text-zinc-400"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTask();
          }
        }}
        id="taskInput"
      />
      <button
        onClick={handleAddTask}
        className="ml-1 rounded-full border border-primary/5 bg-primary/10 px-3 font-bold text-white outline-none transition-all duration-300 hover:bg-primary/15 focus:ring-2 focus:ring-primary/50"
      >
        <div className="h-10 w-9">
          <SquarePenIcon />
        </div>
      </button>
    </div>
  );
};

export default TaskInput;
