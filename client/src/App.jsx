import React from "react";
import HomePage from "./pages/homepage/HomePage";
import QuizPage from "./pages/quizpage/QuizPage";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState();
  React.useEffect(() => {
    setCurrentPage(<HomePage setCurrentPage={setCurrentPage} />);
  }, []);
  return <div className="app flex center column">{currentPage}</div>;
}
