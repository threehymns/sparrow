import Archive from "@/components/Archive";
import { Settings } from "./Settings";
import type { Task } from "@/types/task";

interface TitleEditorProps {
  title: string;
  setTitle: (title: string) => void;
  archivedTasks: Task[];
  setArchivedTasks: (tasks: Task[]) => void;
  setTasks: (tasks: Task[]) => void;
  tasks: Task[];
}

const Header: React.FC<TitleEditorProps> = ({
  title,
  setTitle,
  archivedTasks,
  setArchivedTasks,
  setTasks,
  tasks,
}) => {
  return (
    <div className="mb-8 flex items-center justify-between gap-1">
      <input
        className="ghost-input w-full min-w-10 p-1.5 text-2xl font-bold text-white outline-none transition-colors duration-300"
        onBlur={(e) => setTitle(e.currentTarget.value || "Untitled")}
        onChange={(e) => setTitle(e.currentTarget.value)}
        id="title"
        value={title}
      />
      <Archive
        archivedTasks={archivedTasks}
        setArchivedTasks={setArchivedTasks}
        setTasks={setTasks}
        tasks={tasks}
      />
      <Settings />
    </div>
  );
};

export default Header;
