class D3jsYabane {
    constructor () {
        this._config = null;
        this._scale = null;
        this._stage = { svg: null };
        this._data = [];
    }
    /* **************************************************************** *
     *   Config
     * **************************************************************** */
    config (config) {
        this._config = config;
        return this;
    }
    /* **************************************************************** *
     *   Scale
     * **************************************************************** */
    fitMonday(d, vector) {
        let out = moment(d);
        let week = out.day();

        let val;
        if (week==0)
            val = (vector==1) ? 1 : -6;
        else if (week==1)
            val = 0;
        else if (week>=1)
            val = (vector==1) ? 1 : -6;

        return out.add(val, 'd');
    }
    setScale () {
        let config = this._config.scale;

        this._scale = {
            x: {}
        };
        let start = this.fitMonday(config.x.start, -1);
        let end   = this.fitMonday(config.x.end,    1);

        let w = end.diff(start, 'weeks') * config.x.tick;

        config.x._start = start;
        config.x._end   = end;
        config.x._w      = w;

        this._scale.x = d3
            .scaleTime()
            .domain([start.toDate(), end.toDate()])
            .range([0, w]);
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
    setYabanes(data) {
        this._data = data;

        this.setParent(this._data);
        this.setTerm(this._data);

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

        let labe_area_h = 22;

        return h_sum + margin + config.padding * 2 + labe_area_h;
    }
    sizingYabane (data) {
        let scale = this._scale;
        let config = this._config.yabane;

        data._h =  (!data.children || data.children.length==0) ?
            config.h : this.sizingWhirlpoolYabaneH(data.children);

        data._w = Math.ceil(scale.x(data.end) - scale.x(data.start));

        return data;
    }
    sizingYabanes () {
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
    positioningYabanes () {
        let scale = this._scale;
        let config = this._config;
        let datas = this._data;
        let labe_area_h = 22;
        let y = config.stage.padding;

        for (var i in datas) {
            let data = datas[i];

            data._x = Math.ceil(scale.x(data.start));

            data._y = y;

            if (data.children)
                this.positioningChildren(data._y + labe_area_h, data.children);

            y = y + data._h + config.yabane.margin;
        }
        return this;
    }
    sizingHeader () {
        return this;
    }
    /* **************************************************************** *
     *   Stage
     * **************************************************************** */
    setStage () {
        let config = this._config.stage;

        this._stage.svg = d3.select(config.selector);

        return this;
    }
    sizingStage () {
        let stage = this._config.stage;
        let scale = this._config.scale;

        let last_yabane = this._data[this._data.length - 1];
        stage._h = last_yabane._y + last_yabane._h + stage.padding * 2;

        let w = scale.x._w;

        let svg = this._stage.svg;

        svg.attr('height', (d) => { return stage._h + 'px'; })
            .attr('width', () => { return w + 'px';});

        return this;
    }
    /* **************************************************************** *
     *   Data
     * **************************************************************** */
    data (data) {
        this._data = data;

        this.sizing();
        this.positioning();

        return this;
    }
    sizing () {}
    positioning () {}
    /* **************************************************************** *
     *   Draw
     * **************************************************************** */
    drawGroups () {
        let stage = this._stage;
        let svg = stage.svg;

        let header_h = this._config.header.h;

        let g_datas = [
            { _id: -1, code: 'stage',  location: { x:0, y:0 } },
            { _id: -2, code: 'grid',   location: { x:0, y:header_h } },
            { _id: -3, code: 'yabane', location: { x:0, y:header_h } },
            { _id: -4, code: 'header', location: { x:0, y:0 } }
        ];
        for (var i in g_datas)
            svg.selectAll('g.'+ g_datas[i].code)
            .data([g_datas[i]], (d) => { return d._id; })
            .enter()
            .append('g')
            .attr('class', g_datas[i].code)
            .attr("transform", (d) => {
                return "translate(" + d.location.x + "," + d.location.y + ")";
            });
        ;

        return this;
    }
    drawGrid () {
        let svg = this._stage.svg;
        let scale = this._config.scale;

        let scale_x = this._scale.x;
        let start   = moment(scale.x._start);
        let end     = moment(scale.x._end);
        let data    = [];

        while (start.isSameOrBefore(end)) {
            let x = scale_x(start.toDate());
            data.push({
                x1: x,
                y1: 0,
                x2: x,
                y2: 333
            });

            start.add('7', 'd');
        }

        let lines = svg
            .select('g.grid')
            .selectAll('line.grid')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'grid')
            .attr('x1', (d) => { return d.x1; })
            .attr('y1', (d) => { return d.y1; })
            .attr('x2', (d) => { return d.x2; })
            .attr('y2', (d) => { return d.y2; })
            .attr('stroke-width', '1')
            .attr('stroke', '#aaaaaa');

        return this;
    }
    drawYabane () {
        let svg = this._stage.svg;

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

        flatten(yabanes, this._data);

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
                    var h = d._h;
                    var w = d._w;
                    var x = d._x;
                    var y = d._y;
                    var head = 10;

                    if (d.children && d.children.length > 0) {
                        return point(x , y)
                            + point(x+w , y)
                            + point(x+w , (y+h))
                            + point(x  , (y+h));
                    } else {
                        return point(x          , y)
                            + point((x+w-head) , y)
                            + point((x+w)      , (y+(h/2)))
                            + point((x+w-head) , (y+h))
                            + point(x          , (y+h));
                    }
                })
                .attr('fill', (d) => {
                    return (d.children && d.children.length > 0) ? '#eebbcb' : '#aacf53';
                })
                .attr('fill-opacity', (d) => {
                    if (d.children && d.children.length > 0)
                        return '0.3';
                    return '1';
                })
                .attr('stroke', (d) => {
                    return (d.children && d.children.length > 0) ? 'none' : '#a8bf93';
                })
                .attr('stroke-width', (d) => {
                    if (d._level==1) return '2';
                    return '1';
                });

