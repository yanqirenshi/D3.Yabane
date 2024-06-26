import ArrowFeather from './ArrowFeather.js';

export default class Timescale {
    constructor (rectum) {
        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    drawLines (place, lines) {
        const selections =
              place.selectAll("line.date")
              .data(lines, (d)=> d.date);

        const draw = (s)=> {
            s
            .attr("x1", d=> d.x1)
            .attr("y1", d=> d.y1)
            .attr("x2", d=> d.x2)
            .attr("y2", d=> d.y2)
            .attr("stroke", d=> d.stroke)
            .attr("stroke-dasharray", d=> d.strokeDasharray);
        };

        // remove
        selections.exit().remove();

        // add
        draw(selections
             .enter()
             .append("line")
             .attr('class', 'date')
             .attr('code', (d)=> d.date));

        // update
        draw(selections);
    }
    draw (timescale) {
        const rectum = this.rectum();

        const place = rectum.layer('background');

        this.drawLines(place, timescale.lines);
    }
}
