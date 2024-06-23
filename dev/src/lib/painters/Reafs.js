import ArrowFeather from './ArrowFeather.js';

export default class Reafs extends ArrowFeather {
    constructor (rectum) {
        super();

        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    draw (reafs) {
        const rectum = this.rectum();

        const place = rectum.layer('foreground');

        super.draw(place, reafs);
    }
}
