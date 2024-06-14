import React from "react";
import "./form-input.styles.scss"

const FormInput = ({handleChange, smallMargin, label ,...otherProps})=>{
  const getLableClass = () =>  otherProps?.value?.length? 'shrink' : ''
  const getSmallMarginCalss = () => smallMargin? 'smallMargin' : ''
  
  return (
    <div className= {`group ${getSmallMarginCalss()}`}>  
      <input className="form-input" onChange={handleChange} {...otherProps}/>
      { label && <label className= {`form-input-label ${getLableClass()}`} >{label}</label>}
    </div>
  )
}

export default FormInput;

