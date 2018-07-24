class D3jsYabaneNew {
    makeScaleX ( x1, x2, start, end) {
        return this.d3.scaleTime()
            .domain([start, end])
            .range([x1, x2]);
    }
    /*
     * Sizing
     */
    datas2yabanes_core (parent, datas, config) {
        let out = [];
        for (var i in datas) {
            let data = data[i];
            let yaabne = new Yabane(data, config);

            yaabne._parent = parent;

            if (data.children)
                yaabne.children = this.datas2yabanes_core(yaabne, data.children, config);

            out.push(yaabne);
        }
    }
    datas2yabanes (datas, config) {
        return this.datas2yabanes_core(null, datas, config);
    }
    sizing (scale, datas) {
        let config = {
            yabane: {
                h:88,
                color: {},
                fill: {},
                stroke: {},
                font: {}
            }
        };
        let yabanes = this.datas2yabanes(datas, config.yabane);
        let scale = null;

        yabanes.map((y) => { return y.sizing(scale); });

        dump(yabanes);
    }
}
