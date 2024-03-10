import React from "react";

export default function Answer(props) {
  let style = "";
  if (props.results) {
    if (props.answer == props.correctAnswer) {
      style = "correct";
    } else if (props.isSelected) {
      style = "wrong";
    }
  } else if (props.isSelected) {
    style = "selected";
  }
  return (
    <button onClick={props.setSelectedAnswer} className={style}>
      {props.answer}
    </button>
  );
}
