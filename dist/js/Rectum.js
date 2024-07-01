"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assh0le = require("@yanqirenshi/assh0le");

var d3 = _interopRequireWildcard(require("d3"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _Reafs = _interopRequireDefault(require("../painters/Reafs.js"));

var _Branches = _interopRequireDefault(require("../painters/Branches.js"));

var _Timescale = _interopRequireDefault(require("../painters/Timescale.js"));

var _Rows = _interopRequireDefault(require("../painters/Rows.js"));

var _Now = _interopRequireDefault(require("../painters/Now.js"));

var _Timescale2 = _interopRequireDefault(require("./Timescale.js"));

var _Rows2 = _interopRequireDefault(require("./Rows.js"));

var _Now2 = _interopRequireDefault(require("./Now.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Rectum = /*#__PURE__*/function (_Colon) {
  _inherits(Rectum, _Colon);

  var _super = _createSuper(Rectum);

  function Rectum(v) {
    var _this;

    _classCallCheck(this, Rectum);

    _this = _super.call(this, v);
    _this._timescale = null;
    _this._scale = null;
    _this._cycle = null;
    _this._from = null;
    _this._to = null;
    _this._rows = [];
    _this._now = null;
    return _this;
  }

  _createClass(Rectum, [{
    key: "makeScale",
    value: function makeScale(scale, style) {
      this._cycle = scale.cycle;
      this._from = (0, _dayjs.default)(scale.from).startOf(this._cycle).toDate();
      this._to = (0, _dayjs.default)(scale.to).endOf(this._cycle).toDate();
      var start_x = style.body.row.w + style.body.row.margin;
      this._scale = d3.scaleTime([this._from, this._to], [start_x, start_x + scale.size]);
      return this._scale;
    }
  }, {
    key: "scale",
    value: function scale() {
      return this._scale;
    }
  }, {
    key: "cycle",
    value: function cycle() {
      return this._cycle;
    }
  }, {
    key: "from",
    value: function from() {
      return this._from;
    }
  }, {
    key: "to",
    value: function to() {
      return this._to;
    }
  }, {
    key: "timescale",
    value: function timescale() {
      return this._timescale;
    }
  }, {
    key: "rows",
    value: function rows() {
      return this._rows;
    }
  }, {
    key: "now",
    value: function now() {
      return this._now;
    }
  }, {
    key: "style",
    value: function style() {
      if (!this.data()) return {};
      return this.data().style;
    }
  }, {
    key: "chewing",
    value: function chewing(graph_data) {
      var style = graph_data.style;
      this.makeScale(graph_data.scale, style);
      var scale = this.scale(); // Branch(WBS)  の x, y, w, h を決める。

      var before_branch = null;

      var _iterator = _createForOfIteratorHelper(graph_data.tree.branches()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var branch = _step.value;
          branch.styling(scale, style, before_branch); // Reaf(Workpackage) の x, y, w, h を決める。

          var before_reaf = null;

          var _iterator2 = _createForOfIteratorHelper(branch.children().list),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var reaf = _step2.value;
              reaf.styling(graph_data.scale, scale, style, before_reaf);
              before_reaf = reaf;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          before_branch = branch;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var branches = graph_data.tree.branches();
      this._timescale = new _Timescale2.default(this).build(style, branches);
      this._rows = new _Rows2.default(this).build(style, branches);
      this._now = new _Now2.default(this).build(style, branches, scale);
      return graph_data;
    }
  }, {
    key: "draw",
    value: function draw() {
      var data = this.data();
      if (!data) return this;
      var reafs = data.tree.reafs();
      new _Reafs.default(this).draw(reafs);
      var branches = data.tree.branches();
      new _Branches.default(this).draw(branches);
      new _Timescale.default(this).draw(this.timescale());
      new _Rows.default(this).draw(this.rows());
      new _Now.default(this).draw(this.now());
      return this;
    }
  }]);

  return Rectum;
}(_assh0le.Colon);

exports.default = Rectum;