"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Font = /*#__PURE__*/function () {
  function Font() {
    _classCallCheck(this, Font);
  }

  _createClass(Font, [{
    key: "template",
    value: function template() {
      return {
        size: 16,
        color: '#fff',
        weight: 'normal'
      };
    }
  }, {
    key: "build",
    value: function build(data) {
      var out = this.template();
      if (!data) return out;
      if (data.size) out.size = data.size;
      if (data.color) out.color = data.color;
      if (data.weight) out.weight = data.weight;
      return out;
    }
  }]);

  return Font;
}();

exports.default = Font;