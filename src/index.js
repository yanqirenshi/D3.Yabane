var scale = {
    x: null,
    y: null
};

var lane = {
    h: 33,
    padding: 5
};

function start (data) {
    var start = new Date(2000, 0, 1, 0);
    var end = new Date(2000, 0, 1, 31);
    console.log(start);
    scale.x = buildAxis_x(start, end, 0, 33);

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
