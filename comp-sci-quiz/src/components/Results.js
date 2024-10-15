import React from "react";

const Results = ({ score, total }) => {
  return (
    <div className="results-container">
      <h2>Quiz Finished!</h2>
      <p>
        Your score is: {score} out of {total}
      </p>
      <button onClick={() => window.location.reload()}>Restart Quiz</button>
    </div>
  );
};

export default Results;
