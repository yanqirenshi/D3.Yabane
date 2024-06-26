import ArrowFeather from './ArrowFeather.js';

export default class Rows {
    constructor (rectum) {
        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    drawLines (place, lines) {
        const draw = (targets)=> {
            targets
                .attr("x1", d=> d.x1)
                .attr("y1", d=> d.y1)
                .attr("x2", d=> d.x2)
                .attr("y2", d=> d.y2)
                .attr("stroke", d=> d.stroke)
                .attr("stroke-dasharray", d=> d.strokeDasharray);
        };

        const selections =
              place.selectAll("line.row")
              .data(lines, (d)=> d.id);


        // remove
        selections.exit().remove();

        // add
        draw(selections
             .enter()
             .append("line")
             .attr('class', 'row')
             .attr('code', (d)=> d.id));

        // update
        draw(selections);
    }
    draw (rows) {
        const rectum = this.rectum();

        const place = rectum.layer('background');

        this.drawLines(place, rows);
    }
}
