import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {

  return <>
    {tasks.map((task, key) => (<Task key={key} task={task} onDelete={onDelete} onToggle={onToggle} />))}
  </>;
};

export default Tasks;
