import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Graph({ history, total }) {
  const chartdata = history.map((q, index) => {
    // if (q.userAnswer === q.answer) {
    //   correct++;
    // }
    const answercount = history
      .slice(0, index + 1)
      .filter((h) => h.userAnswer === h.answer).length;
    const rate = (answercount / (index + 1)) * 100;
    return {
      round: index + 1,
      score: answercount,
      rate: rate,
    };
  });

  return (
    <LineChart
      width={500}
      height={350}
      data={chartdata}
      margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
    >
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" height={50} />
      <YAxis
        yAxisId="left"
        domain={[0, total]}
        label={{
          value: "スコア",
          angle: -90,
          position: "insideLeft",
          offset: 5,
          dy: 20,
        }}
      />
      <YAxis
        yAxisId="right"
        orientation="right"
        domain={[0, 100]}
        label={{
          value: "正解率",
          angle: -90,
          position: "insideRight",
          offset: -5,
          dy: -20,
        }}
      />
      <XAxis
        dataKey="round"
        label={{ value: "問題番号", position: "bottom", offset: 0 }}
      />
      <Tooltip />
      <Legend wrapperStyle={{ bottom: 40 }} />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="rate"
        stroke="#82ca9d"
        name="正答率 (%)"
      />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="score"
        stroke="#8884d8"
        name="スコア(問)"
      />
    </LineChart>
  );
}
