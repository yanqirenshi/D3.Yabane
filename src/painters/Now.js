import ArrowFeather from './ArrowFeather.js';

export default class Now {
    constructor (rectum) {
        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    draw (now) {
        const rectum = this.rectum();

        const place = rectum.layer('foreground');

        const draw = (targets)=> {
            targets
                .attr("x1", d=> d.x1)
                .attr("y1", d=> d.y1)
                .attr("x2", d=> d.x2)
                .attr("y2", d=> d.y2)
                .attr("stroke", d=> d.stroke.color)
                .attr("stroke-width", d=> d.stroke.width);
        };

        const selections =
              place.selectAll("line.now")
              .data([now], (d)=> d.dt);


        // remove
        selections.exit().remove();

        // add
        draw(selections
             .enter()
             .append("line")
             .attr('class', 'now')
             .attr('code', (d)=> d.date));

        // update
        draw(selections);
    }
}
