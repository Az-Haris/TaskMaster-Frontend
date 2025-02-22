import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Task.css";
import TrashIcon from "../TrashIcon";
import EditIcon from "../EditIcon";
import Modal from "../Modal";

const Task = ({ id, title, description, timestamp, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEditSave = () => {
    onEdit(id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  return (
    <>
      <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="task">
        <small>{new Date(timestamp).toLocaleString()}</small>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-700">{description}</p>
        <div className="mt-3 flex items-center gap-3">
          <button className="stroke-blue-500" onClick={() => setIsEditing(true)}>
            <EditIcon />
          </button>
          <button className="stroke-red-500" onClick={() => onDelete(id)}>
            <TrashIcon />
          </button>
        </div>
      </div>

      <Modal 
        isOpen={isEditing} 
        onClose={() => setIsEditing(false)} 
        onSave={handleEditSave}
        title={editedTitle} 
        description={editedDescription} 
        setTitle={setEditedTitle} 
        setDescription={setEditedDescription} 
      />
    </>
  );
};

export default Task;
