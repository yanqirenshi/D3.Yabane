"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node2 = _interopRequireDefault(require("./Node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

//
//  - +-------------------+
//  | |  padding.t
//  | |   +-----------+
//  | |   |           |
//  h | l |           | r           +
//  | |   |           |
//  | |   +-----------+
//  | |          b
//  - +-------------------+
//
//                        |--head---|
//    |---------w-------------------|
//
//
var ArrowFeather = /*#__PURE__*/function (_Node) {
  _inherits(ArrowFeather, _Node);

  var _super = _createSuper(ArrowFeather);

  function ArrowFeather(data) {
    var _this;

    _classCallCheck(this, ArrowFeather);

    _this = _super.call(this, data);
    _this._points = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
    _this._points_str = _this._points.reduce(function (str, arr) {
      return str + "".concat(arr[0], ",").concat(arr[1], " ");
    }, '');
    return _this;
  }

  _createClass(ArrowFeather, [{
    key: "style",
    value: function style() {
      return this.styles().body.yabane;
    }
  }, {
    key: "points",
    value: function points(v) {
      if (arguments.length === 1) {
        this._points = v;
        this.pointsString(this.points2string(v));
      }

      return this._points;
    }
  }, {
    key: "pointsString",
    value: function pointsString(v) {
      if (arguments.length === 1) this._points_str = v;
      return this._points_str;
    }
  }, {
    key: "head",
    value: function head() {
      return this.style().head;
    }
  }, {
    key: "h",
    value: function h() {
      // TODO: this.style() が null を返すとき。
      return this.style().h;
    }
  }, {
    key: "points2string",
    value: function points2string(points) {
      return points.reduce(function (str, arr) {
        return str + "".concat(arr[0], ",").concat(arr[1], " ");
      }, '');
    }
  }, {
    key: "calPoints",
    value: function calPoints() {
      //   (x,y)
      // --- p1-------->p2
      //  ^  ^
      //  |  |               p3
      //  v  |
      // --- p5<--------p4
      //                |--h-|
      //     |-------w-------|
      var id = this.id();
      var x = this.x();
      var y = this.y();
      var w = this.w();
      var h = this.h();
      var head = this.head();
      var x_head_root = x + w - head;
      return [[x, y], // p1
      [x_head_root, y], // p2
      [x + w, y + h / 2], // p3
      [x_head_root, y + h], // p4
      [x, y + h] // p5
      ];
    }
  }]);

  return ArrowFeather;
}(_Node2.default);

exports.default = ArrowFeather;
;