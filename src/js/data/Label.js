import Font from './Font.js';
import Position from './Position.js';

export default class Label {
    constructor () {
        this.font = new Font();
        this.position = new Position();
    }
    template () {
        return {
            text: '????????',
            position: { x: 0, y: 0 },
            font: { size: 16, color: '#333333' },
        };
    }
    build (data) {
        let out = this.template();

        if (!data)
            return out;

        if (data.text)
            out.text = data.text;

        if (data.position)
            out.position = this.position.build(data.position);

        if (data.font)
            out.font = this.font.build(data.font);

        return out;
    };
}
