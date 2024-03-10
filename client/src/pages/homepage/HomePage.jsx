import React from "react";
import "./style.css";
import QuizPage from "../quizpage/QuizPage";

export default function HomePage(props) {
  function send() {
    const file = document.querySelector("#file");
    const btn = document.querySelector("#send");
    btn.textContent = "Please Wait";
    btn.style.background = "gray";
    const data = new FormData();
    data.append("pdfFile", file.files[0]);
    console.log(file.files[0]);
    fetch("http://localhost:5000/test", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        props.setCurrentPage(<QuizPage questions={JSON.parse(data)} setCurrentPage={props.setCurrentPage}/>);
      });
  }
  return (
    <div className="home-page flex column">
      <h1>Please provide a pdf</h1>
      <input type="file" name="" id="file" accept="application/pdf" />
      <button onClick={send} id="send">
        Okay
      </button>
    </div>
  );
}
