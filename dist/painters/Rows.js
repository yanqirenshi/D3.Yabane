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

var Rows = /*#__PURE__*/function () {
  function Rows(rectum) {
    _classCallCheck(this, Rows);

    this._rectum = rectum;
  }

  _createClass(Rows, [{
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

      var selections = place.selectAll("line.row").data(lines, function (d) {
        return d.id;
      }); // remove

      selections.exit().remove(); // add

      draw(selections.enter().append("line").attr('class', 'row').attr('code', function (d) {
        return d.id;
      })); // update

      draw(selections);
    }
  }, {
    key: "draw",
    value: function draw(rows) {
      var rectum = this.rectum();
      var place = rectum.layer('background');
      this.drawLines(place, rows);
    }
  }]);

  return Rows;
}();

exports.default = Rows;