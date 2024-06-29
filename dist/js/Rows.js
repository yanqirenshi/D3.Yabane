"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    key: "build",
    value: function build(style, branches) {
      var m_b = style.body ? style.body.row.margin / 2 : 0;
      return branches.map(function (branch) {
        return {
          id: branch.id(),
          x1: 0,
          y1: branch.y() + branch.h() + m_b,
          x2: style.stage.w + style.body.row.w + style.body.row.margin,
          y2: branch.y() + branch.h() + m_b,
          stroke: style.body.row.stroke.color // strokeDasharray: '10 10',

        };
      });
    }
  }]);

  return Rows;
}();

exports.default = Rows;