# FUKIDASHI
## Description
- Electronでjuliusを使ってみるサンプルを、自分で遊ぶ用にカスタマイズしたやつ。
  - 音声認識エンジン julius の GMM と DNN の比較と Electron からの操作方法 http://motok5.hatenablog.com/entry/2018/09/22/083226
  - @motok5 / voice-recognition-app-sample https://github.com/myonyomu/voice-recognition-app-sample
- 音声認識に必要なjuliusは、git clone後に各自で配置をお願いします。
  - https://julius.osdn.jp/index.php?q=dictation-kit.html

## Required
- Node.js
  - 13系。試してませんが10系以降なら大丈夫だと思います。
- Electron

## Usage
- juliusのzipをダウンロードし、解凍したフォルダの中身を/libs/dictation-kitというフォルダを作成して突っ込む。
  - https://julius.osdn.jp/index.php?q=dictation-kit.html
  - 公開ページにあるように、git-lfsを利用してじゃないと音声モデルキットが落とせないかもしれません。

  - スクリプト起動
  ```
  npm install
  npm run start
  ```

## etc
- Electronのパッケージ化は試してません。そもjuliusの使用規約として大丈夫か確かめてないのでやりません。