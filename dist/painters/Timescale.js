"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ArrowFeather = _interopRequireDefault(require("./ArrowFeather.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Timescale = /*#__PURE__*/function () {
  function Timescale(rectum) {
    _classCallCheck(this, Timescale);

    this._rectum = rectum;
  }

  _createClass(Timescale, [{
    key: "rectum",
    value: function rectum() {
      return this._rectum;
    }
  }, {
    key: "drawLines",
    value: function drawLines(place, lines) {
      var draw = function draw(targets) {
        targets.attr("x1", function (d) {
          return d.x1;
        }).attr("y1", function (d) {
          return d.y1;
        }).attr("x2", function (d) {
          return d.x2;
        }).attr("y2", function (d) {
          return d.y2;
        }).attr("stroke", function (d) {
          return d.stroke;
        }).attr("stroke-dasharray", function (d) {
          return d.strokeDasharray;
        });
      };

      var selections = place.selectAll("line.date").data(lines, function (d) {
        return d.date;
      }); // remove

      selections.exit().remove(); // add

      draw(selections.enter().append("line").attr('class', 'date').attr('code', function (d) {
        return d.date;
      })); // update

      draw(selections);
    }
  }, {
    key: "drawLabels",
    value: function drawLabels(place, lines) {
      var draw = function draw(targets) {
        targets.attr("x", function (d) {
          return d.x;
        }).attr("y", function (d) {
          return d.y;
        }).attr("font-size", function (d) {
          return d.font.size;
        }).text(function (d) {
          return d.label;
        });
      };

      var selections = place.selectAll("text.timeline-month").data(lines, function (d) {
        return d.label;
      }); // remove

      selections.exit().remove(); // add

      draw(selections.enter().append("text").attr('class', 'timeline-month').attr('code', function (d) {
        return d.label;
      })); // update

      draw(selections);
    }
  }, {
    key: "draw",
    value: function draw(timescale) {
      var rectum = this.rectum();
      var place = rectum.layer('background');
      this.drawLines(place, timescale.lines);
      this.drawLabels(place, timescale.labels);
    }
  }]);

  return Timescale;
}();

exports.default = Timescale;