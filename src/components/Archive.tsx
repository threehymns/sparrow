"use client";
import React from "react";
import { ArchiveRestore, Trash } from "lucide-react";
import { ArchiveIcon } from "./ui/archive";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useConfirm } from "@/hooks/use-confirm";
import type { Task } from "@/types/task";

interface ArchiveProps {
  archivedTasks?: Task[];
  setArchivedTasks: (tasks: Task[]) => void;
  setTasks: (tasks: Task[]) => void;
  tasks: Task[];
}

const Archive: React.FC<ArchiveProps> = ({
  archivedTasks = [],
  setArchivedTasks,
  setTasks,
  tasks,
}) => {
  const { confirm } = useConfirm();

  const handleDeleteTask = (index: number) => {
    confirm({
      title: "Delete Archived Task",
      description: "Are you sure you want to permanently delete this task?",
      onConfirm: () =>
        setArchivedTasks(archivedTasks.filter((_, i) => i !== index)),
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <ArchiveIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-md">
        <DrawerHeader>
          <DrawerTitle>Archived Tasks</DrawerTitle>
          <DrawerDescription>
            View and restore your archived tasks
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="mx-3 h-[50vh] px-4">
          {archivedTasks.length === 0 ? (
            <div className="mt-60 text-center text-sm font-bold text-muted-foreground">
              No archived tasks
            </div>
          ) : (
            <ul className="space-y-2">
              {archivedTasks.map((task, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-2 rounded-md bg-secondary/20 px-4 py-1"
                >
                  <input
                    className="custom-checkbox mr-3 scale-75 cursor-default opacity-20"
                    type="checkbox"
                    checked={task.completed}
                    disabled
                  />
                  <span className="flex-grow truncate pr-4">{task.text}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setTasks([...tasks, task]);
                      setArchivedTasks(
                        archivedTasks.filter((_, i) => i !== index),
                      );
                    }}
                  >
                    <ArchiveRestore />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteTask(index)}
                  >
                    <Trash />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>

        <DrawerFooter>
          <div className="flex justify-center gap-2 px-4">
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                confirm({
                  // title: `Are you sure?`,
                  description: `Permanently delete ${archivedTasks.length} archived tasks?`,
                  onConfirm: () => setArchivedTasks([]),
                })
              }
            >
              <Trash />
              Clear All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTasks([...tasks, ...archivedTasks]);
                setArchivedTasks([]);
              }}
            >
              <ArchiveRestore />
              Restore All
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Archive;
