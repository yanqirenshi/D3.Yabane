class D3jsYabaneNew {
    constructor (config, scale) {
        this._config = config;
        this._scale = scale;
        this._data = [];
    }
    /* **************************************************************** *
     *   Scale
     * **************************************************************** */
    makeScaleX ( x1, x2, start, end) {
        return this.d3.scaleTime()
            .domain([start, end])
            .range([x1, x2]);
    }
    /* **************************************************************** *
     *   Data
     * **************************************************************** */
    setParent(datas, parent) {
        for (var i in datas) {
            let data = datas[i];

            if (parent) data._parent = parent;

            if (data.children && data.children.length>0)
                this.setParent(data.children, data);
        }
    }
    getChildrenTerm(children) {
        let out = { start: null, end: null };

        for (var i in children) {
            let child = children[i];

            let child_term = (!child.children || child.children.length==0) ?
                { start: child.start, end: child.end } :
                this.getChildrenTerm(child.children);

            if (!out.start || child.start < out.start) out.start = child.start;
            if (!out.end   || child.end   > out.end)     out.end = child.end;
        }

        return out;
    }
    setTerm(datas) {
        for (var i in datas) {
            let data = datas[i];

            if (!data.children || data.children.length==0)
                continue;

            let term = this.getChildrenTerm(data.children);
            data.start = term.start;
            data.end   = term.end;
        }
    }
    getTermMinMax (datas) {
        let out = { start: null, end: null };

        for (var i in datas) {
            let data = datas[i];
            if (!out.start || data.start < out.start) out.start = data.start;
            if (!out.end   || data.end   > out.end)     out.end = data.end;
        }

        return out;
    }
    data(data) {
        this._data = data;

        this.setParent(this._data);
        this.setTerm(this._data);

        let term_min_max = this.getTermMinMax(this._data);

        return this;
    }
    /* **************************************************************** *
     *   Sizing
     * **************************************************************** */
    sizingWhirlpoolYabaneH (children) {
        let config = this._config.yabane;

        for (var i in children)
            this.sizingYabane(children[i]);

        let margin = (children.length - 1) * config.margin;
        let h_sum = children
            .map((d) => { return d._h; })
            .reduce((a,b) => { return a + b; });

        return h_sum + margin + config.padding * 2;
    }
    sizingYabane (data) {
        let scale = this._scale;
        let config = this._config.yabane;

        data._h =  (!data.children || data.children.length==0) ?
            config.h : this.sizingWhirlpoolYabaneH(data.children);

        data._w = Math.ceil(scale.x(data.end) - scale.x(data.start));

        return data;
    }
    sizing () {
        let datas = this._data;

        for (var i in datas)
            this.sizingYabane(datas[i]);

        return this;
    }
    /* **************************************************************** *
     *   Positioning
     * **************************************************************** */
    positioningChildren (start_y, children) {
        let scale = this._scale;
        let config = this._config.yabane;
        let y = start_y + config.padding;

        for (var i in children) {
            let child = children[i];

            child._x = Math.ceil(scale.x(child.start));
            child._y = y;
            y = y + child._h + config.margin;
        }
    }
    positioning (start) {
        let scale = this._scale;
        let config = this._config.yabane;
        let datas = this._data;
        let y = start.y;

        for (var i in datas) {
            let data = datas[i];

            data._x = Math.ceil(scale.x(data.start));

            data._y = y;

            if (data.children)
                this.positioningChildren(data._y, data.children);

            y = data._h + config.margin;
        }
    }
    /* **************************************************************** *
     *   Positioning
     * **************************************************************** */
    drawProt (graph_data_new) {
        let svg = d3.select('svg.chart-yabane-tmp')
            .attr('height', () => { return window.innerHeight + 'px'; })
            .attr('width', () => { return window.innerWidth + 'px';});

        let g_datas = [
            { _id: -1, code: 'stage' },
            { _id: -2, code: 'grid' },
            { _id: -3, code: 'yabane' }
        ];
        for (var i in g_datas)
            svg.selectAll('g.'+ g_datas[i].code)
            .data([g_datas[i]], (d) => { return d._id; })
            .enter()
            .append('g')
            .attr('class', g_datas[i].code);

        let start = new Date('2018-01-01');
        let end   = new Date('2018-02-01');
        let day   = 1000 * 60 * 60 * 24;
        let tick  = 88;
        let stage = {
            _id: 10,
            code: 'stage',
            start: start,
            end: end,
            tick: tick,
            w: tick * ((end - start) / day),
            h: 333,
            x: 0,
            y: 0
        };

        svg.select('g.stage')
            .selectAll('rect.stage')
            .data([stage], (d) => { return d._id; })
            .enter()
            .append('rect')
            .attr('class', (d) => { return d.code; })
            .attr('x', (d) => { return d.x;})
            .attr('y', (d) => { return d.y;})
            .attr('width', (d) => { return d.w;})
            .attr('height', (d) => { return d.h;})
            .attr('rx', 3)
            .attr('ry', 3)
            .attr('fill', '#eeeeee');

        let yabanes = {
            max: 0,
            list: []
        };
        let flatten = (data, list, lev) => {
            if (!lev) lev = 1;
            if (data.max < lev) data.max = lev;

            for (var i in list) {
                let yabane = list[i];
                yabane._level = lev;

                data.list.push(yabane);

                if (yabane.children && yabane.children.length > 0)
                    flatten(data, yabane.children, lev + 1);
            }
        };

        flatten(yabanes, graph_data_new);
        let point = (x, y) => {
            return x + ', ' + y + ' ';
        };

        for (var i=1 ; i <= yabanes.max ; i++ ) {
            let targets = [];

            for (var j in yabanes.list)
                if (yabanes.list[j]._level==i)
                    targets.push(yabanes.list[j]);

            svg.select('g.yabane')
                .selectAll('polygon.yabane')
                .data(targets, (d) => { return d.code; })
                .enter()
                .append('polygon')
                .attr('class', 'yabane')
                .attr('code', (d) => { return d.code; })
                .attr("points", function (d, i) {
                    var start = d.start;
                    var end = d.end;
                    console.log([]);
                    var h = d._h;
                    var w = d._w;
                    var x = d._x;
                    var y = d._y;
                    var head = 10;
                    return point(x          , y)
                        + point((x+w-head) , y)
                        + point((x+w)      , (y+(h/2)))
                        + point((x+w-head) , (y+h))
                        + point(x          , (y+h));
                })
                .attr('fill', (d) => {
                    if (d._level==1) return '#9d5b8b';

                    return '#9e9e5c';
                })
                .attr('fill-opacity', (d) => {
                    if (d._level==1) return '1';
                    return '0.8';
                })
                .attr('stroke', (d) => {
                    if (d._level==1) return '#9d5b8b';
                    return '#9e9e5c';
                })
                .attr('stroke-width', (d) => {
                    if (d._level==1) return '2';
                    return '1';
                });
        }
    }
}
