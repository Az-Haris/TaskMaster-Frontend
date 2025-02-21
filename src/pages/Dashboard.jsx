import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Input from "../components/input/Input";
import Column from "../components/column/Column";
import "./Dashboard.css";

// Initial tasks with title, description, and timestamp
const initialTasks = [
  {
    id: "1",
    title: "Task 1",
    description: "Description of Task 1",
    category: "To-Do",
    timestamp: Date.now(),
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description of Task 2",
    category: "In Progress",
    timestamp: Date.now(),
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description of Task 3",
    category: "Done",
    timestamp: Date.now(),
  },
  {
    id: "4",
    title: "Task 4",
    description: "Description of Task 4",
    category: "To-Do",
    timestamp: Date.now(),
  },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Add new task
  const addTask = (title, description) => {
    const newTask = {
      id: (tasks.length + 1).toString(),
      title,
      description,
      category: "To-Do",
      timestamp: Date.now(),
    };
    setTasks((tasks) => [...tasks, newTask]);
  };

  // Get task position by ID
  const getTaskPosition = (id) => tasks.findIndex((task) => task.id === id);

  // Handle drag end event
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over) return; // If no drop target, exit
  
    const activeId = active.id;
    const overId = over.id;
  
    setTasks((tasks) => {
      const activeTask = tasks.find((task) => task.id === activeId);
      if (!activeTask) return tasks; // Safety check
  
      // Check if dropping into an empty column
      if (["To-Do", "In Progress", "Done"].includes(overId)) {
        return tasks.map((task) =>
          task.id === activeId ? { ...task, category: overId } : task
        );
      }
  
      // Otherwise, reorder within the same column
      const originalPosition = getTaskPosition(active.id);
      const newPosition = getTaskPosition(over.id);
      const reorderedTasks = arrayMove(tasks, originalPosition, newPosition);
  
      return reorderedTasks.map((task) => {
        if (task.id === active.id) {
          const overTask = tasks.find((task) => task.id === over.id);
          task.category = overTask?.category || task.category;
        }
        return task;
      });
    });
  };
  

  const handleDragOver = (e) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    setTasks((tasks) => {
      const activeTask = tasks.find((task) => task.id === activeId);
      if (!activeTask) return tasks; // Safety check

      // Check if overId is a task or a column
      const overTask = tasks.find((task) => task.id === overId);

      if (overTask) {
        // If dragging over a task, use its category
        if (activeTask.category !== overTask.category) {
          return tasks.map((task) =>
            task.id === activeId
              ? { ...task, category: overTask.category }
              : task,
          );
        }
      } else if (["To-Do", "In Progress", "Done"].includes(overId)) {
        // If dragging over an empty column, update category to the column name
        return tasks.map((task) =>
          task.id === activeId ? { ...task, category: overId } : task,
        );
      }

      return tasks;
    });
  };

  // Drag-and-drop sensors
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  return (
    <div className="dashboard">
      <div className="max-w-96 mt-6 px-3 mx-auto">
        <Input onSubmit={addTask} />
      </div>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={closestCorners}
      >
        <div className="columns-container container mx-auto">
          <Column
            tasks={tasks?.filter((task) => task.category === "To-Do") || []}
            category={"To-Do"}
          />
          <Column
            tasks={
              tasks?.filter((task) => task.category === "In Progress") || []
            }
            category={"In Progress"}
          />
          <Column
            tasks={tasks?.filter((task) => task.category === "Done") || []}
            category={"Done"}
          />
        </div>
      </DndContext>
    </div>
  );
};

export default Dashboard;
