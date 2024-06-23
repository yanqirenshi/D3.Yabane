import ArrowFeather from './ArrowFeather.js';

export default class Branches extends ArrowFeather {
    constructor (rectum) {
        super();

        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    add (selections) {
        const added_selections =
              selections
              .enter()
              .append("rect")
              .attr('class', 'branch')
              .attr('code', (d)=> d.id());

        this.update(added_selections);
    }
    update (selections) {
        selections
            .attr("x", d=> d.x())
            .attr("y", d=> d.y())
            .attr("width",  d=> d.w())
            .attr("height", d=> d.h())
            .attr("fill","#fff")
            .attr("stroke-width",4)
            .attr("stroke","#0e9aa7");
    }
    remove (selections) {
    }
    draw (branches) {
        const rectum = this.rectum();

        const place = rectum.layer('foreground');

        const selections =
              place.selectAll("rect.branch")
              .data(branches, (d)=> d.id());

        this.add(selections);
        this.update(selections);
        this.remove(selections);
    }
}
