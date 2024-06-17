"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Background", {
  enumerable: true,
  get: function get() {
    return _Background.default;
  }
});
Object.defineProperty(exports, "Camera", {
  enumerable: true,
  get: function get() {
    return _d.Camera;
  }
});
Object.defineProperty(exports, "Font", {
  enumerable: true,
  get: function get() {
    return _Font.default;
  }
});
Object.defineProperty(exports, "Geometry", {
  enumerable: true,
  get: function get() {
    return _Geometry.default;
  }
});
Object.defineProperty(exports, "Hierarchy", {
  enumerable: true,
  get: function get() {
    return _Hierarchy.default;
  }
});
Object.defineProperty(exports, "Label", {
  enumerable: true,
  get: function get() {
    return _Label.default;
  }
});
Object.defineProperty(exports, "Padding", {
  enumerable: true,
  get: function get() {
    return _Padding.default;
  }
});
Object.defineProperty(exports, "Position", {
  enumerable: true,
  get: function get() {
    return _Position.default;
  }
});
Object.defineProperty(exports, "Rectangle", {
  enumerable: true,
  get: function get() {
    return _Rectangle.default;
  }
});
Object.defineProperty(exports, "Stroke", {
  enumerable: true,
  get: function get() {
    return _Stroke.default;
  }
});
exports.default = void 0;

var _d = _interopRequireWildcard(require("@yanqirenshi/d3.svg"));

var _Background = _interopRequireDefault(require("./data/Background.js"));

var _Font = _interopRequireDefault(require("./data/Font.js"));

var _Position = _interopRequireDefault(require("./data/Position.js"));

var _Rectangle = _interopRequireDefault(require("./data/Rectangle.js"));

var _Stroke = _interopRequireDefault(require("./data/Stroke.js"));

var _Label = _interopRequireDefault(require("./data/Label.js"));

var _Padding = _interopRequireDefault(require("./data/Padding.js"));

var _Hierarchy = _interopRequireDefault(require("./Hierarchy.js"));

var _Geometry = _interopRequireDefault(require("./Geometry.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Colon = /*#__PURE__*/function () {
  /** ****************************************************************
   *  params:
   *    selector  ???
   *    camera    ???
   * **************************************************************** */
  function Colon() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Colon);

    var layers = params.layers;
    var transform = params.transform;
    this._d3svg = new _d.default({
      layers: layers || [{
        id: 1,
        code: 'background'
      }, {
        id: 2,
        code: 'foreground'
      }],
      transform: transform || {
        k: 1.0,
        x: 0.0,
        y: 0.0
      }
    });
    this._grid = params.grid || {
      draw: true,
      size: 10000,
      span: 100
    };
    this._svg = params.svg || {
      style: {
        background: "#ffffff"
      }
    };
    this._data = null;
    this._first_draw = null;
    if (params.camera) this.camera(params.camera);
  }
  /** ***************************************************************
   *  svg
   * **************************************************************** */


  _createClass(Colon, [{
    key: "svg",
    value: function svg() {
      return this._svg;
    }
    /** ***************************************************************
     *  Wrapper
     * **************************************************************** */

  }, {
    key: "selector",
    value: function selector(v) {
      if (!this._d3svg) return;
      this.selector_setBefore();

      this._d3svg.selector(v, false);

      this.selector_setAfter();
      this.drawGrids();
      if (this._first_draw === null) this.draw();
    }
  }, {
    key: "selector_setBefore",
    value: function selector_setBefore() {
      /* Aspect method */
    }
  }, {
    key: "selector_setAfter",
    value: function selector_setAfter() {
      /* Aspect method */
    }
  }, {
    key: "d3Element",
    value: function d3Element() {
      if (!this._d3svg) return null;
      return this._d3svg.d3Element();
    }
  }, {
    key: "camera",
    value: function camera(v) {
      if (!this._d3svg) return null;
      if (arguments.length === 0) return this._d3svg.camera();
      return this._d3svg.camera(v);
    }
  }, {
    key: "bounds",
    value: function bounds(v) {
      if (!this._d3svg) return null;
      if (arguments.length === 0) return this._d3svg.bounds();
      return this._d3svg.bounds(v);
    }
  }, {
    key: "layers",
    value: function layers() {
      if (!this._d3svg) return null;
      return this._d3svg.layers();
    }
  }, {
    key: "layer",
    value: function layer(code) {
      if (!this._d3svg) return null;
      return this._d3svg.layer(code);
    }
  }, {
    key: "d3svg",
    value: function d3svg() {
      if (this._d3svg.d3Element()) return this._d3svg;
      this.setting();
      return this._d3svg;
    }
    /** ***************************************************************
     *  Grids
     * **************************************************************** */

  }, {
    key: "gridsData",
    value: function gridsData() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;

      var lineSize = function lineSize(pos) {
        if (pos === 0) return 20;
        if (pos % 1000 === 0) return 10;
        return 1;
      };

      var out = [];

      for (var pos = size * -1; pos <= size; pos += 100) {
        var line = lineSize(pos);
        out.push({
          x1: pos,
          x2: pos,
          y1: size * -1,
          y2: size,
          size: line
        });
        out.push({
          x1: size * -1,
          x2: size,
          y1: pos,
          y2: pos,
          size: line
        });
      }

      return out;
    }
  }, {
    key: "drawGrids",
    value: function drawGrids() {
      if (this._grid.draw === false) return;
      this.layer('background').selectAll('line.grid').data(this.gridsData()).enter().append("line").attr("x1", function (d) {
        return d.x1;
      }).attr("x2", function (d) {
        return d.x2;
      }).attr("y1", function (d) {
        return d.y1;
      }).attr("y2", function (d) {
        return d.y2;
      }).attr("stroke-width", function (d) {
        return d.size;
      }).attr("stroke", "#e0e0e0");
    }
    /** ***************************************************************
     *  Data
     * **************************************************************** */

  }, {
    key: "data_setBefore",
    value: function data_setBefore(v) {}
  }, {
    key: "data_setAfter",
    value: function data_setAfter(v) {}
  }, {
    key: "data",
    value: function data(v) {
      var data = this._data;
      if (arguments.length === 0) return data;
      this._data = v;
      var d3svg = this._d3svg;
      if (!d3svg || !d3svg.selector()) return data;
      if (this._first_draw === null) this._first_draw = new Date();
      this.draw();
      return data;
    }
    /** ***************************************************************
     *  Draw (Overwride)
     * **************************************************************** */

  }, {
    key: "draw",
    value: function draw() {
      return this;
    }
  }]);

  return Colon;
}();

exports.default = Colon;