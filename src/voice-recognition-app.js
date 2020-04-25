let juliusClient = null;
let juliusResultBuffer = "";

const commentStack = [];
let commentWait = 0;
let tickEventId = '';

window.addEventListener('DOMContentLoaded', onLoad);

const logger = {
  log(text) {
    if (window.appConfig.log) {
      const logSpaceEl = document.getElementById('logger-text');
      logSpaceEl.innerText = text;
    } else {
      console.log(text);
    }
  }
};

function onLoad() {
  setLogger();
  startRecognition();
};

function setLogger() {
  if(!window.appConfig.log) {
    $('.logger').remove();
  }
}

function startRecognition() {
  const { net } = window.libs;
  tickEventId = window.setInterval(() => {
    commentWait -= 200;
    if (0 < commentStack.length && commentWait <= 0) {
      const comment = commentStack.pop();
      commentWait = comment.length * 200;
      updateComment(comment);
      //speach(comment);
    }
  }, 200);

  setTimeout(function() {
    juliusClient = net.createConnection(10500, 'localhost', function() {
      $('#loader').fadeOut(300);
      logger.log('Fukidashi ready');
    });

    juliusClient.on('data', function(data) {
      juliusResultBuffer = juliusResultBuffer + data.toString();
      if (/[\s\S]\.[\s\S]$/.test(data.toString())) {
        if (/^<RECOGOUT>/.test(juliusResultBuffer)) {
          let regexp = /WHYPO WORD="([^"]*)\"/g
          let match;
          let recogwords = [];
          while ((match = regexp.exec(juliusResultBuffer))!== null) {
            recogwords.push(match[1]);
          }
          stackComment(recogwords.join(""))
        }
        juliusResultBuffer = "";
      }
    });
    
    juliusClient.on('end', function() {
      logger.log('disconnected.');
    });
  }, 3000);
}

function stackComment(comment) {
  const isPunctuationOnly = /^[、。]$/g.test(comment);
  if (isPunctuationOnly) {
    return;
  }

  commentStack.push(comment);
}

function updateComment(comment) {
  const { $ } = window.libs;
  const $message = $('#message');

  $message.fadeOut(150);
  window.setTimeout(() => {
    $message.text(comment);
    $message.fadeIn(150);
  }, 200);
}

function speach(comment) {
  var msg = new SpeechSynthesisUtterance();
  msg.volume = 0.65;
  msg.rate = 0.45;
  msg.pitch = 0.95;
  msg.text = comment;
  msg.lang = 'ja-JP';
  window.speechSynthesis.speak(msg);
}
