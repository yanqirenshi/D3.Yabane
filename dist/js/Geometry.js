"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// https://yanqirenshi.github.io/D3.Sketch/dist/edge/Drawer.js

/**
 * 幾何学計算するための Drawer です。
 *
 * @example
 * let drawer = new DrawerHierarchy();
 */
var Geometry = /*#__PURE__*/function () {
  function Geometry() {
    _classCallCheck(this, Geometry);
  }

  _createClass(Geometry, [{
    key: "deg2rad",
    value: ///// ////////////////////////////////////////////////////////////////
    /////   Utilities
    ///// ////////////////////////////////////////////////////////////////
    function deg2rad(degree) {
      return degree * (Math.PI / 180);
    } ///// ////////////////////////////////////////////////////////////////
    /////   Cross Point of two lines
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "isCorss",
    value: function isCorss(A, B, C, D) {
      // 二つの線分の交差チェック
      // https://www.hiramine.com/programming/graphics/2d_segmentintersection.html
      var ACx = C.x - A.x;
      var ACy = C.y - A.y;
      var BUNBO = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
      if (BUNBO === 0) return false;
      var r = ((D.y - C.y) * ACx - (D.x - C.x) * ACy) / BUNBO;
      var s = ((B.y - A.y) * ACx - (B.x - A.x) * ACy) / BUNBO;
      return 0 <= r && r <= 1 && 0 <= s && s <= 1;
    } // 2直線の交点を求める。(具)

  }, {
    key: "getCrossPointCore",
    value: function getCrossPointCore(line, line_port) {
      var out = {
        x: 0,
        y: 0
      };
      var A = line.from;
      var B = line.to;
      var C = line_port.from;
      var D = line_port.to;
      var bunbo = (B.y - A.y) * (D.x - C.x) - (B.x - A.x) * (D.y - C.y);
      if (!this.isCorss(A, B, C, D)) return null; // 二つの線分の交点を算出する。
      // http://mf-atelier.sakura.ne.jp/mf-atelier/modules/tips/program/algorithm/a1.html

      var d1, d2;
      d1 = C.y * D.x - C.x * D.y;
      d2 = A.y * B.x - A.x * B.y;
      out.x = (d1 * (B.x - A.x) - d2 * (D.x - C.x)) / bunbo;
      out.y = (d1 * (B.y - A.y) - d2 * (D.y - C.y)) / bunbo;
      return out;
    } // 2直線の交点を求める。

  }, {
    key: "getCrossPoint",
    value: function getCrossPoint(lines, line_port) {
      var _iterator = _createForOfIteratorHelper(lines),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          var point = this.getCrossPointCore(line, line_port);
          if (point) return point;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return null;
    }
  }]);

  return Geometry;
}();

exports.default = Geometry;