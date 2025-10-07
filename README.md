# タイトル

クイズ　　
学校で受験する Web クリエイター能力認定試験の勉強対策アプリケーション

## 概要

- Google Apps Script で作成したから API から問題データを取得して表示

## 操作

- 選択肢クリックで正解判定
- ユーザーの回答に応じてスコアをリアルタイム集計
- 最後の問題終了時に結果画面を表示

## 主な技術

- JavaScript
- CSS/HTML
- HTML
- react
  <img src="https://img.shields.io/badge/-JavaScript-5f5f5f.svg?logo=javascript">
  <img src="https://img.shields.io/badge/-HTML-5f5f5f.svg?logo=html5">
  <img src="https://img.shields.io/badge/-CSS-5f5f5f.svg?logo=css">
  <img src="https://img.shields.io/badge/-React-5f5f5f.svg?logo=react">

## 内容物

```
quiz/
┣┳ public/
┃┗━ index.html
┣┳ src/      ...HTMLファイル、JavaScriptを読み込んでいる
┃┣━ App.js
┃┣━ Graph.js
┃┣━ index.js
┃┣━ Login.js
┃┣━ Quiz.js
┃┣━ Result.js
┃┗━ style.css
┣━ package-lock.json    ...依存関係のバージョンを固定
┣━ package.json         ...プロジェクトの依存関係やスクリプトを定義
┗━ README.md            ...プロジェクトの説明
```

## 主な機能

- Google Apps Script API から問題データを取得
- 問題文と選択肢を 1 問ずつ表示
- 回答クリックで正解判定し、スコアをリアルタイム集計
- 最後の問題終了時に結果画面を表示（スコア・正答数）

## 今後の展望

- 問題の一覧表示、追加、削除などを行う管理画面を追加したい
- 先生からのコメント機能
- ユーザーごとのスコア管理
- スプレッドシート連携でログイン・新規登録を可能にしたい
