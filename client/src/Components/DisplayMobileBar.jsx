import React, { useState } from "react";

export default function DisplayMobileBar(props) {
  const[firstbg,setFirstbg]=useState("");
  const[secondbg,setSecondbg]=useState("");
  const[thirdbg,setThirdbg]=useState("");
  return (
    <div>
      <div id="mobile-display-column-buttons">
        <button
          style={{color:props.allColumnsBg,border:`1px solid ${props.allColumnsBg}`}}
          onClick={()=>{
            props.letsDisplayAllColumns();
            props.colorAllButton("purple");
            setFirstbg("");
            setSecondbg("");
            setThirdbg("");
          }}
        >All({props.counter1+props.counter2+props.counter3})</button>
        <button
          style={{color:firstbg,border:`1px solid ${firstbg}`}}
          onClick={()=>{
            props.letsDisplayOnlyColumn1();
            props.colorAllButton("");
            setFirstbg("blue");
            setSecondbg("");
            setThirdbg("");
          }}
        >Tasks Not Started({props.counter1})</button>
        <button
          style={{color:secondbg,border:`1px solid ${secondbg}`}}
          onClick={()=>{
            props.letsDisplayOnlyColumn2();
            props.colorAllButton("");
            setFirstbg("");
            setSecondbg("darkorange");
            setThirdbg("");
          }}
        >Tasks In Progress({props.counter2})</button>
        <button
          style={{color:thirdbg,border:`1px solid ${thirdbg}`}}
          onClick={()=>{
            props.letsDisplayOnlyColumn3();
            props.colorAllButton("");
            setFirstbg("");
            setSecondbg("");
            setThirdbg("green");
          }}
        >Tasks Completed({props.counter3})</button>
      </div>
    </div>
  );
}
