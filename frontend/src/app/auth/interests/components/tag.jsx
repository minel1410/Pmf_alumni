import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Tag(props) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    props.onTagClick(props.id); // Pozovi funkciju koja se proslijeđuje kroz propse da bi ažurirala interese
  };

  return (
    <div
      className={
        selected
          ? "px-3 py-1 border border-picton-blue-500 bg-picton-blue-500 text-white rounded-full hover:cursor-pointer transition-all"
          : "px-3 py-1 border border-picton-blue-500 text-picton-blue-500 rounded-full hover:shadow-2xl hover:cursor-pointer transition-all"
      }
      onClick={handleClick} // Postavi handleClick funkciju kao onClick handler
    >
      <p className="select-none">{props.text}</p>
    </div>
  );
}

export default Tag;
