import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const cachedQuestions = localStorage.getItem("triviaQuestions");

        if (cachedQuestions) {
          setQuestions(JSON.parse(cachedQuestions));
        } else {
          const response = await fetch(
            "https://opentdb.com/api.php?amount=20&category=18"
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setQuestions(data.results);
          localStorage.setItem("triviaQuestions", JSON.stringify(data.results));
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizDone(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsQuizDone(false);
  };

  if (isLoading) return <div>Loading questions...</div>;
  if (hasError) return <div>Sorry, there was an error loading the quiz.</div>;
  if (questions.length === 0) return <div>No questions available.</div>;

  return (
    <div>
      <h1 className="quiz-title">Computer Science Quiz</h1>
      {isQuizDone ? (
        <Results
          score={score}
          total={questions.length}
          restartQuiz={restartQuiz}
        />
      ) : (
        <Quiz
          question={questions[currentQuestion]}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default App;
