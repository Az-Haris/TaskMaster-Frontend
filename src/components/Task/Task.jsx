import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Task.css";
import TrashIcon from "../TrashIcon";
import EditIcon from "../EditIcon";
import Modal from "../Modal";
import useTask from "../../hooks/useTask";

const Task = ({ id, title, description, category, timestamp }) => {
  const { deleteTask, updateTask } = useTask();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEditSave = () => {
    const updatedTask = {
      id,
      title: editedTitle, // Correcting the field name
      description: editedDescription,
      category,
      timestamp, // Ensure timestamp remains unchanged
    };

    updateTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="task p-5 w-full rounded-md bg-white dark:bg-gray-700"
      >
        <div {...attributes} {...listeners}>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <div className="flex items-end justify-between">
          <div className="mt-3 flex items-center gap-3">
            <button
              className="stroke-blue-500 bg-gray-200 dark:bg-gray-800 dark:hover:bg-blue-500 p-1 rounded-full hover:bg-blue-500 hover:stroke-white"
              onClick={() => setIsEditing(true)}
            >
              <EditIcon />
            </button>
            <button
              type="button"
              className="stroke-red-500 bg-gray-200 dark:bg-gray-800 dark:hover:bg-red-500 p-1 rounded-full hover:bg-red-500 hover:stroke-white"
              onClick={() => {
                deleteTask(id);
              }}
            >
              <TrashIcon />
            </button>
          </div>
          <small>{new Date(timestamp).toLocaleString()}</small>
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
