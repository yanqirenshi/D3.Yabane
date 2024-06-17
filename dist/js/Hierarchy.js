"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 階層構造のデータです。
 * Data の 位置、サイズ を整えます。
 *
 * @example
 * let drawer = new Hierarchy();
 */
var Hierarchy = /*#__PURE__*/function () {
  function Hierarchy() {
    _classCallCheck(this, Hierarchy);
  }

  _createClass(Hierarchy, [{
    key: "data2rect",
    value: ///// ////////////////////////////////////////////////////////////////
    /////   Utilities
    ///// ////////////////////////////////////////////////////////////////
    function data2rect(data) {
      return {
        from: {
          x: data.position.x,
          y: data.position.y
        },
        to: {
          x: data.position.x + data._size.w,
          y: data.position.y + data._size.h
        }
      };
    }
  }, {
    key: "rect2size",
    value: function rect2size(rect) {
      return {
        w: rect.to.x - rect.from.x,
        h: rect.to.y - rect.from.y
      };
    } ///// ////////////////////////////////////////////////////////////////
    /////   Fitting
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "calChildrenSizeCore",
    value: function calChildrenSizeCore(rect_a, rect_b) {
      if (!rect_a.from) {
        rect_a.from = {
          x: rect_b.from.x,
          y: rect_b.from.y
        };
      } else {
        if (rect_a.from.x > rect_b.from.x) rect_a.from.x = rect_b.from.x;
        if (rect_a.from.y > rect_b.from.y) rect_a.from.y = rect_b.from.y;
      }

      if (!rect_a.to) {
        rect_a.to = {
          x: rect_b.to.x,
          y: rect_b.to.y
        };
      } else {
        if (rect_a.to.x < rect_b.to.x) rect_a.to.x = rect_b.to.x;
        if (rect_a.to.y < rect_b.to.y) rect_a.to.y = rect_b.to.y;
      }
    }
  }, {
    key: "calChildrenSize",
    value: function calChildrenSize(rect, child) {
      var rect_a = rect;
      var rect_b = this.data2rect(child);
      this.calChildrenSizeCore(rect_a, rect_b);
    }
  }, {
    key: "fitting",
    value: function fitting(data, parent) {
      // データのコピー
      data._size = _objectSpread({}, data.size);
      data._position = _objectSpread({}, data.position);

      if (parent) {
        var _padding = parent.padding || 0;

        data._position.x += parent._position.x + _padding;
        data._position.y += parent._position.y + _padding;
      }

      var children = data.children;
      if (!children || children.length === 0) return; // chldren のサイズ計算用

      var rect_children = {
        from: null,
        to: null
      }; // children のサイズを計算

      var _iterator = _createForOfIteratorHelper(children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          this.fitting(child, data);
          this.calChildrenSize(rect_children, child);
        } // 一応 from がマイナスになることも考えて補正

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (rect_children.from.x < 0) rect_children.to.x += rect_children.from.x * -1;
      if (rect_children.from.y < 0) rect_children.to.y += rect_children.from.y * -1; // 親のサイズに変換

      var rect = {
        from: {
          x: 0,
          y: 0
        },
        to: {
          x: rect_children.to.x,
          y: rect_children.to.y
        }
      }; // // padding をサイズに考慮

      var padding = data.padding;

      if (padding) {
        rect.from.x -= padding;
        rect.from.y -= padding;
        rect.to.x += padding;
        rect.to.y += padding;
      } // padding を考慮してズレていると思うのでノーマライズ


      rect.to.x -= rect.from.x;
      rect.to.y -= rect.from.y;
      rect.from.x = 0;
      rect.from.y = 0; // 最終サイズ

      var last_size = this.rect2size(rect);
      if (data._size.w < last_size.w) data._size.w = last_size.w;
      if (data._size.h < last_size.h) data._size.h = last_size.h;
    }
  }]);

  return Hierarchy;
}();

exports.default = Hierarchy;