import React from "react";
import Data from "../../data";
import Question from "../../question/Question";
import "./style.css";
import HomePage from "../homepage/HomePage";

export default function QuizPage(props) {
  const [questions, setQuestions] = React.useState(props.questions);
  const [score, setScore] = React.useState();
  const questionElements = questions.map((question) => {
    return (
      <Question
        showResult={score != null}
        key={question.question}
        question={question.question}
        setAnswer={setAnswer}
        selectedAnswer={question.selected}
        answers={question.answers}
        correctAnswer={question.correctAnswer}
      />
    );
  });
  function setAnswer(question, answer) {
    setQuestions((current) =>
      current.map((q) =>
        q.question === question ? { ...q, selected: answer } : q
      )
    );
  }
  function showResult() {
    if (!score) {
      setScore(
        questions.filter(
          (question) => question.selected === question.correctAnswer
        ).length
      );
      console.log(questions);
    } else {
      props.setCurrentPage(<HomePage setCurrentPage={props.setCurrentPage} />);
    }
  }
  return (
    <div className="quiz-page center flex column">
      {questionElements}
      {score != null && (
        <h1>
          Your score: {score}/{questions.length}
        </h1>
      )}
      <button className="selected" onClick={showResult}>
        {score != null ? "Try Again" : "Confirm"}
      </button>
    </div>
  );
}
