import React from "react";

const Input = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <input
        className="form-control"
        id={props.name}
        name={props.name}
        type={props.inputtype}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        {...props}
      />
    </div>
  );
};

export default Input;
