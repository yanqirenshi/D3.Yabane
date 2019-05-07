/* **************************************************************** *
 *   データを綺麗にする。
 * **************************************************************** */
class D3jsYabaneData {
    /* **************************************************************** *
     *   Data
     * **************************************************************** */
    makePool (list)  {
        let pool = { ht: {}, list: [] };

        for (let obj of list) {
            if (!obj._id) {
                console.warn('Skip obj. _id is empty. ');
                console.warn(obj);
                continue;
            }

            pool.ht[obj._id] = obj;
            pool.list.push(obj);
        }

        return pool;
    }
    getTmepDataOfNode () {
        return {
            code: null,
            name: '',
            uri: '',
            schedule: {
                start: new Date(),
                end: new Date(),
            },
            result: {
                start: new Date(),
                end: new Date(),
            },
            children: { ht: {}, list: [] },
            _core: null,
            _id: null,
            _class: null,
            _parent: null,
            _level: 1,
        };
    }
    makeNodeDataChildren (data) {
        let children = data.children;

        if (!children)
            return [];

        if (Array.isArray(children))
            return this.makePool(children);

        return children;
    }
    makeNodeData (data, parent) {

        let node_data = this.getTmepDataOfNode();

        let val = (src, trg, key) => {
            if (!src[key]) return;

            trg[key] = src[key];
        };

        val(data, node_data, '_class');
        val(data, node_data, '_id');
        val(data, node_data, 'code');
        val(data, node_data, 'schedule');
        val(data, node_data, 'result');

        val(data, node_data, 'name');
        val(data, node_data, 'style');

        if (node_data.name=='')
            node_data.name = data.label;

        data.children = this.makeNodeDataChildren(data);

        let children = this.makePool(this.makeNodeDatas(data.children.list, node_data));

        node_data.children = children;
        node_data._core = data.core || data._core;

        if (parent) {
            node_data._parent = parent;
            node_data._level = parent._level + 1;
        }

        return node_data;
    }
    makeNodeDatas (tree, parent) {
        let out = tree.map((node) => {
            return this.makeNodeData(node, parent);
        });

        return out;
    }
    /* **************************************************************** *
     *   Config
     * **************************************************************** */
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

