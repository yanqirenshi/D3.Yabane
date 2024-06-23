export default class ArrowFeather {
    // constructor () {}
    add (selections) {
        const added_selections =
              selections
              .enter()
              .append("polygon")
              .attr('class', 'yabane')
              .attr('code', (d)=> d.id());

        this.update(added_selections);
    }
    update (selections) {
        selections
            .attr("points", (d)=> d.pointsString())
            .attr("fill","#ffffff")
            .attr("stroke-width", 4)
            .attr("stroke","#0e9aa7");
    }
    remove (selections) {
    }
    draw (place, data) {
        const selections =
              place.selectAll("polygon.yabane")
              .data(data, (d)=> d.id());

        this.add(selections);
        this.update(selections);
        this.remove(selections);
    }
}
