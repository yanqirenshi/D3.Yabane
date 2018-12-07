/* **************************************************************** *
 *   データを綺麗にする。
 * **************************************************************** */
class D3jsYabaneData {
    isWorkpackage (node) {
        return node._class=='WORKPACKAGE';
    }
    isScheduled (node) {
        return node.schedule.start && node.schedule.end;
    }
    isComleted (node) {
        return (node.result.end) ? true : false;
    }
    comparisonDate (type, a, b) {
        if (!a && !b) return null;
        if (a  && !b) return a;
        if (!a &&  b) return b;

        if (type=='start') return (a > b) ? b : a;
        if (type=='end')   return (a < b) ? b : a;

        throw new Error("type error");
    }
    comparisonSchecule (base, node) {
        return {
            start: this.comparisonDate('start', base.start, node.schedule.start),
            end:   this.comparisonDate('end',   base.end,   node.schedule.end)
        };
    }
    childrenSchedule (parent) {
        let children = parent.children;
        let out = {start: null, end: null };

        for (let child of children.list) {
            child._parent = parent;

            if (!this.isWorkpackage(child)) {
                let tmp = this.childrenSchedule(child);

                child.schedule.start = tmp.start;
                child.schedule.end   = tmp.end;
            }

            out = this.comparisonSchecule(out, child);
        }

        return out;
    }
    setSchedules (nodes) {

        for (let node of nodes.list) {

            if (this.isWorkpackage(node))
                continue;

            let schedule = this.childrenSchedule(node);
            if (!node.schedule)
                node.schedule = {start: null, end: null};

            node.schedule.start = schedule.start;
            node.schedule.end   = schedule.end;
        }

        return nodes;
    }
    cleaningWorkpackage (nodes) {
        let out = { ht: {}, list: [] };

        for (let node of nodes.list) {
            if (!this.isWorkpackage(node)) {
                node.children = this.cleaningWorkpackage(node.children);
                out.list.push(node);
            } else {
                // if (this.isScheduled(node) && !this.isComleted(node))
                //     out.list.push(node);
                out.list.push(node);
            }
        }
        return out;
    }
    cleaning (nodes) {
        let out = [];

        for (let node of nodes.list) {
            if (node.schedule.start && node.schedule.end)
                out.push(node);
            node.children = this.cleaning(node.children);
        }

        return out.sort((a,b) => {
            return (a.schedule.end > b.schedule.end) ? 1 : -1;
        });
    }
    setLevelChildren (children) {
        for (var i in children) {
            let child = children[i];
            child._level = child._parent._level + 1;

            this.setLevelChildren(child.children);
        }
    }
    setLevel (yabanes) {
        for (var i in yabanes) {
            let yabane = yabanes[i];
            yabane._level = 1;

            this.setLevelChildren(yabane.children);
        }
    }
    sorter (a,b) {
        return (a.end > b.end) ? -1 : 1;
    }
    sort (tree) {
        let tmp = tree.sort(this.sorter);

        for (var i in tmp)
            tmp[i].children = tmp[i].children.sort(this.sorter);

        return tmp;
    }
    normalize (tree) {
        let nodes = { ht: {}, list: [] };
        for (let node of tree) {
            nodes.ht[node._id] = node;
            nodes.list.push(node);
        }

        let x = this.cleaningWorkpackage(nodes);
        let yabanes = this.cleaning(this.setSchedules(x));

        this.setLevel(yabanes);

        return this.sort(yabanes);
    }
}

/* **************************************************************** *
 *   yabane のサイズとポジションを設定する。
 * **************************************************************** */
