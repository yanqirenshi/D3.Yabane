function D3jsYabane(d3, selector, config) {
    this.d3 = d3;
    this.selector = selector;

    var tmp = {
        scale: {
            x: null,
            y: null
        },
        lane: {
            h: 33,
            padding: 5
        },
        axis: {
            x: {
                cell: {
                    w: 33
                }
            }
        }
    };

    this.config = this.merge(tmp, config);
}

D3jsYabane.prototype.merge = function (state, newState) {
    return Object.assign( {}, state, newState);
};
D3jsYabane.prototype.point = function (x, y) {
    return x + ', ' + y + ' ';
};
/* Scale */
D3jsYabane.prototype.makeScaleData = function (data) {
    var out = {
        start: null,
        end: null
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

    return out;
};
D3jsYabane.prototype.buildAxis_x = function (start, end, x1, x2) {
    return this.d3.scaleTime()
        .domain([start, end])
        .range([x1, x2]);
};
/* Draw */
D3jsYabane.prototype.draw = function (data) {
    var scale_data = makeScaleData(data);

    scale.x = buildAxis_x(scale_data.start, scale_data.end, 0, 999);

    this.d3.select("svg.chart-yabane")
        .attr('width', 999)
        .attr('height', (lane.h * data.length));

    this.drawLane(data);
    this.drawYabane(data);
};
D3jsYabane.prototype.drawLaneHeader = function (data) {};
D3jsYabane.prototype.drawLaneDateSpliter = function (data) {};
D3jsYabane.prototype.drawLane = function (data) {
    this.d3.select("svg.chart-yabane")
      .selectAll("rect.lane")
      .data(data)
      .enter()
      .append("rect")
      .attr('class','lane')
      .attr('width', 1000)
      .attr('height', lane.h)
      .attr('y', function (d,i){
          return lane.h * i;
      })
      .attr('stroke', '#99ab4e')
      .attr('fill', '#fff')
      .attr('stroke-width', '2');
};
D3jsYabane.prototype.drawYabane = function (data) {
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
            var y = (lane.h * i) + lane.padding;
            var head = 10;
            return point(x          , y)
                + point((x+w-head) , y)
                + point((x+w)      , (y+(h/2)))
                + point((x+w-head) , (y+h))
                + point(x          , (y+h));
        })   // xy座標を複数指定
        .attr('stroke', '#006e54')  // 赤色にする
        .attr('fill', '#38b48b') // 塗りは黄色にする
        .attr('stroke-width', 1);    // 線幅を指定


    yabane.append("text")
        .attr("x", function(d) {
            return scale.x(d.start) + 11;
        })
        .attr("y", function(d, i) {
            return (lane.h * i) + lane.padding + 20 - 3;
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

var scale = {
    x: null,
    y: null
};

var lane = {
    h: 33,
    padding: 5
};

function makeScaleData (data) {
    var out = {
        start: null,
        end: null
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

    return out;
}

function start (data) {
    var scale_data = makeScaleData(data);

    scale.x = buildAxis_x(scale_data.start, scale_data.end, 0, 999);

    d3.select("svg.chart-yabane")
      .attr('width', 999)
      .attr('height', (lane.h * data.length));

    drawLane(data);
    drawYabane(data);
}

function drawLane(data) {
    d3.select("svg.chart-yabane")
      .selectAll("rect.lane")
      .data(data)
      .enter()
      .append("rect")
      .attr('class','lane')
      .attr('width', 1000)
      .attr('height', lane.h)
      .attr('y', function (d,i){
          return lane.h * i;
      })
      .attr('stroke', '#99ab4e')
      .attr('fill', '#fff')
      .attr('stroke-width', '2');
}

function drawYabane(data) {
    var yabane = d3.select("svg.chart-yabane")
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
            var y = (lane.h * i) + lane.padding;
            var head = 10;
            return point(x          , y)
                + point((x+w-head) , y)
                + point((x+w)      , (y+(h/2)))
                + point((x+w-head) , (y+h))
                + point(x          , (y+h));
        })   // xy座標を複数指定
        .attr('stroke', '#006e54')  // 赤色にする
        .attr('fill', '#38b48b') // 塗りは黄色にする
        .attr('stroke-width', 1)    // 線幅を指定


    yabane.append("text")
        .attr("x", function(d) {
            return scale.x(d.start) + 11;
        })
        .attr("y", function(d, i) {
            return (lane.h * i) + lane.padding + 20 - 3;
        })
        .text( function (d) {
            return '[' + d.code + '] ' + d.name;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d) {
            return lane.h - (lane.padding*2) - (3*2);
        })
        .attr("fill", "black");

}

function point(x, y) {
    return x + ', ' + y + ' ';
}

function buildAxis_x (start, end, x1, x2) {
    return d3.scaleTime()
             .domain([start, end])
             .range([x1, x2]);
}
