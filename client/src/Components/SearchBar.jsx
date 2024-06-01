import React from "react";

export default function SearchBar({toggleTaskForm}) {
 
  return (
    <>
    <div>
      <div 
       id="search-and-add"
       style={{ display: "flex", justifyContent: "space-between" , marginLeft:"10%", marginRight:"10%", marginTop:"1%"}}>
        <div>
          <input
            id="search"
            type="text"
            placeholder="  &#x1F50D;  search for tasks"
            style={{
              
            }}
          />
        </div>
        <button
          id="add-new-task-button"
          onClick={toggleTaskForm}
        >
          <i className="fa fa-solid fa-plus fa-0.5x"></i> Add New Task
        </button>
      </div>
    </div>
    </>
  );
}