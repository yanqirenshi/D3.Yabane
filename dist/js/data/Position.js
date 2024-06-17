"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Position = /*#__PURE__*/function () {
  function Position() {
    _classCallCheck(this, Position);
  }

  _createClass(Position, [{
    key: "template",
    value: function template() {
      return {
        x: 0,
        y: 0,
        z: 0
      };
    }
  }, {
    key: "build",
    value: function build(data) {
      var out = this.template();
      if (!data) return out;
      if (data.x) out.x = data.x;
      if (data.y) out.y = data.y;
      if (data.z) out.z = data.z;
      return out;
    }
  }]);

  return Position;
}();

exports.default = Position;