class D3jsYabaneDesigner {
    constructor (scale) {
        this._config = {
            yabane: {
                group: {
                    padding: {
                        other: 12,
                        top: 8,
                        bottom: 0,
                    },
                    font: {
                        size: 9,
                        margin: {
                            top: 1,
                            bottom: 1,
                        }
                    }
                },
                margin: 11,
                workpackage: {
                    h: 22
                }
            }
        };
        this._scale = scale;
    }
    config () {
        return this._config;
    }
    isWorkpackage (node) {
        return node._class=='WORKPACKAGE';
    }
    comparisonSize (a, b) {
        return (a < b) ? b : a;
    }
    setSizeAndLocation2Workpackage (nodes) {
        let config = this.config();
        let workpackage_h = config.yabane.workpackage.h;
        let scale = this._scale;

        for (let node of nodes) {
            if (this.isWorkpackage(node)) {
                let x1 = scale.x(node.schedule.start);
                let x2 = scale.x(node.schedule.end);
                node._w = x2 - x1;
                node._h = workpackage_h;
                node._x = x1;
                node._y = 0;
            } else {
                this.setSizeAndLocation2Workpackage(node.children);
            }
        }
    }
    setXandW2Wbs (nodes) {
        let config = this.config();
        let padding = config.yabane.group.padding;

        let x = { min:null, max:null};

        for (var i in nodes) {
            let node = nodes[i];

            let x1, x2;
            if (this.isWorkpackage(node)) {
                x1 = node._x;
                x2 = node._x + node._w;
            } else {
                let x_children = this.setXandW2Wbs(node.children);

                x1 = x_children.min - padding.other;
                x2 = x_children.max + padding.other;

                node._x = x1;
                node._w = x2 - x1;
            }

            if (!x.min || x.min > x1) x.min = x1;
            if (!x.max || x.max < x2) x.max = x2;
        }
        return x;
    }
    setH2Wbs (nodes) {
        let config = this.config();
        let padding = config.yabane.group.padding;
        let margin = config.yabane.margin;

        let h = 0;

        for (var i in nodes) {
            let node = nodes[i];

            if (!this.isWorkpackage(node)) {
                let h_children = this.setH2Wbs(node.children);
                node._h = h_children + (padding.top + padding.bottom);
            }

            h += node._h;
        }

        return h + ((nodes.length + 1) * margin);
    }
    setY2All (nodes, top) {
        let config = this.config();
        let padding = config.yabane.group.padding;
        let margin = config.yabane.margin;
        let config_font = config.yabane.group.font;

        // テキストエリアのサイズ
        let group_text_area_size =
            config_font.size +
            config_font.margin.top +
            config_font.margin.bottom;

        if (!top) top = 0;

        for (var i in nodes) {
            let node = nodes[i];

            node._y = top;

            // workpackage 以外の高さを設定する。
            //   高さは子供の高さから計算す
            if (!this.isWorkpackage(node))
                this.setY2All(node.children, top + padding.other + group_text_area_size);

            top += node._h + margin; // margin はヤバネとヤバネの間
        }
    }
    tailor (tree) {

        this.setSizeAndLocation2Workpackage(tree);
        this.setXandW2Wbs(tree);
        this.setH2Wbs(tree);
        this.setY2All(tree);

        return null;
    }
}

