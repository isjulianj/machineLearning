interface ICanvas {
    canvasId: string;
    parentElement: HTMLElement | null;
    width: number;
    height: number
    context: CanvasRenderingContext2D | null;
}

export class SetCanvas implements ICanvas {
    canvasId: string;
    parentElement: HTMLElement | null;
    width: number;
    height: number;
    context: CanvasRenderingContext2D | null;


    constructor(canvasId: string, parentElement: HTMLElement, width: number, height: number) {
        this.canvasId = canvasId;
        this.parentElement = parentElement || null;
        this.width = width;
        this.height = height;
        this.context = null

        this.addCanvas()
    }

    private addCanvas(): void  {
        if (!this.parentElement) {
            return
        }
        const divWrapper = document.createElement('div');
        const canvasElem = document.createElement('canvas');
        this.parentElement.appendChild(divWrapper);
        divWrapper.appendChild(canvasElem);

        divWrapper.id = this.canvasId;
        canvasElem.width = this.width;
        canvasElem.height = this.height;

        this.context = canvasElem.getContext('2d');

        if (this.context) {
            this.context.fillStyle = 'rgba(0,0,255,1)';
            this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }


}


