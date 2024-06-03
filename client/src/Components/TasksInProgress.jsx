import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskItem({ task, fetchTasks, updateCurrentTask, toggleEditTaskForm, secondArr,setSecondArr, changeStatus }) {
  const [statusListDisplay, setStatusListDisplay] = useState("none");
  const [taskWindowDisplay, setTaskWindowDisplay] = useState("none");
  const [editButtonDisplay, setEditButtonDisplay] = useState("flex");

  function changeStatusListDisplay(newDisplay) {
    setStatusListDisplay(newDisplay);
  }

  function changeDisplay(newDisplay) {
    setTaskWindowDisplay(newDisplay);
  }

  function changeButtonDisplay(newDisplay) {
    setEditButtonDisplay(newDisplay);
  }

  const handleDelete = async () => {
    try {
      // await axios.delete(`http://localhost:5000/tasks/${task._id}`);
      await axios.delete(`https://mern-project-task-28-1.onrender.com/tasks/${task._id}`);
      setSecondArr(secondArr.filter(t => t._id !== task._id)); // Remove the task from the state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    fetchTasks();
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // await axios.put(`http://localhost:5000/tasks/${task._id}/status`, { status: newStatus });
      await axios.put(`https://mern-project-task-28-1.onrender.com/tasks/${task._id}/status`, { status: newStatus });
      setSecondArr(secondArr.map(t => t._id === task._id ? { ...t, status: newStatus } : t)); // Update the task's status in the state
      let obj={}
      secondArr.forEach((e,i)=>{
        if(e._id==task._id) obj=e;
      });
      changeStatus(newStatus,obj,secondArr,"second array");
    } catch (error) {
      console.error('Error changing task status:', error);
    }
    fetchTasks();
  };
   

  let priorityClass = '';
  switch (task.priority) {
    case 'low':
      priorityClass = 'bg-success';
      break;
    case 'medium':
      priorityClass = 'bg-warning';
      break;
    case 'high':
      priorityClass = 'bg-danger';
      break;
    default:
      priorityClass = 'bg-secondary';
  }

  return (
    <div className="task-style">
      <div className="priority-and-update">
        <p className={`task-p task-p-prio ${priorityClass}`}>{task.priority}</p>
        <button
          className="update-existing-task"
          style={{ display: editButtonDisplay, border: "none" }}
          onClick={() => changeDisplay("flex")}
        >
          ...
        </button>
        <div className="task-edit-window" style={{ display: taskWindowDisplay }}>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => {
              changeDisplay("none");
              changeStatusListDisplay("none");
              updateCurrentTask(task, "second array");
              toggleEditTaskForm();
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              changeDisplay("none");
              changeStatusListDisplay("flex");
              changeButtonDisplay("none");
            }}
          >
            Update Status
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <div className="change-status-list" style={{ display: statusListDisplay }}>
          <select
            defaultValue="inprogress"
            className="text-light form-change"
            onChange={(event) => {
              handleStatusChange(event.target.value);
              changeStatusListDisplay("none");
              changeButtonDisplay("flex");
            }}
          >
            <option value="yettostart">Not Started</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <p className="task-p text-primary" style={{ fontWeight: "bolder" }}>{task.name}</p>
      <p className="task-p task-description text-secondary">{task.description}</p>
      <p className="task-p-last" style={{ marginTop: "-2%" }}><i className="fa fa-solid fa-hourglass text-warning"></i> {task.date}</p>
    </div>
  );
}

export default function TasksInProgress(props) {
  const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   props.fetchTasks();
  // }, []);

 

  props.updateCounter2(props.secondArr.length);

  return (
    <div className="taskList border border-3 border-warning" style={{ display: props.displayOnlyColumn2 }}>
      <h4 style={{ textAlign: "center" }}>In Progress (<b className="text-warning">{props.counter2}</b>)</h4>
      <hr className="bg-primary text-primary fs-1 fw-bold" />
      <div className="task">
        {props.secondArr.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            fetchTasks={props.fetchTasks}
            updateCurrentTask={props.updateCurrentTask}
            toggleEditTaskForm={props.toggleEditTaskForm}
            setSecondArr={props.setSecondArr}
            secondArr={props.secondArr}
            changeStatus={props.changeStatus}
          />
        ))}
      </div>
    </div>
  );
}
