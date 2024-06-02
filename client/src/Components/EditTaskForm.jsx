import React,{useState} from 'react'
import axios from 'axios';

export default function EditTaskForm(props) {
  const [copyObj, setCopyObj] = useState(JSON.parse(JSON.stringify(props.taskObj)));

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        const { name, description, date, priority, status } = props.taskObj;
        const response = await axios.get('http://localhost:5000/tasks', {
          params: { name, description, date, priority, status }
        });
        const task = response.data[0];
    
        if (task) {
          const putResponse = await axios.put(`http://localhost:5000/tasks/${task._id}`, props.taskObj);
          
          if (props.whichArrayToUpdate === "first array") props.searchAndUpdateFirstArray(task);
          else if (props.whichArrayToUpdate === "second array") props.searchAndUpdateSecondArray(task);
          else if (props.whichArrayToUpdate === "third array") props.searchAndUpdateThirdArray(task);
          
          props.toggleEditTaskForm();
          console.log('Task updated:', putResponse.data);
        } else {
          console.log('No task found matching the criteria');
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <button
        id="form-cancel-button"
        onClick={props.toggleEditTaskForm}
        style={{backgroundColor:"red",color:"white",fontWeight:"bolder",border:"none"}}
      >
        X
      </button>
      <div style={{ marginLeft: "3%", textAlign: "center" }}>
        <h2>Update Task</h2>

        <p style={{ fontWeight: "bold" }}>Task Name</p>
        <input
          id="taskNameInput"
          type="text"
          placeholder="eg.- Design a Website"
          style={{ width: "70%" }}
          onChange={(event) => (props.setTaskObj({...props.taskObj, name: event.target.value}))}
          value={props.taskObj.name}
        />

        <p style={{ fontWeight: "bold" }}>Description</p>
        <textarea
          id="taskDescriptionInput"
          type="text"
          placeholder="Description here"
          style={{ height: "30vh", width: "70%" }}
          onChange={(event) => (props.setTaskObj({...props.taskObj, description:event.target.value}))}
          value={props.taskObj.description}
        />

        <p style={{ fontWeight: "bold" }}>Set Deadline</p>
        <input
          id="taskDateInput"
          type="date"
          style={{ width: "70%", fontWeight: "bolder" }}
          onChange={(event) => (props.setTaskObj({...props.taskObj,date: event.target.value}))}
        />

        <p style={{ fontWeight: "bold" }}>Set Priority</p>
        <label
          style={{ display: "flex", justifyContent: "center", gap: "7px" }}
        >
          <input id="radioButtonLow" type="radio" name="Priority" 
           onChange={() => props.setTaskObj({...props.taskObj,priority: "low"})}
           checked={props.taskObj.priority === "low"}
          />
          low
          <input id="radioButtonMid" type="radio" name="Priority" 
           onChange={() => props.setTaskObj({...props.taskObj,priority: "medium"})}
           checked={props.taskObj.priority === "medium"}
          />
          medium
          <input id="radioButtonHigh" type="radio" name="Priority" 
           onChange={() => props.setTaskObj({...props.taskObj,priority: "high"})}
           checked={props.taskObj.priority === "high"}
          />
          high
        </label>

        <div>
          <button
            className="add-task-button"
          type="submit"
          >
            Update Task
          </button>
        </div>
      </div>
    </form>
  </div>
  )
}