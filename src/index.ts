
import {createWebcam} from "webcam";
import { Ml5FaceMesh} from "faceMesh";
import {SetCanvas} from "setCanvas";


document.addEventListener("DOMContentLoaded", function() {

    // create canvas
    const canvasWrapper = document.getElementById('canvasWrapper');
    const canvas = new SetCanvas('canvas', canvasWrapper, 500, 500);

    // create webcam
    const videoElement: HTMLElement | null = document.getElementById('video');
    createWebcam(videoElement)

    /// Add FaceMesh
    const faceMesh = new Ml5FaceMesh(videoElement);


    // put video in canvas
    videoElement.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                canvas.context.drawImage($this, 0, 0);
                faceMesh.draw(canvas.context)
                setTimeout(loop, 1000 / 30); // drawing at 30fps

            }
        })();


    })


})
