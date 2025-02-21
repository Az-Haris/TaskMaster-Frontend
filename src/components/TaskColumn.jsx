import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import TaskItem from "./TaskItem"; 

export default function TaskColumn({ title, tasks }) {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div ref={setNodeRef} className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <SortableContext items={tasks}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}
