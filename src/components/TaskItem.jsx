import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-200 p-3 rounded-lg shadow-md mb-2 cursor-grab"
    >
      <h3 className="text-md font-semibold">{task.title}</h3>
      {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
    </div>
  );
}
