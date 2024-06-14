import React from "react";
import "./form-input.styles.scss"

const FormInput = ({handleChange, label ,...otherProps})=>{
  const getLableClass = () =>  otherProps?.value?.length? 'shrink' : ''
  
  return (
    <div className ='group'>  
      <input className="form-input" onChange={handleChange} {...otherProps}/>
      { label && <label className= {`form-input-label ${getLableClass()}`} >{label}</label>}
    </div>
  )
}

export default FormInput;

