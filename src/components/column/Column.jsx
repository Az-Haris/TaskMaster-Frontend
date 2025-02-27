import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Task from "../Task/Task";

const Column = ({ tasks, category, icon }) => {
  const { setNodeRef } = useDroppable({
    id: category,
  });

  return (
    <div
      ref={setNodeRef}
      className="mt-5 h-[500px] max-h-[500px] w-full flex flex-col bg-gray-200 dark:bg-gray-800 rounded-lg"
    >
      <div className="bg-gray-800 dark:bg-gray-950 text-white py-2 rounded-t-lg flex items-center gap-2 justify-center">
        <img src={icon} alt="" />
        <h2>{category}</h2>
      </div>
      <div className="flex-grow space-y-3 pt-3 px-3 overflow-y-auto overflow-x-hidden">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks?.length > 0 ? (
            tasks?.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                category={task.category}
                description={task.description}
                timestamp={task.timestamp}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Drop tasks here</p> // Placeholder when empty
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;