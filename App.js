import React, { useState, useEffect } from "react";
import "./style.css";
import Quiz from "./Quiz";
import Result from "./Result";

function App() {
  const [admin, setAdmin] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [count, setCount] = useState(0);
  const [option, setOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [result, setResult] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  // 新しいクイズを取得
  const newQuiz = () => {
    setLoading(true);
    fetch(
      "https://script.google.com/macros/s/AKfycbzDx3dX-LSgcHNOVhQA_o9GfIo_X3RO3Kzdx_RUx3GJO9FwoVasY0hbutroDKr_YqeEnw/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.sort(() => Math.random() - 0.5);
        const select = shuffled.slice(0, 5);
        setQuiz(select);
        setCount(0);
        setScore(0);
        setResult(false);
        setOption(null);
        setFeedback("");
        setErr(null);
        setLoading(false);
        setHistory(select);
      })
      .catch((err) => {
        setErr(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (admin) {
      setIsStarted(false);
    }
  }, [admin]);

  // 回答処理
  const answer = (selected) => {
    setOption(selected);
    const newHistory = [...history];
    newHistory[count] = { ...newHistory[count], userAnswer: selected };
    setHistory(newHistory);

    if (selected === quiz[count].answer) {
      setScore(score + 1);
      setFeedback("正解!👏");
    } else {
      setFeedback(`不正解..正解は ${quiz[count].answer} です`);
    }
  };

  // 次の問題へ
  const next = () => {
    const nextQuiz = count + 1;
    setFeedback("");
    setOption(null);
    if (nextQuiz < quiz.length) {
      setCount(nextQuiz);
    } else {
      setResult(true);
    }
  };

  // リセット
  const resetQuiz = () => {
    setQuiz(history);
    setCount(0);
    setScore(0);
    setResult(false);
    setOption(null);
    setFeedback("");
    setErr(null);
    setLoading(false);
  };

  if (loading) return <div>読み込み中...</div>;
  if (err) return <div>読み込みエラー: {err.message}</div>;
  if (!isStarted)
    return (
      <div>
        <h1>問題</h1>
        <button
          className="start"
          onClick={() => {
            newQuiz();
            setIsStarted(true);
          }}
        >
          スタート
        </button>
      </div>
    );

  return (
    <div className="box">
      {result ? (
        <Result
          score={score}
          total={quiz.length}
          history={history}
          onRestart={resetQuiz}
          onNext={newQuiz}
        />
      ) : (
        <Quiz
          quiz={quiz}
          count={count}
          answer={answer}
          option={option}
          feedback={feedback}
          next={next}
        />
      )}
    </div>
  );
}

export default App;
