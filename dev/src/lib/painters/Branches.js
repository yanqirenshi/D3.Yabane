import ArrowFeather from './ArrowFeather.js';

export default class Branches extends ArrowFeather {
    constructor (rectum) {
        super();

        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    draw (branches) {
        const rectum = this.rectum();

        const place = rectum.layer('foreground');

        const draw = (targets)=> {
            targets
            .attr("x", d=> d.x())
            .attr("y", d=> d.y())
            .attr("width",  d=> d.w())
            .attr("height", d=> d.h())
            .attr("fill","#fff")
            .attr("stroke-width",4)
            .attr("stroke","#0e9aa7");
        };

        const selections =
              place.selectAll("rect.branch")
              .data(branches, (d)=> d.id());

        // remove
        selections.exit().remove();

        // add
        draw(selections
             .enter()
             .append("rect")
             .attr('class', 'branch')
             .attr('code', (d)=> d.id()));

        // update
        draw(selections);
    }
}
