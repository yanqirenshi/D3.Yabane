import ArrowFeather from './ArrowFeather.js';

export default class Timescale {
    constructor (rectum) {
        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    // drawText (place, reafs) {
    //     const selections =
    //           place.selectAll("text.branch_label")
    //           .data(reafs, (d)=> d.id());

    //     selections
    //         .enter()
    //         .append("text")
    //         .attr('class', 'branch_label')
    //         .attr('code', (d)=> d.id())
    //         .attr("x", d=> d.x() + 33)
    //         .attr("y", d=> d.y() + 33 + 10)
    //         .attr("font-size", 33)
    //         .text(d=> {
    //             return `[${d.id()}] ${d._core.name}`;
    //         });
    // }
    draw (timescale) {
        const rectum = this.rectum();

        const place = rectum.layer('background');

        const selections =
              place.selectAll("line.date")
              .data(timescale, (d)=> d.date);

        selections
            .enter()
            .append("line")
            .attr('class', 'date')
            .attr('code', (d)=> d.date)
            .attr("x1", d=> d.x)
            .attr("y1", d=> 0)
            .attr("x2", d=> d.x)
            .attr("y2", d=> 2555)
            .attr("stroke", d=> d.stroke)
            .attr("stroke-dasharray", d=> d.strokeDasharray);
    }
}
