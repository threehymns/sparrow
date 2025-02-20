import React, { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import EmptyState from "@/components/EmptyState";
import { AnimatePresence, motion } from "framer-motion";

interface Task {
  text: string;
  completed: boolean;
  id: number;
}

interface TaskListProps {
  tasks: Task[];
  toggleTask: (index: number) => void;
  removeTask: (index: number) => void;
  handleTaskTextChange: (index: number, text: string) => void;
  taskRefs?: React.MutableRefObject<(HTMLElement | null)[]>;
}

interface TaskItemProps {
  task: Task;
  index: number;
  onToggle: () => void;
  onDelete: () => void;
  onTextChange: (text: string) => void;
  isBeingDeleted: boolean;
}

const TaskItem = React.forwardRef<HTMLLIElement, TaskItemProps>(
  ({ task, index, onToggle, onDelete, onTextChange, isBeingDeleted }, ref) => {
    const [translateX, setTranslateX] = useState(0);
    const isDragging = useRef(false);
    const dragDistance = useRef(0);

    const handlers = useSwipeable({
      onSwiping: ({ deltaX }) => {
        isDragging.current = true;
        dragDistance.current = Math.abs(deltaX);
        setTranslateX(Math.min(Math.max(deltaX, -200), 0));
      },
      onSwiped: (e) => {
        isDragging.current = false;
        if (e.deltaX < -100) {
          onDelete();
          setTranslateX(0);
        } else {
          // Spring back animation
          setTranslateX(0);
        }
        setTimeout(() => {
          isDragging.current = false;
          dragDistance.current = 0;
        }, 100);
      },
      trackMouse: true,
      trackTouch: true,
    });

    const handleClick = (e: React.MouseEvent) => {
      if (dragDistance.current < 10) {
        onToggle();
      }
      if (
        !task.completed &&
        !isBeingDeleted &&
        !isDragging.current &&
        dragDistance.current < 10
      ) {
        e.currentTarget.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.05)" },
            { transform: "scale(1)" },
          ],
          { duration: 500, easing: "ease" },
        );
      }
    };

    return (
      <motion.li
        {...handlers}
        id={`task-${index}`}
        tabIndex={0}
        role="listitem"
        aria-label={`Task ${index + 1}: ${task.text}`}
        className={`task-item group relative flex items-center border-t border-t-zinc-900 p-3 ${task.completed ? "border-t-primary/10 bg-primary/10" : "bg-zinc-900/50 hover:bg-zinc-900/75"} transform rounded-lg shadow-md hover:scale-105 ${isBeingDeleted ? "pointer-events-none origin-left duration-500 ease-out animate-out fade-out spin-out-12 slide-out-to-right slide-out-to-top-5 fill-mode-forwards" : ""} `}
        style={{
          x: translateX,
          transition: isBeingDeleted
            ? "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            : translateX === 0
              ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease-out"
              : "none",
          cursor: isDragging.current ? "grabbing" : "grab",
          touchAction: "pan-y",
          willChange: "transform, opacity",
        }}
        onClick={handleClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        ref={ref}
      >
        <div
          className={`absolute inset-0 rounded-lg bg-gradient-to-r from-transparent to-red-500/20 ${Math.abs(translateX) > 0 ? "opacity-100" : "opacity-0"}`}
          style={{
            opacity: Math.min(Math.abs(translateX) / 100, 0.8),
          }}
        />

        <input
          type="checkbox"
          checked={task.completed}
          className="custom-checkbox relative z-10 mr-3"
          onChange={onToggle}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        />
        <textarea
          value={task.text}
          cols={Math.max(...task.text.split("\n").map((line) => line.length))}
          rows={task.text.split("\n").length}
          placeholder="Task Name"
          onChange={(e) => onTextChange(e.currentTarget.value)}
          onClick={(e) => e.stopPropagation()}
          className={`ghost-input relative z-10 resize-none text-lg ${
            task.completed ? "text-white/50 line-through" : ""
          }`}
          tabIndex={-1}
        />
        <div className="flex-grow" />

        {/* Delete button with animation */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className={`trash-btn relative z-10 transition-transform duration-200 ${Math.abs(translateX) > 0 ? "scale-110" : "scale-100"} hover:scale-125 active:scale-95`}
        >
          <Trash2
            className={`transition-colors duration-200 ${Math.abs(translateX) > 100 ? "text-red-500" : ""}`}
          />
        </button>

        {/* Delete swipe indicator */}
        <div
          className="absolute bottom-0 right-0 top-0 flex items-center justify-center overflow-hidden"
          style={{
            width: Math.abs(translateX),
            right: translateX,
          }}
        >
          <Trash2
            className={`h-8 w-14 transform rounded-full p-2 text-red-500 transition-colors duration-500 ${Math.abs(translateX) > 100 ? "bg-red-500/20" : "bg-transparent"}`}
            style={{
              transform: `scale(${Math.min(Math.abs(translateX) / 100 + 0.5, 1.5)})`,
              opacity: Math.min(Math.abs(translateX) / 100 - 0.2, 1),
              // filter: `blur(${5 - Math.abs(translateX) / 20}px)`,
            }}
          />
        </div>
      </motion.li>
    );
  },
);
TaskItem.displayName = "TaskItem";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTask,
  removeTask,
  handleTaskTextChange,
  taskRefs,
}) => {
  const [deletingItems, setDeletingItems] = useState<Set<number>>(new Set());
  const localRefs = useRef<(HTMLElement | null)[]>([]);

  // Use local refs if no external refs are provided
  const effectiveRefs = taskRefs ?? localRefs;

  // Update refs when tasks change
  useEffect(() => {
    if (effectiveRefs) {
      effectiveRefs.current = tasks.map(() => null);
    }
  }, [tasks, effectiveRefs]);

  const handleDelete = (index: number) => {
    setDeletingItems((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });

    setTimeout(() => {
      removeTask(index);
      setDeletingItems((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }, 300);
  };

  return (
    <motion.ul id="taskList" className="mb-20 space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            onToggle={() => toggleTask(index)}
            onDelete={() => handleDelete(index)}
            onTextChange={(text) => handleTaskTextChange(index, text)}
            isBeingDeleted={deletingItems.has(index)}
            ref={(el) => {
              console.log(`Setting ref for task ${index}:`, el);
              if (effectiveRefs.current) {
                effectiveRefs.current[index] = el;
              }
            }}
          />
        ))}
      </AnimatePresence>
      {tasks.length === 0 && <EmptyState />}
    </motion.ul>
  );
};

export default TaskList;
