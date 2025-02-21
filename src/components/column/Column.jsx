import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "../Task/Task";
import "./Column.css";

const Column = ({ tasks, category }) => {
  return (
    <div className="column min-h-32">
        <h2>{category}</h2>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} description={task.description} timestamp={task.timestamp} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
