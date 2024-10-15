import React from "react";
import he from "he";

const Quiz = ({ question, handleAnswer }) => {
  if (!question) return <div>...Loading...</div>;

  const {
    question: questionText,
    correct_answer,
    incorrect_answers,
  } = question;
  const answers = [...incorrect_answers, correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="quiz-container">
      <h2>{he.decode(questionText)}</h2>
      <div className="answers-btn">
        {answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
