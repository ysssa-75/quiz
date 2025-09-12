import React, { useState,useEffect} from "react";
import "./style.css";
import ExpectedImg from './img/farily.png'

function App(){
  const [count, setCount] = useState(0);//問題番号
  const [quiz, setQuiz] = useState([]);//クイズのデータを記憶
  const [score, setScore] = useState(0);//スコアを数えるところ
  const [result, setResult] = useState(false);//もう問題がないか見るところ
  const [option, setOption] = useState(null);//ユーザーが選んだ番号の記憶
  const [feedback, setFeedback] = useState("");//正解・不正解のメッセージ
  const [err, setErr] = useState(null);//エラー
  const [loading, setLoading] = useState(true);//読み込み中かどうか
  const [history,setHistory] = useState([]);

  const newQuiz = () => {
    setLoading(true);
    fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjOhSds3tSqqRtlBT49YuTV0VDxvWxkf868ijojp0KtrIkY9XK1XWsydYzlNOZKk8Qpo2hOyNUMbIhRjy2FmaDMjAjdpeyJftQ1kFJDDgzdQ3THF_gIscfqPzecL0DYho1CD0hsArlwO5teqbTPnZS_6_bm8CW9KKjvdug6_XbVNxpUuCBAXlYZPEw2k4MgHih3xNbIcQGDkDVbtVDPI3FhgloL_a0b02X6hUjQMHgw8hRcCR2h3nYcN3tCpUqe4cnu_dGCPV1-d-0Ac-flCLkZ5IEHbBxVVFACpv3R&lib=MIn3grapnzMwpJxlaWfcYIrbnA_6pzS4l")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const shaffled = data.sort(() => Math.random() - 0.5);
      const select = shaffled.slice(0,5);
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
    .catch(err => {
      setErr(err)
      setLoading(false);
    });
    }
    useEffect(() =>{  
      setLoading(true);
      newQuiz();
    }, []);

    //答えを選んだ時
  const answer =  (Selected) =>{
    setOption(Selected);

    if(Selected ===  quiz[count].answer){
      setScore(score + 1);
      setFeedback("正解!👏");
    }else{
      setFeedback(`不正解..正解は${quiz[count].answer}です`);
    }
  }

  //次の問題へボタンを押した時
  const next = () => {
    const nextquiz = count + 1;
    setFeedback("");
    setOption(null);
      if(nextquiz < quiz.length){
        setCount(nextquiz);
      }else{
        setResult(true);
        
      }
    }
    const resetquiz = ()=>{
      setQuiz(history);
      setCount(0);
      setScore(0);
      setResult(false);
      setOption(null);
      setFeedback("");
      setErr(null);
      setLoading(false);
    }
    if (loading) {
      return <div>読み込み中...</div>;  
    }
    if(err){
      return <div>読み込みエラー: {err.message}</div>;
    }
    
  return(
    <div className="box"> 
      {result ? (
        <div className="botton">
        <h2>結果：{score}/{quiz.length}</h2>
          <button onClick={newQuiz}>次の問題</button>
          <button onClick={resetquiz}>もう1度</button> 
        </div>
        ) : (
        <>
          <h2>{quiz[count].question}</h2>
          {quiz[count].options.map((i) =>(
            <button className="button"
            key={i}
            onClick={() => answer(i)}
            disabled = {option !== null}>
              {i}
            </button>
            //disabled = ボタンを押したらボタンを無効化するための属性
          ))}
          {/* feedbackがtrueだったら */}

          {feedback && option != null &&(
            <div>
              
            <p>{feedback}</p>
            {quiz[count].answer === "妖精" &&  (
                <div className="farily">
                  <img
                    src={ExpectedImg}
                    alt="妖精の画像"
                    width="200"
                    style={{ marginTop: "10px" }}
                  />
                </div>
              )}
            <button onClick={next}>次の問題へ</button>
            </div>
          )}
        </>
        )
      }
    </div> 
  )
}
export default App;