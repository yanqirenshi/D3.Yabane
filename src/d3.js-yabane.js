/**
 * @args from, to, data-list
 */
function D3jsYabane(d3, selector, config) {
    this.d3 = d3;
    this.selector = selector;

    var tmp = {
        /* d3.js の scale を保持する。 y って必要か？自作か？ */
        cycle: 'w',
        tick: 88,
        scale: {
            x: null,
            y: null,
            start: null,
            end: null,
            margin: {
                before: 2,
                after: 8
            },
            dates: []
        },
        header: {
            h: 33,
            padding: 5,
            font: {
                family: 'sans-serif',
                size: null,
                color: 'black'
            }
        },
        lane: {
            h: 33,
            w: null,   /* こいつは無視されます。 自動計算されます。*/
            padding: 5,
            fill: {
                color: '#fafafa'
            },
            stroke: {
                color: '#99ab4e',
                width: 1
            }
        },
        yabane: {
            color: {
                font: '#000',
                background: ''
            },
            fill: {
                color: '#aacf53',
                opacity: 0.88
            },
            stroke: {
                color: '#99ab4e',
                width: 1
            },
            font: {
                family: 'sans-serif',
                size: null
            }
        },
        data: []
    };

    tmp.scale = this.merge(tmp.scale, config.scale);
    tmp.lane = this.merge(tmp.lane, config.lane);

    tmp.cycle
        = this.checkLaneCycle(tmp.cycle);
    tmp.scale.margin
        = this.checkScaleMargin(tmp.scale.margin);

    this.config = this.merge({}, tmp);
}
D3jsYabane.prototype.checkLaneCycle = function (val) {
    var out = 'w';

    switch (val){
    case 'weekly': return 'w';
    case 'd': return 'd';
    case 'daily': return 'd';
    }

    return out;
};
D3jsYabane.prototype.checkScaleMargin = function (val) {
    return {
        before: this.chekNan(val.before, 2),
        after: this.chekNan(val.after, 8)
    };
};

/*** ***************************** *
 *** UTIL
 *** ***************************** */

D3jsYabane.prototype.chekNan = function (v, defval) {
    if (!v || isNaN(v))
        return defval ? defval : null;
    return v *1;
};


/**
 * merge
 */
D3jsYabane.prototype.merge = function (state, newState) {
    return Object.assign( {}, state, newState);
};
/**
 * point
 */
D3jsYabane.prototype.point = function (x, y) {
    return x + ', ' + y + ' ';
};

/*** ***************************** *
 *** Scale
 *** ***************************** */
D3jsYabane.prototype.initConfig = function (data) {
    this.config.data = data;

    var scale_data = this.makeScaleData(this.config, data);
    this.config.scale.start = scale_data.start;
    this.config.scale.end = scale_data.end;
    this.config.scale.dates = scale_data.list;
};
D3jsYabane.prototype.makeScaleData = function (config, data) {
    var out = {
        start: null,
        end: null,
        list: []
    };

    for (var i in data) {
        var d = data[i];
        var start = d.start;
        var end = d.end;

        if (out.start==null || out.start > d.start)
            out.start = start;

        if (out.end==null || out.end < end)
            out.end = end;
    }

    // start & end
    out.start = new Date(out.start);
    out.end = new Date(out.end);
    var tick_interval = (config.cycle=='w' ? 7 : 1);

    out.start = this.makeScaleDataFixDate('before', out.start, tick_interval, config.scale.margin.before);
    out.end = this.makeScaleDataFixDate('after', out.end, tick_interval, config.scale.margin.after);

    // datas
    if (config.cycle=='w') {
        // start
        var dayOfWeek = out.start.getDay();
        if (dayOfWeek==0)
            out.start.setDate(out.start.getDate() - 6);
        else
            out.start.setDate(out.start.getDate() - (dayOfWeek - 1));
        // end
        dayOfWeek = out.end.getDay();
        if (dayOfWeek==0)
            out.end.setDate(out.end.getDate() + 6);
        else
            out.end.setDate(out.end.getDate() + (dayOfWeek - 1));
    }

    var date = new Date(out.start);
    do {
        out.list.push(new Date(date));
        date.setDate(date.getDate() + tick_interval);
    } while (date < out.end);

    return out;
};
D3jsYabane.prototype.makeScaleDataFixDate = function (type, date,tick_interval,magin) {
    var vector = (type=='before' ? -1 : 1);
    date.setDate(date.getDate() + (tick_interval * magin * vector));
    return date;
};
D3jsYabane.prototype.buildAxis_x = function (start, end, x1, x2) {
    return this.d3.scaleTime()
        .domain([start, end])
        .range([x1, x2]);
};

