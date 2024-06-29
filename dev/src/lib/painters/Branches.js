import ArrowFeather from './ArrowFeather.js';

export default class Branches extends ArrowFeather {
    constructor (rectum) {
        super();

        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    drawBox (place, branches) {
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
    drawText (place, branches) {
        const draw = (targets)=> {
            targets
                .attr("x", d=> d.x() + 33)
                .attr("y", d=> d.y() + 33 + 10)
                .attr("font-size", 33)
                .text(d=> {
                    return d.name();
                });
        };

        const selections =
              place.selectAll("text.branch_label")
              .data(branches, (d)=> d.id());

        // remove
        selections.exit().remove();

        // add
        draw(selections
             .enter()
             .append("text")
             .attr('class', 'branch_label')
             .attr('code', (d)=> d.id()));

        // update
        draw(selections);
    }
    draw (branches) {
        const rectum = this.rectum();

        const place = rectum.layer('foreground');

        this.drawBox(place, branches);
        this.drawText(place, branches);
    }
}
