
export class Ml5HandPose {
    results: any[];
    handPose: any;
    videoElement: HTMLElement | null;

    constructor(videoElement: HTMLElement) {
        this.videoElement = videoElement || null;
        this.results = []
        this.handPose = this.init().then(() => {
            this.predict()
        });


    }

    private async init(): Promise<any> {
        // @ts-ignore
        this.handPose = await (ml5 as any).handpose(this.videoElement);
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.results.length === 0) {
            return
        }
        for (let i = 0; i < this.results.length; i += 1) {
            // const keypoints = this.results[i].scaledMesh;
            const keypoints = this.results[i].landmarks;

            // Draw facial keypoints.
            for (let j = 0; j < keypoints.length; j += 1) {
                const [x, y] = keypoints[j];

                context.strokeStyle = 'green';
                context.beginPath();
                context.moveTo(x, y);
                context.ellipse(x, y, 10, 10, Math.PI / 4, 0, 2 * Math.PI);
                context.stroke();

            }
        }
    }

    private predict() {

        if (!this.handPose) {
            return
        }
        // Listen to new 'predict' events
        // @ts-ignore
        this.handPose.on('predict', (results: any) => {
            this.results = results
        })


    }


}
