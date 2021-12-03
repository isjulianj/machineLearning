

import { Ml5FaceMesh } from "./modules/faceMesh";
import {  Ml5HandPose } from "./modules/handPose";
import { SetCanvas } from "./modules/setCanvas";
import { createWebcam } from "./modules/webcam";



document.addEventListener("DOMContentLoaded", function() {

    // create canvas
    const canvasWrapper = document.getElementById('canvasWrapper');
    const canvas = new SetCanvas('canvas', canvasWrapper, window.innerWidth, window.innerHeight);

    // create webcam
    const videoElement: HTMLElement | null = document.getElementById('video');
    const videoConstraints: any = { audio: false, video: { audio: false, video: { width: 500, height: 500 } }}

    createWebcam(videoElement, { audio: false, video: { width: window.innerWidth, height: window.innerHeight } })

    /// Add FaceMesh
    const faceMesh = new Ml5FaceMesh(videoElement);
    // const handPose = new Ml5HandPose(videoElement);


    // put video in canvas
    videoElement.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                canvas.context.clearRect(0, 0, canvas.width, canvas.height);
                canvas.context.drawImage($this, 0, 0);
                faceMesh.drawLineSilhouette(canvas.context)
                // handPose.draw(canvas.context)
                setTimeout(loop, 1000 / 30); // drawing at 30fps

            }
        })();


    })


})
