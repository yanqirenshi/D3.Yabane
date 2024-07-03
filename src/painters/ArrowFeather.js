export default class ArrowFeather {
    events () {
        return null; // overwrite してね
    }
    draw (place, data) {
        const draw = (targets)=> {
            targets
                .attr("points", (d)=> d.pointsString())
                .attr("fill","#ffffff")
                .attr("stroke-width", 4)
                .attr("stroke","#0e9aa7");
        };

        const selections =
              place.selectAll("polygon.yabane")
              .data(data, (d)=> d.id());

        // remove
        selections.exit().remove();

        // add
        draw(selections
             .enter()
             .append("polygon")
             .on("click", (e, d) => {
                 const events = this.events();

                 if (!events || !events.reaf || !events.reaf.click)
                     return null;

                 return events.reaf.click(d, e);
             })
             .attr('class', 'yabane')
             .attr('code', (d)=> d.id()));

        // update
        draw(selections);
    }
}
