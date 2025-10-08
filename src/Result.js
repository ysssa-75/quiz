import React from "react";
import Graph from "./Graph";

export default function Result({ score, total, history, onRestart, onNext }) {
  return (
    <div className="box">
      <h2>
        結果：{score}/{total}
      </h2>
      <button onClick={onNext} className="new">
        次の問題
      </button>
      <button onClick={onRestart} className="reset">
        もう1度
      </button>
      <div className="recharts">
        <Graph history={history} total={total} />
      </div>
    </div>
  );
}
