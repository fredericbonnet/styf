const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const enableHandDetection = document.getElementById("enable-hand-detection");
const statusLabel = document.getElementById("status");
const videoPreview = document.getElementById("video-preview");
const enableVideoPreview = document.getElementById("enable-video-preview");

let isVideo = false;
let isVideoPreview = false;
let model = null;

// video.width = 500
// video.height = 400

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.7 // confidence threshold for predictions.
};

function startVideo() {
  askForPermissions();
  handTrack.startVideo(video).then(function(status) {
    console.log("video started", status);
    if (status) {
      statusLabel.innerText = "Video started. Now tracking";
      isVideo = true;
      runDetection();
    } else {
      statusLabel.innerText = "Please enable video capture";
    }
  });
}

function toggleVideo() {
  if (!isVideo) {
    statusLabel.innerText = "Starting video...";
    startVideo();
  } else {
    statusLabel.innerText = "Stopping video";
    handTrack.stopVideo(video);
    isVideo = false;
    statusLabel.innerText = "Video stopped";
  }
}

function toggleVideoPreview() {
  isVideoPreview = !isVideoPreview;

  videoPreview.style.display = isVideoPreview ? "" : "none";
}

enableHandDetection.addEventListener("change", function() {
  toggleVideo();
});

enableVideoPreview.addEventListener("change", function() {
  toggleVideoPreview();
});

function runDetection() {
  model.detect(video).then(predictions => {
    console.log("Predictions: ", predictions);
    detectHand(video, predictions);
    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

let canNotify = false;
function askForPermissions() {
  Notification.requestPermission(status => {
    canNotify = status === "granted";
  });
}

function detectHand(video, predictions) {
  const lowerThreshold = video.height * 0.7;
  for (let prediction of predictions) {
    const {
      bbox: [, y, height]
    } = prediction;
    if (y + height / 2 > lowerThreshold) {
      //   console.error("Stop Touching Your Face!");
      if (canNotify) {
        const notification = new Notification("Stop Touching Your Face!", {
          body: "Fight the COVID-19 !",
          tag: "styf"
        });
        setTimeout(() => notification.close(), 1000);
        break;
      }
    }
  }
}

// Load the model.
statusLabel.innerText = "Loading model...";
handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
  statusLabel.innerText = "Model loaded!";
  enableHandDetection.parentNode.MaterialSwitch.enable();
});
