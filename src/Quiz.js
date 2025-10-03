import React, { useState } from "react";
import "./style.css";

export default function Quiz({ quiz, count, answer, option, feedback, next }) {
  return (
    <div className="quiz-container">
      <h2>{quiz[count].question}</h2>
      <h3>
        問題 {count + 1} / {quiz.length}
      </h3>
      {quiz[count].options.map((i) => (
        <button
          className="button"
          key={i}
          onClick={() => answer(i)}
          disabled={option !== null}
        >
          {i}
        </button>
      ))}
      {feedback && option !== null && (
        <div>
          <p>{feedback}</p>
          <button onClick={next}>次の問題へ</button>
        </div>
      )}
    </div>
  );
}
