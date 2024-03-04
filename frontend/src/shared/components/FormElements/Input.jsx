import React, { useEffect, useState } from "react";

import "./FormStyle.css";

const Input = (props) => {
  const [value, setValue] = useState("");

  const element = {
    input: (
      <input
        type={props.type}
        id={props.id}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    ),

    description: (
      <textarea
        type={props.type}
        id={props.id}
        rows={5}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    ),

    file: (
      <input
        type={props.type}
        id={props.id}
        onChange={(e) => setValue(e.target.files[0])}
      />
    ),
  };

  useEffect(() => {
    props.onInput(props.id, value);
  }, [props.id, value]);

  return (
    <div className="input-elements">
      <label htmlFor={props.id}>{props.label}</label>
      {element[props.element]}
    </div>
  );
};

export default Input;
