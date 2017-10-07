/**
 * @args from, to, data-list
 */
function D3jsYabane(d3, selector, config) {
    this.d3 = d3;
    this.selector = selector;

    var tmp = {
        /* d3.js の scale を保持する。 y って必要か？自作か？ */
        scale: {
            x: null,
            y: null
        },
        lane: {
            h: 33,     /* h は一旦この値固定で */
            w: null,   /* こいつは無視されます。 自動計算されます。*/
            tick: 33,  /* これと日数を掛けて w を算出します */
            padding: 5
        },
        axis: {
            x: {
                cell: {
                    w: 33 /* これ使ってる？ */
                }
            }
        }
    };

    this.config = this.merge(tmp, config);
}

/*** ***************************** *
 *** UTIL 
 *** ***************************** */

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
D3jsYabane.prototype.makeScaleData = function (data) {
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

    var date = new Date(out.start);
    do {
        out.list.push(new Date(date));
        date.setDate(date.getDate() + 1);
    } while (date < out.end);

    return out;
};
D3jsYabane.prototype.buildAxis_x = function (start, end, x1, x2) {
    return this.d3.scaleTime()
        .domain([start, end])
        .range([x1, x2]);
};

/*** ***************************** *
 *** Size
 *** ***************************** */
// D3jsYabane.prototype.yabane_h = function () {};
// D3jsYabane.prototype.yabane_w = function () {};
// D3jsYabane.prototype.cell_h = function () {};
// D3jsYabane.prototype.cell_w = function () {};
// D3jsYabane.prototype.lane_h = function () {};
// D3jsYabane.prototype.lane_w = function () {};
D3jsYabane.prototype.svg_h = function () {};
D3jsYabane.prototype.svg_w = function () {

};

/*** ***************************** *
 *** Draw
 *** ***************************** */
D3jsYabane.prototype.draw = function (data) {
    var scale_data = this.makeScaleData(data);

    this.config.scale.x = this.buildAxis_x(scale_data.start, scale_data.end, 0, 999);

    this.d3.select("svg.chart-yabane")
        .attr('width', this.svg_w())
        .attr('height', (this.config.lane.h * (data.length + 1)));

    this.drawLane(data);
    this.drawLaneHeader(scale_data);
    this.drawLaneDateSpliter(scale_data);
    this.drawYabane(data);
};
D3jsYabane.prototype.drawLaneHeader = function (data) {
    var date_list = data.list;

    var scale = this.config.scale;
    var lane = this.config.lane;
    var me = this;
    this.d3.select("svg.chart-yabane")
        .selectAll("rect.lane-line-vertical")
        .data(date_list)
        .enter()
        .append("text")
        .attr('class','lane-header-text')
        .attr('x', function (d) {
            return scale.x(d) + 5;
        })
        .attr('y',function (d) {
            return 22;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d) {
            return lane.h - (lane.padding*2) - (3*2) - 5;
        })
        .attr("fill", "black")
        .text( function (d) {
            var dayOfWeek = d.getDay();
            var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek];

            return (d.getMonth() + 1) + '/' + d.getDate() + '(' + dayOfWeekStr + ')';
        });
};
D3jsYabane.prototype.drawLaneDateSpliter = function (data) {
    var date_list = data.list;

    var scale = this.config.scale;
    var lane = this.config.lane;
    var me = this;
    this.d3.select("svg.chart-yabane")
        .selectAll("rect.lane-line-vertical")
        .data(date_list)
        .enter()
        .append("line")
        .attr('class','lane-line-vertical')
        .attr('stroke-width', 1)
        .attr('stroke', '#000')
        .attr('x1', function (d, i) {
            return scale.x(d);
        })
        .attr('x2', function (d, i) {
            return scale.x(d);
        })
        .attr('y1', lane.h)
        .attr('y2', 1000)
};
D3jsYabane.prototype.drawLane = function (data) {
    var lane = this.config.lane;
    this.d3.select("svg.chart-yabane")
        .selectAll("rect.lane")
        .data(data)
        .enter()
        .append("rect")
        .attr('class','lane')
        .attr('width', 1000)
        .attr('height', lane.h)
        .attr('y', function (d,i){
            return (lane.h * i) + lane.h;
        })
        .attr('stroke', '#99ab4e')
        .attr('fill', '#fff')
        .attr('stroke-width', '2');
};
D3jsYabane.prototype.drawYabane = function (data) {
    var lane = this.config.lane;
    var scale = this.config.scale;
    var me = this;
    var yabane = this.d3.select("svg.chart-yabane")
                     .selectAll("polygon")
                     .data(data)
                     .enter();

    yabane.append("polygon")
          .attr("points", function (d, i) {
              var start = new Date(d.start);
              var end = new Date(d.end);
              var h = lane.h - (lane.padding*2);
              var w = scale.x(end) - scale.x(start);
              var x = scale.x(start);
              var y = (lane.h * i) + lane.h + lane.padding;
              var head = 10;
              return me.point(x          , y)
                   + me.point((x+w-head) , y)
                   + me.point((x+w)      , (y+(h/2)))
                   + me.point((x+w-head) , (y+h))
                   + me.point(x          , (y+h));
        })   // xy座標を複数指定
        .attr('stroke', '#006e54')  // 赤色にする
        .attr('fill', '#38b48b') // 塗りは黄色にする
        .attr('stroke-width', 1);    // 線幅を指定


    yabane.append("text")
        .attr("x", function(d) {
            return scale.x(d.start) + 11;
        })
        .attr("y", function(d, i) {
            return (lane.h * i) + lane.h + lane.padding + 20 - 3;
        })
        .text( function (d) {
            return '[' + d.code + '] ' + d.name;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d) {
            return lane.h - (lane.padding*2) - (3*2);
        })
        .attr("fill", "black");

};
