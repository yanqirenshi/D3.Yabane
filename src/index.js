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
    }

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

    scale.x = buildAxis_x(scale_data.start, scale_data.end, 0, 88);

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
    d3.select("svg.chart-yabane")
      .selectAll("polygon")
      .data(data)
      .enter()
      .append("polygon")
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
}

function point(x, y) {
    return x + ', ' + y + ' ';
}

function buildAxis_x (start, end, x1, x2) {
    return d3.scaleTime()
             .domain([start, end])
             .range([x1, x2]);
}
