import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './Task.css';

const Task = ({ id, title, description, timestamp }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const formattedDate = new Date(timestamp).toLocaleString();

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="task">
      <input type="checkbox" className="checkbox" />
      <h3>{title}</h3>
      <p>{description}</p>
      <small>{formattedDate}</small>
    </div>
  );
};

export default Task;