/*** ***************************** *
 *** Size
 *** ***************************** */
D3jsYabane.prototype.yabane_h = function () {
    return this.config.lane.h - (this.config.lane.padding*2);
};
D3jsYabane.prototype.yabane_w = function (d) {
    return this.config.scale.x(d.end) - this.config.scale.x(d.start);
};
D3jsYabane.prototype.yabane_x = function (d) {
    return this.config.scale.x(d.start);
};
D3jsYabane.prototype.yabane_y = function (i) {
    var lane = this.config.lane;
    return (lane.h * i) + this.config.header.h + lane.padding;
};
D3jsYabane.prototype.lane_h = function (data) {
    return this.config.lane.h * data.length;
};
D3jsYabane.prototype.lane_w = function (dates) {
    return this.config.tick * dates.length;
};
D3jsYabane.prototype.svg_h = function (data) {
    return this.lane_h(data) + this.config.header.h;
};
D3jsYabane.prototype.svg_w = function (dates) {
    return this.config.tick * dates.length;
};

/*** ***************************** *
 *** Draw
 *** ***************************** */
D3jsYabane.prototype.draw = function (data) {
    this.initConfig(data);
    this.drawCore(this.merge({},this.config));
};
D3jsYabane.prototype.drawCore = function (conf) {
    var scale = this.config.scale;
    this.config.scale.x = this.buildAxis_x(conf.scale.start,
                                           conf.scale.end,
                                           0,
                                           this.svg_w(conf.scale.dates));

    this.d3.select(this.selector)
        .attr('width', this.svg_w(conf.scale.dates))
        .attr('height', this.svg_h(conf.data) + 5);

    this.drawLane(conf);
    this.drawLaneHeader(conf);
    this.drawLaneDateSpliter(conf);
    this.drawYabane(conf);
    this.drawLaneToday(conf);
};
D3jsYabane.prototype.drawLaneHeader = function (conf) {
    var scale = conf.scale;
    var lane = conf.lane;
    var me = this;
    this.d3.select(this.selector)
        .selectAll("rect.lane-line-vertical")
        .data(conf.scale.dates)
        .enter()
        .append("text")
        .attr('class','lane-header-text')
        .attr('x', function (d) {
            return scale.x(d) + conf.header.padding;
        })
        .attr('y',function (d) {
            return conf.header.h - (conf.header.padding * 2);
        })
        .attr("font-family", conf.header.font.family)
        .attr("font-size", function (d) {
            var size = conf.header.font.size;
            if (!size)
                return conf.header.h - (conf.header.padding*2) - (3*2) - 5;
            return size;
        })
        .attr("fill", conf.header.font.color)
        .text( function (d) {
            var dayOfWeek = d.getDay();
            var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek];

            return (d.getMonth() + 1) + '/' + d.getDate() + '(' + dayOfWeekStr + ')';
        });
};
D3jsYabane.prototype.drawLaneDateSpliter = function (conf) {
    var scale = conf.scale;
    var lane = conf.lane;
    var me = this;
    this.d3.select(this.selector)
        .selectAll("rect.lane-line-vertical")
        .data(conf.scale.dates)
        .enter()
        .append("line")
        .attr('class','lane-line-vertical')
        .attr('stroke-width', 1)
        .attr('stroke', '#99ab4e')
        .attr('stroke-dasharray', '3 3')
        .attr('x1', function (d, i) {
            return scale.x(d);
        })
        .attr('x2', function (d, i) {
            return scale.x(d);
        })
        .attr('y1', lane.h)
        .attr('y2', function () {
            return me.lane_h(conf.data) + lane.h;
        });
};
D3jsYabane.prototype.drawLaneToday = function (conf) {
    var me = this;
    var now = new Date();

    var scale = conf.scale;
    var lane = conf.lane;
    var me = this;
    this.d3.select(this.selector)
        .selectAll("rect.lane-line-vertical")
        .data(conf.scale.dates)
        .enter()
        .append("line")
        .attr('class','lane-line-vertical')
        .attr('stroke-width', 1)
        .attr('stroke', '#e198b4')
        .attr('x1', function (d, i) {
            return scale.x(now);
        })
        .attr('x2', function (d, i) {
            return scale.x(now);
        })
        .attr('y1', lane.h - 5)
        .attr('y2', function () {
            return me.lane_h(conf.data) + lane.h + 5;
        });
};
D3jsYabane.prototype.drawLane = function (conf) {
    var me = this;
    this.d3.select(this.selector)
        .selectAll("rect.lane")
        .data(conf.data)
        .enter()
        .append("rect")
        .attr('class','lane')
        .attr('width', me.lane_w(conf.scale.dates))
        .attr('height', conf.lane.h)
        .attr('y', function (d,i){
            return (conf.lane.h * i) + conf.header.h;
        })
        .attr('stroke', conf.lane.stroke.color)
        .attr('stroke-width', conf.lane.stroke.width)
        .attr('fill', conf.lane.fill.color);
};
D3jsYabane.prototype.drawYabane = function (conf) {
    var yabane = this.d3.select(this.selector)
                     .selectAll("polygon")
                     .data(conf.data)
                     .enter();

    this.drawYabaneBase(yabane, conf.yabane);
    this.drawYabaneText(yabane, conf.yabane, conf.lane);
};
D3jsYabane.prototype.drawYabaneBase = function (yabane, conf) {
    var me = this;
    yabane.append("polygon")
          .attr("points", function (d, i) {
              var start = new Date(d.start);
              var end = new Date(d.end);
              var h = me.yabane_h();
              var w = me.yabane_w(d);
              var x = me.yabane_x(d);
              var y = me.yabane_y(i);
              var head = 10;
              return me.point(x          , y)
                   + me.point((x+w-head) , y)
                   + me.point((x+w)      , (y+(h/2)))
                   + me.point((x+w-head) , (y+h))
                   + me.point(x          , (y+h));
        })   // xy座標を複数指定
        .attr('stroke', conf.stroke.color)
        .attr('stroke-width', conf.stroke.width)
        .attr('fill', conf.fill.color)
        .attr('fill-opacity', conf.fill.opacity);
};
D3jsYabane.prototype.drawYabaneText = function (yabane, conf, lane) {
    var me = this;

    var link = yabane.append("a");

    link
        .attr('href', function (d) {
            if (d.uri)
                return d.uri;
            return null;
        })
        .attr('target', function (d) {
            if (d.uri)
                return '_blank';
            return null;
        });

    link.append('text')
        .attr('x', function(d) {
            return me.yabane_x(d) + 11;
        })
        .attr('y', function(d, i) {
            return me.yabane_y(i) + 20 - 5;
        })
        .attr('font-family', conf.font.family)
        .attr('font-size', function (d) {
            if (!conf.font.size)
                return lane.h - (lane.padding*3) - (3*2);

            return conf.font.size;
        })
        .attr('fill', 'black')
        .text( function (d) {
            return '[' + d.code + ']';
        });

    yabane.append('text')
        .attr('x', function(d) {
            return me.yabane_x(d) + 11 + 30;
        })
        .attr('y', function(d, i) {
            return me.yabane_y(i) + 20 - 5;
        })
        .attr('font-family', conf.font.family)
        .attr('font-size', function (d) {
            if (!conf.font.size)
                return lane.h - (lane.padding*3) - (3*2);

            return conf.font.size;
        })
        .attr('fill', 'black')
        .text( function (d) {
            return d.name;
        });
};
