import ArrowFeather from './ArrowFeather.js';

export default class Reafs extends ArrowFeather {
    constructor (rectum) {
        super();

        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    drawText (place, reafs) {
        const selections =
              place.selectAll("text.branch_label")
              .data(reafs, (d)=> d.id());

        selections
            .enter()
            .append("text")
            .attr('class', 'branch_label')
            .attr('code', (d)=> d.id())
            .attr("x", d=> d.x() + 33)
            .attr("y", d=> d.y() + 33 + 10)
            .attr("font-size", 33)
            .text(d=> {
                return `[${d.id()}] ${d._core.name}`;
            });
    }
    draw (reafs) {
        const rectum = this.rectum();

        const place = rectum.layer('foreground');

        super.draw(place, reafs);

        this.drawText(place, reafs);
    }
}
