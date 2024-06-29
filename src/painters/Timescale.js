import ArrowFeather from './ArrowFeather.js';

export default class Timescale {
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
              place.selectAll("line.date")
              .data(lines, (d)=> d.date);


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
    drawLabels (place, lines) {
        const draw = (targets)=> {
            targets
                .attr("x", d=> d.x)
                .attr("y", d=> d.y)
                .attr("font-size", d=> d.font.size)
                .text(d=> d.label);
        };

        const selections =
              place.selectAll("text.timeline-month")
              .data(lines, (d)=> d.label);

        // remove
        selections.exit().remove();

        // add
        draw(selections
             .enter()
             .append("text")
             .attr('class', 'timeline-month')
             .attr('code', (d)=> d.label));

        // update
        draw(selections);
    }
    draw (timescale) {
        const rectum = this.rectum();

        const place = rectum.layer('background');

        this.drawLines(place, timescale.lines);

        this.drawLabels(place, timescale.labels);
    }
}