/* **************************************************************** *
 *   main class  TODO: ここを綺麗にしたい。
 * **************************************************************** */
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
    initConfig (selector, start, end) {
        return {
            scale: {
                x: {
                    tick: 88,
                    start: start,
                    end:   end
                }
            },
            stage: {
                selector: selector,
                padding: 11
            },
            header: {
                h: 20
            },
            yabane: {
                h:22,
                margin: 11,
                padding: 8,
                color: {},
                fill: {},
                stroke: {},
                font: {}
            }
        };
    }
    config (selector, start, end) {
        this._config = this.initConfig(selector, start, end);

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

        return this;
    }
    /* **************************************************************** *
     *   Data
     * **************************************************************** */
    getChildrenTerm(children) {
        let out = { start: null, end: null };

        for (var i in children) {
            let child = children[i];

            let child_term = (!child.children || child.children.length==0) ?
                { start: child.start, end: child.end } :
                this.getChildrenTerm(child.children);

            child.start = child_term.start;
            child.end   = child_term.end;

            if (!out.start && child.start) out.start = child.start;
            if (!out.end   && child.end)   out.end   = child.end;

            if ((out.start && child.start) && child.start < out.start) out.start = child.start;
            if ((out.end   && child.end)   && child.end   > out.end)     out.end = child.end;
        }
        return out;
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
    /* **************************************************************** *
     *   Positioning
     * **************************************************************** */
    sizingHeader () {
        return this;
    }
    /* **************************************************************** *
     *   Stage
     * **************************************************************** */
    makeStage (selector) {
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
    data (tree) {
        this._data = new D3jsYabaneData().normalize(tree);

        let tailor = new D3jsYabaneDesigner(this._scale);
        let data = tailor.tailor(this._data);

        return this;
    }
    flatten (data, list) {

        for (var i in list) {
            let yabane = list[i];

            if (data.max < yabane._level)
                data.max = yabane._level;

            data.list.push(yabane);

            if (yabane.children && yabane.children.length > 0)
                this.flatten(data, yabane.children);
        }

        data.list = data.list.filter((d) => {
            return (d._class!="PROJECT" && d.schedule.start && d.schedule.end) ? true : false;
        });

        return data;
    }
    findDataAtLevel (level, yabanes) {
        let out = [];

        for (var i in yabanes.list)
            if (yabanes.list[i]._level==level)
                out.push(yabanes.list[i]);

        return out ;
    }
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
                y2: 3333
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
    drawYabanePolygon (svg, targets) {
        let point = (x, y) => {
            return x + ', ' + y + ' ';
        };

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
                    let x1 = x;
                    let x2 = (x1+w-head);
                    let x3 = (x1+w);

                    x2 = x2<x1 ? x1 : x2;

                    return point(x1 , y)
                        + point(x2 , y)
                        + point(x3 , (y+(h/2)))
                        + point(x2 , (y+h))
                        + point(x1 , (y+h));
                }
            })
            .attr('fill', (d) => {
                if (d.children && d.children.length > 0)
                    return '#eebbcb';

                if (d.result.end)
                    return '#eeeeee';

                return '#aacf53';
            })
            .attr('fill-opacity', (d) => {
                if (d.children && d.children.length > 0)
                    return '0.1';
                return '1';
            })
            .attr('stroke', (d) => {
                if (d.children && d.children.length > 0)
                    return 'none';
                if (d.result.end)
                    return '#cccccc';

                return  '#a8bf93';
            })
            .attr('stroke-width', (d) => {
                if (d._level==1) return '2';
                return '1';
            });
    }
    drawYabaneText (svg, targets) {
        svg.select('g.yabane')
            .selectAll('text.yabane-label')
            .data(targets, (d) => { return d._id; })
            .enter()
            .append('text')
            .attr('class', 'yabane-label')
            .attr('x', (d) => { return d._x + 12; })
            .attr('y', (d) => { return d._y + 16 ; })
            .attr('fill', '#333333')
            .attr('font-size', (d) => {
                return 12;
            })
            .attr('font-weight', (d) => {
                if (d._class=='WBS')
                    return 'bold';
                else
                    return 'normal';
            })
            .text((d) => {
                if (d.children && d.children.length>0)
                    return d.label;
                else
                    return d.label +
                    ', Term:' +
                    moment(d.schedule.start).format('YYYY-MM-DD') + ' ⇒ ' +
                    moment(d.schedule.end).format('YYYY-MM-DD');
            });
    }
    drawYabane () {
        let svg = this._stage.svg;

        let yabanes = {
            max: 0,
            list: []
        };

        yabanes = this.flatten(yabanes, this._data);

        for (var i=1 ; i <= yabanes.max ; i++ ) {
            let targets = this.findDataAtLevel(i, yabanes);

            this.drawYabanePolygon(svg, targets);
            this.drawYabaneText(svg, targets);
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
    drawTodayLine () {
        let scale_x   = this._scale.x;
        let now = new Date();
        let data = [{
            _id: 88,
            x1: scale_x(now),
            y1: 0,
            x2: scale_x(now),
            y2: 2222
        }];

        let svg = this._stage.svg;
        let lines = svg
            .selectAll('line.now')
            .data(data, (d) => { return d._id; })
            .enter()
            .append('line')
            .attr('class', 'now')
            .attr('x1', (d) => { return d.x1; })
            .attr('y1', (d) => { return d.y1 + 22; })
            .attr('x2', (d) => { return d.x2; })
            .attr('y2', (d) => { return d.y2; })
            .attr('stroke-width', '2')
            .attr('stroke', '#e198b4');
    }
    draw () {
        this.sizingHeader();

        this.sizingStage();

        this.drawGroups()
            .drawGrid()
            .drawYabane()
            .drawHeader()
            .drawTodayLine();
    }
}
