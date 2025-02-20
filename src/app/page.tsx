"use client";
import { useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import Header from "@/components/Header";
import { useTasks } from "@/hooks/useTasks";

const Home: React.FC = () => {
  const [title, setTitle] = useState<string>("Sparrow");

  useEffect(() => {
    const storedTitle = localStorage.getItem("title");
    if (storedTitle) setTitle(storedTitle);
  }, []);

  useEffect(() => {
    localStorage.setItem("title", title);
  }, [title]);

  const {
    tasks,
    archivedTasks,
    setTasks,
    setArchivedTasks,
    addTask,
    toggleTask,
    removeTask,
    handleTaskTextChange,
  } = useTasks();

  return (
    <div className="min-h-screen overflow-hidden bg-black text-zinc-200 transition-colors duration-300">
      <div className="container mx-auto max-w-md px-4 pb-12 pt-5">
        <Header
          title={title}
          setTitle={setTitle}
          tasks={tasks}
          setTasks={setTasks}
          archivedTasks={archivedTasks}
          setArchivedTasks={setArchivedTasks}
        />
        <TaskInput addTask={addTask} />
        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          removeTask={removeTask}
          handleTaskTextChange={handleTaskTextChange}
        />
      </div>
    </div>
  );
};

export default Home;
