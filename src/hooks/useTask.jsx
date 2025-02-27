import { useContext } from "react";
import { TaskContext } from "../context/contexts";

const useTask = () => {
    const task = useContext(TaskContext)
    return task;
};

export default useTask;