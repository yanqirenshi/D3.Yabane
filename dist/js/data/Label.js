"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Font = _interopRequireDefault(require("./Font.js"));

var _Position = _interopRequireDefault(require("./Position.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Label = /*#__PURE__*/function () {
  function Label() {
    _classCallCheck(this, Label);

    this.font = new _Font.default();
    this.position = new _Position.default();
  }

  _createClass(Label, [{
    key: "template",
    value: function template() {
      return {
        text: '????????',
        position: {
          x: 0,
          y: 0
        },
        font: {
          size: 16,
          color: '#333333'
        }
      };
    }
  }, {
    key: "build",
    value: function build(data) {
      var out = this.template();
      if (!data) return out;
      if (data.text) out.text = data.text;
      if (data.position) out.position = this.position.build(data.position);
      if (data.font) out.font = this.font.build(data.font);
      return out;
    }
  }]);

  return Label;
}();

exports.default = Label;