import React from "react";
import Answer from "./Answer";
import "./style.css";

export default function Question(props) {
  const answerElements = props.answers.map((answer) => (
    <Answer
      correctAnswer={props.correctAnswer}
      results={props.showResult}
      isSelected={props.selectedAnswer === answer}
      answer={answer}
      setSelectedAnswer={() => {
        props.setAnswer(props.question, answer);
      }}
      key={Math.random()}
    />
  ));
  return (
    <div className="question">
      <h1>{props.question}</h1>
      <div className="answers flex center">{answerElements}</div>
    </div>
  );
}
