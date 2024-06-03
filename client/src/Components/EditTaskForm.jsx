import React,{useState} from 'react'
import axios from 'axios';

export default function EditTaskForm(props) {
  const [copyObj, setCopyObj] = useState(JSON.parse(JSON.stringify(props.tasObj)));

  const handleSubmit = async (event) => {
    event.preventDefault();
      try{
          const putResponse = await axios.put(`http://localhost:5000/tasks/${copyObj._id}`, props.tasObj);
          
          if (props.whichArrayToUpdate === "first array") props.searchAndUpdateFirstArray(copyObj);
          else if (props.whichArrayToUpdate === "second array") props.searchAndUpdateSecondArray(copyObj);
          else if (props.whichArrayToUpdate === "third array") props.searchAndUpdateThirdArray(copyObj);
          
          props.toggleEditTaskForm();
          console.log('Task updated:', putResponse.data);
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
          onChange={(event) => (props.setTasObj({...props.tasObj, name: event.target.value}))}
          value={props.tasObj.name}
        />

        <p style={{ fontWeight: "bold" }}>Description</p>
        <textarea
          id="taskDescriptionInput"
          type="text"
          placeholder="Description here"
          style={{ height: "30vh", width: "70%" }}
          onChange={(event) => (props.setTasObj({...props.tasObj, description:event.target.value}))}
          value={props.tasObj.description}
        />

        <p style={{ fontWeight: "bold" }}>Set Deadline</p>
        <input
          id="taskDateInput"
          type="date"
          style={{ width: "70%", fontWeight: "bolder" }}
          onChange={(event) => (props.setTasObj({...props.tasObj,date: event.target.value}))}
        />

        <p style={{ fontWeight: "bold" }}>Set Priority</p>
        <label
          style={{ display: "flex", justifyContent: "center", gap: "7px" }}
        >
          <input id="radioButtonLow" type="radio" name="Priority" 
           onChange={() => props.setTasObj({...props.tasObj,priority: "low"})}
           checked={props.tasObj.priority === "low"}
          />
          low
          <input id="radioButtonMid" type="radio" name="Priority" 
           onChange={() => props.setTasObj({...props.tasObj,priority: "medium"})}
           checked={props.tasObj.priority === "medium"}
          />
          medium
          <input id="radioButtonHigh" type="radio" name="Priority" 
           onChange={() => props.setTasObj({...props.tasObj,priority: "high"})}
           checked={props.tasObj.priority === "high"}
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