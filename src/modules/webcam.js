
const DEFAULT_CONSTRAINTS = { audio: false, video: { width: 500, height: 500 } }

export function createWebcam(videoElement, constraints = DEFAULT_CONSTRAINTS) {

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
            videoElement.srcObject = mediaStream;
            videoElement.onloadedmetadata = function() {
                videoElement.play();
            };
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

}
