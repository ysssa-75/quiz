import React, { useState } from "react";

function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const pass = "7573";
  const name = "admin";

  const login = () => {
    if (password === pass && user === name) {
      onLogin(true);
    } else {
      alert("ログインに失敗しました");
    }
  };

  return (
    <div>
      <h2>ログイン画面</h2>
      <div className="login">
        <input
          type="text"
          placeholder="ユーザー"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={login}>ログイン</button>
    </div>
  );
}

export default Login;
