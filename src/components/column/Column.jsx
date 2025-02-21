import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";

const Column = ({ tasks, category }) => {
  return (
    <div className="mt-5 h-[500px] max-h-[500px] w-[350px] mx-auto flex flex-col bg-gray-200 rounded-lg">
      <div className="bg-gray-800 text-white py-2 rounded-t-lg text-center">
        <h2>{category}</h2>
      </div>
      <div className="flex-grow space-y-3 pt-3 px-3 overflow-y-auto overflow-x-hidden">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              timestamp={task.timestamp}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
