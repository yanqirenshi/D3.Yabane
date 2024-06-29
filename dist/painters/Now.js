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

var Now = /*#__PURE__*/function () {
  function Now(rectum) {
    _classCallCheck(this, Now);

    this._rectum = rectum;
  }

  _createClass(Now, [{
    key: "rectum",
    value: function rectum() {
      return this._rectum;
    }
  }, {
    key: "draw",
    value: function draw(now) {
      var rectum = this.rectum();
      var place = rectum.layer('foreground');

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
          return d.stroke.color;
        }).attr("stroke-width", function (d) {
          return d.stroke.width;
        });
      };

      var selections = place.selectAll("line.now").data([now], function (d) {
        return d.dt;
      }); // remove

      selections.exit().remove(); // add

      draw(selections.enter().append("line").attr('class', 'now').attr('code', function (d) {
        return d.date;
      })); // update

      draw(selections);
    }
  }]);

  return Now;
}();

exports.default = Now;