"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ArrowFeather = /*#__PURE__*/function () {
  function ArrowFeather() {
    _classCallCheck(this, ArrowFeather);
  }

  _createClass(ArrowFeather, [{
    key: "draw",
    value: function draw(place, data) {
      var draw = function draw(targets) {
        targets.attr("points", function (d) {
          return d.pointsString();
        }).attr("fill", "#ffffff").attr("stroke-width", 4).attr("stroke", "#0e9aa7");
      };

      var selections = place.selectAll("polygon.yabane").data(data, function (d) {
        return d.id();
      }); // remove

      selections.exit().remove(); // add

      draw(selections.enter().append("polygon").attr('class', 'yabane').attr('code', function (d) {
        return d.id();
      })); // update

      draw(selections);
    }
  }]);

  return ArrowFeather;
}();

exports.default = ArrowFeather;