
export class Ml5FaceMesh {
    results: any[];
    faceMesh: any;
    videoElement: HTMLElement | null;

    constructor(videoElement: HTMLElement) {
        this.videoElement = videoElement || null;
        this.results = []
        this.faceMesh = this.init().then(() => {
            this.predict()
        });


    }

    private async init(): Promise<any> {
        // @ts-ignore
        this.faceMesh = await (ml5 as any).facemesh(this.videoElement);
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.results.length === 0) {
            return
        }
        for (let i = 0; i < this.results.length; i += 1) {
            const keypoints = this.results[i].scaledMesh;

            // Draw facial keypoints.
            for (let j = 0; j < keypoints.length; j += 1) {
                const [x, y] = keypoints[j];

                context.strokeStyle = 'green';
                context.beginPath();
                context.ellipse(x, y, 5, 5, Math.PI / 4, 0, 2 * Math.PI);
                context.stroke();

            }
        }
    }

    drawLineSilhouette(context: CanvasRenderingContext2D) {
        if (this.results.length === 0) {
            return
        }
        for (let i = 0; i < this.results.length; i += 1) {
            const keypoints = this.results[i].annotations.silhouette;

            // Draw facial keypoints.
            let firstX, firstY;
            for (let j = 0; j < keypoints.length; j += 1) {
                let [x, y] = keypoints[j];
                let [nextX, nextY] = keypoints[j + 1] || [0, 0];
                if (j === 0) {
                    firstX = x;
                    firstY = y
                }

                if (keypoints.length === j+1) {
                    nextX = firstX;
                    nextY = firstY
                }

                context.strokeStyle = 'green';
                context.beginPath();
                context.moveTo(x,  y)
                context.lineTo(nextX, nextY)
                // context.ellipse(x, y, 2, 2, Math.PI / 4, 0, 2 * Math.PI);
                context.stroke();

            }
        }
    }


    private predict() {

        if (!this.faceMesh) {
            return
        }
        // Listen to new 'predict' events
        // @ts-ignore
        this.faceMesh.on('predict', (results: any) => {
            this.results = results
        })


    }


}
