import { useContext } from "react";
import FormDialog from "./FormDialog";
import TaskCard from "./TaskCard";
import { AuthContext } from "../../Provider/AuthProvider";

const TaskList = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="flex my-4 justify-between">
        <h1 className="font-bold text-4xl">Task List</h1>
        {user?.role === "admin" && (
          <div>
            <FormDialog />
          </div>
        )}
      </div>
      <TaskCard></TaskCard>
    </div>
  );
};

export default TaskList;
