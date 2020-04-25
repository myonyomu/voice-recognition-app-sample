# FUKIDASHI
## Description
- Electronでjuliusを使ってみるサンプルを、自分で遊ぶ用にカスタマイズしたやつ。
  - 音声認識エンジン julius の GMM と DNN の比較と Electron からの操作方法 http://motok5.hatenablog.com/entry/2018/09/22/083226
  - @motok5 / voice-recognition-app-sample https://github.com/motok5/voice-recognition-app-sample
- 音声認識に必要なjuliusは、git clone後に各自で配置をお願いします。
  - https://julius.osdn.jp/index.php?q=dictation-kit.html

## Required
- Node.js
  - 13系。試してませんが10系以降なら大丈夫だと思います。
- Electron
- julius dictation kit
  - 4.5で起動確認。

## Usage
- julius dictation kitのzipをダウンロードし、解凍したフォルダの中身を/libs/dictation-kitというフォルダを作成して突っ込む。
  - https://julius.osdn.jp/index.php?q=dictation-kit.html
  - 公開ページにあるように、git-lfsを利用してじゃないと音声モデルキットが落とせないかもしれません。

  - スクリプト起動
  ```
  npm install
  npm run start
  ```

## etc
- Electronのパッケージ化は試してません。そもjuliusの使用規約として大丈夫か確かめてないのでやりません。
- DNNが不可能な環境の場合、使用するロジックをGMMに切り替えてみてください。

src/main.js
```
const amdnnConfPath = require.resolve('../libs/dictation-kit/am-dnn.jconf');
const dnnConfPath = require.resolve('../libs/dictation-kit/julius.dnnconf');
```

↓

```
const amgmmConfPath = require.resolve('../libs/dictation-kit/am-gmm.jconf');
const gmmConfPath = require.resolve('../libs/dictation-kit/julius.gmmconf');
```

src/main.js
```
  juliusProcess = proc.spawn(exePath, [
    '-C', mainConfPath,
    '-C', amdnnConfPath,
    '-demo',
    '-dnnconf', dnnConfPath,
    '-module'
  ], {
    detached: true
  });
```

↓

```
  juliusProcess = proc.spawn(exePath, [
    '-C', mainConfPath,
    '-C', amgmmConfPath,
    '-demo',
    '-gmmconf', gmmConfPath,
    '-module'
  ], {
    detached: true
  });
```