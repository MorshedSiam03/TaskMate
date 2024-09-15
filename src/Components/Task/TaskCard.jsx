import { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CreateSubtask from "./CreateSubtask";
import { AuthContext } from "../../Provider/AuthProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";

const TaskCard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDeadline, setUpdatedDeadline] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const { user } = useContext(AuthContext);

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:4000/tasks");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        const sortedTasks = data.sort((a, b) => a.position - b.position);
        const sortedTasksWithSubtasks = sortedTasks.map((task) => ({
          ...task,
          subtasks: (task.subtasks || []).sort(
            (a, b) => a.position - b.position
          ),
        }));
        setTasks(sortedTasksWithSubtasks);
      } else {
        console.error("Data is not in the expected format");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to update task positions in backend
  const updateTaskPositions = async (updatedTasks) => {
    try {
      const batch = db.batch();

      updatedTasks.forEach((task) => {
        const taskRef = doc(db, "tasks", task.taskId);
        batch.update(taskRef, { subtasks: task.subtasks });
      });

      await batch.commit();
      console.log("Task positions updated successfully");
    } catch (error) {
      console.error("Error updating task positions:", error);
    }
  };

  // Function to handle task update
  const handleUpdateTask = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${editingTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          deadline: updatedDeadline,
          status: updatedStatus,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Optionally, you can parse the response if needed
      // const updatedTask = await response.json();
  
      setEditingTaskId(null); // Exit editing mode
      fetchTasks(); // Refresh the task list
      console.log("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  // Function to handle task deletion
  const handleDeleteTask = async (_id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${_id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task._id !== _id));
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle drag end event
  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceTaskId = source.droppableId;
    const destTaskId = destination.droppableId;

    const updatedTasks = tasks.map((task) => {
      if (task.taskId === sourceTaskId || task.taskId === destTaskId) {
        const updatedSubtasks = [...task.subtasks];
        const [removed] = updatedSubtasks.splice(source.index, 1);
        updatedSubtasks.splice(destination.index, 0, removed);

        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      }
      return task;
    });

    await updateTaskPositions(updatedTasks);
    setTasks(updatedTasks);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks" type="TASK">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5"
            >
              {tasks.length > 0 ? (
                tasks.map((task, taskIndex) => (
                  <Draggable
                    key={task.taskId}
                    draggableId={task.taskId}
                    index={taskIndex}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 rounded bg-white shadow"
                      >
                        <h1 className="font-bold text-lg text-center">
                          {task.title}
                        </h1>
                        <p className="text-center">Deadline: {task.deadline}</p>
                        <p className="my-1 text-center">
                          Status:{" "}
                          <span className="bordered px-2 py-1 text-sm bg-green-600 text-white rounded-badge">
                            {task.status}
                          </span>
                        </p>

                        {user?.role === "admin" && (
                          <div className="flex justify-end text-xl gap-2">
                            <button
                              onClick={() => {
                                setEditingTaskId(task.taskId);
                                setUpdatedTitle(task.title);
                                setUpdatedDeadline(task.deadline);
                                setUpdatedStatus(task.status);
                              }}
                            >
                              <FaRegEdit />
                            </button>
                            {(!task.subtasks || task.subtasks.length === 0) && (
                              <button
                                onClick={() => handleDeleteTask(task._id)}
                              >
                                <MdDelete />
                              </button>
                            )}
                          </div>
                        )}

                        {editingTaskId === task.taskId && (
                          <div className="bg-gray-100 p-4 rounded mt-4">
                            <h2 className="text-lg font-bold mb-2">Update Task</h2>
                            <input
                              type="text"
                              value={updatedTitle}
                              onChange={(e) => setUpdatedTitle(e.target.value)}
                              placeholder="Title"
                              className="border p-2 mb-2 w-full"
                            />
                            <input
                              type="date"
                              value={updatedDeadline}
                              onChange={(e) => setUpdatedDeadline(e.target.value)}
                              className="border p-2 mb-2 w-full"
                            />
                            <input
                              type="text"
                              value={updatedStatus}
                              onChange={(e) => setUpdatedStatus(e.target.value)}
                              placeholder="Status"
                              className="border p-2 mb-2 w-full"
                            />
                            <button
                              onClick={handleUpdateTask}
                              className="bg-blue-500 text-white p-2 rounded"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => setEditingTaskId(null)}
                              className="bg-red-500 text-white p-2 rounded ml-2"
                            >
                              Cancel
                            </button>
                          </div>
                        )}

                        {user?.email && (
                          <div>
                            <h2 className="font-semibold mt-2">Subtasks:</h2>
                            <Droppable droppableId={task.taskId} type="SUBTASK">
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                >
                                  {task.subtasks && task.subtasks.length > 0 ? (
                                    task.subtasks.map(
                                      (subtask, subtaskIndex) => (
                                        <Draggable
                                          key={subtask.subtaskId}
                                          draggableId={subtask.subtaskId}
                                          index={subtaskIndex}
                                        >
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className="bg-slate-100 rounded-md my-2 p-2"
                                            >
                                              <h1 className="font-semibold">
                                                {subtask.title}
                                              </h1>
                                              <p className="mb-2">
                                                {subtask.description}
                                              </p>
                                              <hr />
                                              <p className="my-1">
                                                Deadline: {subtask.deadline}
                                              </p>
                                              <p>Status: {subtask.status}</p>
                                              {user?.role === "admin" && (
                                                <div className="flex justify-end text-xl gap-2">
                                                  <button>
                                                    <FaRegEdit />
                                                  </button>
                                                  <button>
                                                    <MdDelete />
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </Draggable>
                                      )
                                    )
                                  ) : (
                                    <p>No subtasks available</p>
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                            {user?.role === "admin" && (
                              <div className="text-center">
                                <CreateSubtask />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p>No tasks available</p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskCard;