        for (let node of nodes) {
            if (!this.isWorkpackage(node)) {
                // node.children = this.cleaningWorkpackage(node.children.list);
                this.cleaningWorkpackage(node.children.list);
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

            this.cleaning(node.children);
        }

        return out.sort((a,b) => {
            return (a.schedule.end > b.schedule.end) ? 1 : -1;
        });
    }
    setLevelChildren (children) {
        for (let child of children.list) {
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
        return (a.schedule.end > b.schedule.end) ? -1 : 1;
    }
    sort (tree) {
        let tmp = tree.sort(this.sorter);

        for (var i in tmp)
            tmp[i].children.list = tmp[i].children.list.sort(this.sorter);

        return tmp;
    }
    normalize (tree) {
        let nodes = this.makeNodeDatas(tree);
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

        let calScale = (dt) => {
            if (dt) return scale.x(dt);
            return null;
        };

        for (let node of nodes.list) {
            if (this.isWorkpackage(node)) {
                let x1 = calScale(node.schedule.start);
                let x2 = calScale(node.schedule.end);

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
        let isNum = (v) => {
            if (v==0 || v) return true;
            return false;
        };

        for (let node of nodes.list) {
            let x_left, x_right;

            if (this.isWorkpackage(node)) {
                if (isNum(node._x) && isNum(node._w)) {
                    x_left  = node._x;
                    x_right = node._x + node._w;
                }
            } else {
                let x_children = this.setXandW2Wbs(node.children);

                x_left = x_children.min - padding.other;
                x_right = x_children.max + padding.other;

                node._x = x_left;
                node._w = x_right - x_left;
            }

            if (!x.min || x.min > x_left)  x.min = x_left;
            if (!x.max || x.max < x_right) x.max = x_right;
        }
        return x;
    }
    setH2Wbs (nodes) {
        let config = this.config();
        let padding = config.yabane.group.padding;
        let margin = config.yabane.margin;

        let h = 0;

        for (let node of nodes.list) {
            if (!this.isWorkpackage(node)) {
                let h_children = this.setH2Wbs(node.children);
                node._h = h_children + (padding.top + padding.bottom);
            }

            h += node._h;
        }

        return h + ((nodes.list.length + 1) * margin);
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

        for (var node of nodes.list) {
            node._y = top;

            // workpackage 以外の高さを設定する。
            //   高さは子供の高さから計算す
            if (!this.isWorkpackage(node))
                this.setY2All(node.children, top + padding.other + group_text_area_size);

            top += node._h + margin; // margin はヤバネとヤバネの間
        }
    }
    tailor (tree) {
        let targets = { list: tree };
        this.setSizeAndLocation2Workpackage(targets);
        this.setXandW2Wbs(targets);
        this.setH2Wbs(targets);
        this.setY2All(targets);

        return null;
    }
}

/* **************************************************************** *
 *   main class  TODO: ここを綺麗にしたい。
 * **************************************************************** */
class D3jsYabane {
    constructor (options) {
        this._config = null;
        this._scale = null;
        this._stage = { svg: null };
        this._data = [];
    }
    /* **************************************************************** *
     *   Config
     * **************************************************************** */
    makeConfigTemplate () {
        let now   = moment().millisecond(0).second(0).minute(0).hour(0);

        return {
            scale: {
                x: {
                    cycle: 'week',
                    tick: 88,
                    start: moment(now).add(-4, 'w'),
                    end:   moment(now).add(12, 'w'),
                }
            },
            stage: {
                selector: null,
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
    initConfig (options) {
        let new_config = this.makeConfigTemplate();

        new_config.scale.x = options.scale.x;
        new_config.stage.selector = options.stage.selector;

        return new_config;
    }
    config (options) {
        this._config = this.initConfig(options);

        this.setScale();

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
    fitDay(d, vector) {
        let out = moment(d);

        if (vector==-1)
            return out.startOf('day');

        return out.add(1,'day').startOf('day');
    }
    fitHour(d, vector) {
        let out = moment(d);

        if (vector==-1)
            return out.startOf('hour');

        return out.add(1,'hour').startOf('hour');
    }
    fittingStartEnd (config) {
        let cycle = config.x.cycle;

        let makeOutHt = (start, end) => {
            let w = end.diff(start, cycle);

            return { start: start, end: end, w: w };
        };

        if (cycle=='weeks')
            return makeOutHt(this.fitMonday(config.x.start, -1), this.fitMonday(config.x.end, 1));

        if (cycle=='days')
            return makeOutHt(this.fitDay(config.x.start, -1), this.fitDay(config.x.end, 1));

        if (cycle=='hours')
            return makeOutHt(this.fitHour(config.x.start, -1), this.fitHour(config.x.end, 1));

        throw new Error('対応していないサイクルです。 cycle = ' + cycle + '\n' +
                        '対応しているサイクル: weeks, days, hours');
    }
    setScale () {
        let config = this._config.scale;

        this._scale = {
            x: {}
        };

        let term  = this.fittingStartEnd(config);
        config.x._start = term.start;
        config.x._end   = term.end;
        config.x._w     = term.w * config.x.tick;

        this._scale.x = d3
            .scaleTime()
            .domain([config.x._start.toDate(), config.x._end.toDate()])
            .range([0, config.x._w]);

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

        // TODO: write zero case
        if (this._data.length==0)
            return this;

        // cal h
        let last_yabane = this._data[this._data.length - 1];
        stage._h = last_yabane._y + last_yabane._h + stage.padding * 4;

        // cal w
        let w = scale.x._w;

        // set size
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
        for (let yabane of list) {
            if (data.max < yabane._level)
                data.max = yabane._level;

            data.list.push(yabane);

            if (yabane.children && yabane.children.list.length > 0)
                this.flatten(data, yabane.children.list);
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
                y2: 33333
            });

            start.add('1', scale.x.cycle);
        }

        svg
            .select('g.grid')
            .selectAll('line.grid')
            .remove();

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
    drawYabanePolygonCore (d3objects) {
        let point = (x, y) => {
            return x + ', ' + y + ' ';
        };

        d3objects
            .attr('code', (d) => { return d._id; })
            .attr("points", function (d, i) {
                var start = d.schedule.start;
                var end = d.schedule.end;
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
                if (d.style && d.style.fill && d.style.fill.color)
                    return d.style.fill.color;

                if (d.children && d.children.length > 0)
                    return '#eebbcb';

                if (d.result.end)
                    return '#eeeeee';

                return '#aacf53';
            })
            .attr('fill-opacity', (d) => {
                if (d.style && d.style.fill && d.style.fill.opacity)
                    return d.style.fill.opacity;


                if (d.children && d.children.length > 0)
                    return '0.1';

                return '1';
            })
            .attr('stroke', (d) => {
                if (d.style && d.style.stroke && d.style.stroke.color)
                    return d.style.stroke.color;

                if (d.children && d.children.length > 0)
                    return 'none';

                if (d.result.end)
                    return '#cccccc';

                return  '#a8bf93';
            })
            .attr('stroke-width', (d) => {
                if (d.style && d.style.stroke && d.style.stroke.size)
                    return d.style.stroke.size;

                if (d._level==1) return '2';

                return '1';
            })
            .attr('start-time', (d) => {
                return moment(d.schedule.start).format('YYYY-MM-DD HH:mm:ss');
            })
            .attr('end-time', (d) => {
                return moment(d.schedule.end).format('YYYY-MM-DD HH:mm:ss');
            });
    }
    drawYabanePolygon (svg, targets) {
        this.drawYabanePolygonCore(
            svg.select('g.yabane')
                .selectAll('polygon.yabane')
                .data(targets, (d) => { return d._id; })
                .enter()
                .append('polygon')
                .attr('class', 'yabane'));
    }
    drawYabaneTextCore (d3objects) {
        let label_key = 'name';
        let term_fmt = 'HH:mm';

        d3objects
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
                if (d.children && d.children.list.length>0)
                    return d[label_key];
                else
                    return d[label_key] +
                    ', Term:' +
                    moment(d.schedule.start).format(term_fmt) + ' ⇒ ' +
                    moment(d.schedule.end).format(term_fmt);
            });
    }
    drawYabaneText (svg, targets) {
        this.drawYabaneTextCore(
            svg.select('g.yabane')
                .selectAll('text.yabane-label')
                .data(targets, (d) => { return d._id; })
                .enter()
                .append('text'));

        this.drawYabaneTextCore(
            svg.select('g.yabane')
                .selectAll('text.yabane-label')
                .data(targets, (d) => { return d._id; }));
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
        let scale = this._config.scale;

        let scale_x   = this._scale.x;
        let start     = scale.x._start;
        let end       = scale.x._end;
        let font_size = 12;
        let data      = [];

        let fmts = {
            months: 'YYYY-MM',
            weeks: 'YYYY-MM-DD',
            days: 'YYYY-MM-DD',
            hours: 'DD HH:mm',
        };
        let fmt = fmts[scale.x.cycle];

        while (start.isSameOrBefore(end)) {
            let x = scale_x(start.toDate());

            data.push({
                x:     x - (font_size/6),
                y:     font_size,
                label: start.format(fmt),
                font: {
                    size: font_size
                }
            });

            start.add('1', scale.x.cycle);
        }

        let svg = this._stage.svg;
        svg.select('g.header')
            .selectAll('text.date')
            .remove();

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
            y2: 22222
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
            .attr('stroke-width', '3')
            .attr('stroke', '#ea5506');
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
