import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './Task.css';
import TrashIcon from '../TrashIcon';

const Task = ({ id, title, description, timestamp }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const formattedDate = new Date(timestamp).toLocaleString();



  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="task">
      <small>{formattedDate}</small>
      <h3 className='text-xl font-semibold'>{title}</h3>
      <p className='text-gray-700'>{description}</p>
      <div className='mt-3 flex items-center gap-3'>
        <button className='stroke-red-500'><TrashIcon></TrashIcon></button>
      </div>
    </div>
  );
};

export default Task;
