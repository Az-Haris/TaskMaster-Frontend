import { useState } from "react";
import { TaskContext } from "../context/contexts";
import PropTypes from "prop-types";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();

  // Delete task
  const deleteTask = async (taskId) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));

    try {
      await axiosPublic.delete(`/tasks/${user?.email}/${taskId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };



  //   update task
  const updateTask = async (updatedTask) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

    try {
      await axiosPublic.patch(
        `/tasks/${user.email}/${updatedTask.id}`,
        updatedTask,
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };



  const taskInfo = {
    tasks,
    setTasks,
    deleteTask,
    updateTask,
  };
  return (
    <TaskContext.Provider value={taskInfo}>{children}</TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.object,
};

export default TaskProvider;
