import { Button } from "flowbite-react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const initialTasks = {
  todo: [
    { id: "1", title: "Task 1", description: "This is a to-do task." },
  ],
  inProgress: [
    { id: "2", title: "Task 2", description: "This task is in progress." },
  ],
  done: [
    { id: "3", title: "Task 3", description: "This task is done." },
  ],
};

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const startColumn = tasks[source.droppableId];
    const endColumn = tasks[destination.droppableId];
    const [movedTask] = startColumn.splice(source.index, 1);
    endColumn.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: startColumn,
      [destination.droppableId]: endColumn,
    });
  };

  return (
    <div className=" min-h-screen pt-5 bg-gray-100">

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container mx-auto px-3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {Object.keys(tasks).map((column, index) => (
            <Droppable key={index} droppableId={column}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white p-4 rounded-lg shadow-md min-h-[300px]"
                >
                  <h2 className="font-bold text-lg mb-2 capitalize">
                    {column.replace("todo", "To-Do")}
                  </h2>
                  {tasks[column].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-200 p-2 rounded-md mb-2"
                        >
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-sm">{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <div className="fixed bottom-4 right-4">
        <Button className="p-4">+ Add Task</Button>
      </div>
    </div>
  );
};

export default Dashboard;
