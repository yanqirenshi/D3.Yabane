/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
            y: null,
            start: null,
            end: null,
            dates: []
        },
        lane: {
            h: 33,     /* h は一旦この値固定で */
            w: null,   /* こいつは無視されます。 自動計算されます。*/
            tick: 88,  /* これと日数を掛けて w を算出します */
            padding: 5
        },
        data: []
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
    return (lane.h * i) + lane.h + lane.padding;
};
D3jsYabane.prototype.lane_h = function (data) {
    return this.config.lane.h * data.length;
};
D3jsYabane.prototype.lane_w = function (dates) {
    return this.config.lane.tick * dates.length;
};
D3jsYabane.prototype.svg_h = function (data) {
    var header_h = this.config.lane.h;
    return this.lane_h(data) + header_h;
};
D3jsYabane.prototype.svg_w = function (dates) {
    return this.config.lane.tick * dates.length;
};

/*** ***************************** *
 *** Draw
 *** ***************************** */
D3jsYabane.prototype.initConfig = function (data) {
    this.config.data = data;

    var scale_data = this.makeScaleData(data);
    this.config.scale.start = scale_data.start;
    this.config.scale.end = scale_data.end;
    this.config.scale.dates = scale_data.list;
};
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

    this.d3.select("svg.chart-yabane")
        .attr('width', this.svg_w(conf.scale.dates))
        .attr('height', this.svg_h(conf.data));

    this.drawLane(conf);
    this.drawLaneHeader(conf);
    this.drawLaneDateSpliter(conf);
    this.drawYabane(conf);
};
D3jsYabane.prototype.drawLaneHeader = function (conf) {
    var scale = conf.scale;
    var lane = conf.lane;
    var me = this;
    this.d3.select("svg.chart-yabane")
        .selectAll("rect.lane-line-vertical")
        .data(conf.scale.dates)
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
D3jsYabane.prototype.drawLaneDateSpliter = function (conf) {
    var scale = conf.scale;
    var lane = conf.lane;
    var me = this;
    this.d3.select("svg.chart-yabane")
        .selectAll("rect.lane-line-vertical")
        .data(conf.scale.dates)
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
        .attr('y2', 1000);
};
D3jsYabane.prototype.drawLane = function (conf) {
    var me = this;
    this.d3.select("svg.chart-yabane")
        .selectAll("rect.lane")
        .data(conf.data)
        .enter()
        .append("rect")
        .attr('class','lane')
        .attr('width', me.lane_w(conf.scale.dates))
        .attr('height', conf.lane.h)
        .attr('y', function (d,i){
            return (conf.lane.h * i) + conf.lane.h;
        })
        .attr('stroke', '#99ab4e')
        .attr('fill', '#fff')
        .attr('stroke-width', '2');
};
D3jsYabane.prototype.drawYabane = function (conf) {
    var lane = conf.lane;
    var scale = conf.scale;
    var me = this;
    var yabane = this.d3.select("svg.chart-yabane")
                     .selectAll("polygon")
                     .data(conf.data)
                     .enter();

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
        .attr('stroke', '#006e54')  // 赤色にする
        .attr('fill', '#38b48b') // 塗りは黄色にする
        .attr('stroke-width', 1);    // 線幅を指定


    yabane.append("text")
        .attr("x", function(d) {
            return me.yabane_x(d) + 11;
        })
        .attr("y", function(d, i) {
            return me.yabane_y(i) + 20 - 3;
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


/***/ })
/******/ ]);