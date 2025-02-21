import { useState } from "react";
import './Input.css'

const Input = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onSubmit(title, description);
      setTitle(""); // Clear input fields after submitting
      setDescription(""); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength="50"
        className="w-full rounded-md"
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength="200"
        className="w-full rounded-md"
      />
      <button className="button" type="submit">Add Task</button>
    </form>
  );
};

export default Input;
