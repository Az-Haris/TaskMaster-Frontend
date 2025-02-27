import { useEffect } from "react";
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
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import Login from "./Login";
import { Spinner } from "flowbite-react";
import useTask from "../hooks/useTask";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const {tasks, setTasks} = useTask()
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosPublic.get(`/tasks/${user?.email}`);
        setTasks(res.data || []); // Extract tasks array
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Set empty array to prevent crash
      }
    };

    if (user?.email) fetchTasks();
  }, [axiosPublic, setTasks, user?.email]);

  // Add new task
  const addTask = async (title, description) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      category: "To-Do",
      timestamp: Date.now(),
    };
    setTasks((tasks) => [...tasks, newTask]);

    // save to db
    try {
      await axiosPublic.post("/tasks", {
        userEmail: user?.email,
        task: newTask,
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle drag end event
  const handleDragEnd = async (e) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    setTasks((tasks) => {
      const activeTask = tasks.find((task) => task.id === activeId);
      if (!activeTask) return tasks;

      // Check if dropping into an empty column
      if (["To-Do", "In Progress", "Done"].includes(overId)) {
        activeTask.category = overId;
      } else {
        // Otherwise, reorder within the same column
        const originalPosition = tasks.findIndex(
          (task) => task.id === activeId,
        );
        const newPosition = tasks.findIndex((task) => task.id === overId);
        tasks = arrayMove(tasks, originalPosition, newPosition);
      }

      // Send updated tasks list to the backend
      updateTasksInDB(tasks);

      return [...tasks]; // Return updated tasks list
    });
  };

  // Function to update tasks in DB
  const updateTasksInDB = async (updatedTasks) => {
    try {
      await axiosPublic.put(`/tasks/${user?.email}`, { tasks: updatedTasks });
    } catch (error) {
      console.error("Error updating tasks:", error);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner color="success" aria-label="Success spinner example" />
      </div>
    );
  }

  if (!user) return <Login></Login>;

  return (
    <div className="dashboard mb-20">
      <div className="max-w-96 mt-6 px-3 mx-auto">
        <Input onSubmit={addTask} />
      </div>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={closestCorners}
      >
        <div className="flex justify-center flex-col md:flex-row px-5 gap-10 container mx-auto">
          <Column
            tasks={tasks?.filter((task) => task.category === "To-Do") || []}
            category={"To-Do"} icon={assets.Todo}
          />
          <Column
            tasks={
              tasks?.filter((task) => task.category === "In Progress") || []
            }
            category={"In Progress"} icon={assets.Progress}
          />
          <Column
            tasks={tasks?.filter((task) => task.category === "Done") || []}
            category={"Done"} icon={assets.Done}
          />
        </div>
      </DndContext>
    </div>
  );
};

export default Dashboard;
