class D3jsYabaneNew {
    constructor (config) {
        this._config = config;
        this._scale = {
            _x: { start: 0, end: 0},
            _start: null,
            _end: null,
            x: null
        };
        this._data = [];
    }
    /* **************************************************************** *
     *   Scale
     * **************************************************************** */
    makeScaleX ( x1, x2, start, end) {
        return d3.scaleTime()
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

        // make scale
        let term_min_max = this.getTermMinMax(this._data);
        let start = moment(term_min_max.start).add(-7, 'd').millisecond(0).second(0).minute(0).hour(0).toDate();
        let end   = moment(term_min_max.end).add(7, 'd').millisecond(0).second(0).minute(0).hour(0).toDate();
        let span  = (end - start) / (1000 * 60 * 60 * 24);
        let tick  = this._config.scale.x.tick;

        this._scale._x = { start: 0, end: span * tick };
        this._scale._start = start;
        this._scale._end   = end;

        this._scale = {
            x: this.makeScaleX(this._scale._x.start,
                               this._scale._x.end,
                               this._scale._start,
                               this._scale._end)
        };

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
        return this;
    }
    /* **************************************************************** *
     *   Stage
     * **************************************************************** */
    sizingStage (config) {
        let last_yabane = this._data[this._data.length - 1];

        let h = last_yabane._y + last_yabane._h + config.padding * 2;
        return this;
    }
    makeStage (svg_selector) {
        return this;
    }
    drawGrid () { return this; }
    drawYabane () { return this; }
}
