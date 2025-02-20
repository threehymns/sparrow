import { useState, useEffect } from "react";
import type { Task } from "@/types/task";

import { particles } from "@/lib/particles";
import { playSuccessSound } from "@/lib/playSuccessSound";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedArchivedTasks = localStorage.getItem("archivedTasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks) as Task[]);
    }
    if (storedArchivedTasks) {
      setArchivedTasks(JSON.parse(storedArchivedTasks) as Task[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
  }, [tasks, archivedTasks]);

  const addTask = (text: string): void => {
    if (text.trim()) {
      const newTask: Task = {
        text,
        completed: false,
        id: Date.now(),
      };
      setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
    }
  };

  const toggleTask = (index: number): void => {
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task,
      ),
    );

    const checkbox = document
      .getElementById(`task-${index}`)
      ?.querySelector(".custom-checkbox");
    (checkbox as HTMLElement)?.focus();
    if (checkbox && !tasks[index]?.completed) {
      particles(checkbox);
      playSuccessSound();
    }
  };

  const removeTask = (index: number): void => {
    const removedTask = tasks[index];
    setTasks((prevTasks: Task[]) => prevTasks.filter((_, i) => i !== index));
    if (removedTask) {
      setArchivedTasks([...archivedTasks, removedTask]);
    }
  };

  const handleTaskTextChange = (index: number, newText: string): void => {
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, text: newText } : task,
      ),
    );
  };

  const handleUndo = (): void => {
    const lastTask = archivedTasks[archivedTasks.length - 1];
    if (lastTask) {
      setArchivedTasks(archivedTasks.slice(0, -1));
      setTasks([...tasks, lastTask]);
    }
  };

  return {
    tasks,
    archivedTasks,
    setTasks,
    setArchivedTasks,
    addTask,
    toggleTask,
    removeTask,
    handleTaskTextChange,
    handleUndo,
  };
}