            svg.select('g.yabane')
                .selectAll('text.yabane-label')
                .data(targets, (d) => { return d.code; })
                .enter()
                .append('text')
                .attr('class', 'yabane-label')
                .attr('x', (d) => {
                    if (d.children && d.children.length > 0)
                        return d._x;
                    else
                        return d._x + 12;

                })
                .attr('y', (d) => {
                    if (d.children && d.children.length > 0)
                        return d._y + 19 ;
                    else
                        return d._y + 16 ;
                })
                .attr('fill', '#333333')
                .text((d) => {
                    return d.name + ', Term:' + moment(d.start).format('YYYY-MM-DD') + ' ⇒ ' + moment(d.end).format('YYYY-MM-DD');
                });


        }
        return this;
    }
    drawHeader () {
        let header  = this._config.header;
        let scale_config = this._config.scale;

        let scale_x   = this._scale.x;
        let start     = scale_config.x._start;
        let end       = scale_config.x._end;
        let font_size = 12;
        let data      = [];

        while (start.isSameOrBefore(end)) {
            let x = scale_x(start.toDate());

            data.push({
                x:     x - (font_size/6),
                y:     font_size,
                label: start.format('YYYY-MM-DD'),
                font: {
                    size: font_size
                }
            });
            start.add('7', 'd');
        }

        let svg = this._stage.svg;
        let lines = svg
            .select('g.header')
            .selectAll('text.date')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'date')
            .attr('x', (d) => { return d.x; })
            .attr('y', (d) => { return d.y; })
            .attr('font-size', (d) => { return d.font.size; })
            .text((d) => { return d.label; });

        return this;
    }
    draw (params) {
        this.setScale();

        this.setYabanes(this._data)
            .sizingYabanes()
            .positioningYabanes();

        this.sizingHeader();

        this.setStage()
            .sizingStage();

        this.drawGroups()
            .drawGrid()
            .drawYabane()
            .drawHeader();
    }
}
