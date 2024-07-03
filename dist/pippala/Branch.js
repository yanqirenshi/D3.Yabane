"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node2 = _interopRequireDefault(require("./Node.js"));

var _dayjs = _interopRequireDefault(require("dayjs"));

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

//       -------------------------- ---------------------------------
//      |      margin.t            |
//  --- |   +------------------+   | --------------------------------
//   |  |   |  padding.t       |   |
//   |  |   | ---------------- |   |   reaf
//   |  |   |   |          |   |   |
//   h  | l | l |          | r | r |   area
//   |  |   |   |          |   |   |
//   |  |   | ---------------- |   |
//   |  |   |  padding.b       |   |
//  --- |   +------------------+   | --------------------------------
//      |      maring.b            |
//       -------------------------- ---------------------------------
//
//          |--------w---------|
//
var Branch = /*#__PURE__*/function (_Node) {
  _inherits(Branch, _Node);

  var _super = _createSuper(Branch);

  function Branch(data) {
    var _this;

    _classCallCheck(this, Branch);

    _this = _super.call(this, data);
    _this._children = {
      ht: {},
      list: []
    };
    return _this;
  }

  _createClass(Branch, [{
    key: "name",
    value: function name() {
      return this.core().name;
    }
  }, {
    key: "children",
    value: function children() {
      return this._children;
    }
  }, {
    key: "sortedChildren",
    value: function sortedChildren() {
      return this.children().list.sort(function (a, b) {
        if (a.plan().from < b.plan().from) return -1;
        if (a.plan().from > b.plan().from) return 1;
        return a.plan().to < b.plan().to ? -1 : 1;
      });
    }
  }, {
    key: "w",
    value: function w() {
      // TODO: this.styles() が null を返すとき。
      return this.style().w;
    } // h () {
    //     // TODO: this.styles() が null を返すとき。
    //     return this.style().h;
    // }

  }, {
    key: "nextY",
    value: function nextY() {
      return this.y() // + this.margin().t
      + this.h() + this.margin().b;
    }
  }, {
    key: "inputTemplate",
    value: function inputTemplate() {
      return {
        id: -1,
        name: '???'
      };
    }
  }, {
    key: "addChild",
    value: function addChild(child) {
      this._children.ht[child.id()] = child;

      this._children.list.push(child);
    }
  }, {
    key: "style",
    value: function style() {
      return this.styles().body.row;
    }
  }, {
    key: "margin",
    value: function margin() {
      var m = this.style().margin;
      return {
        l: m,
        r: m,
        t: m,
        b: m
      };
    }
  }, {
    key: "calX",
    value: function calX() {
      var style = this.style();
      return style.margin * -1 * 1;
    }
  }, {
    key: "calH",
    value: function calH(styles) {
      var children = this.children().list;
      var len = children.length;
      var sytle_yabane = styles.body.yabane;
      return len * sytle_yabane.h + (len - 1) * sytle_yabane.margin;
    }
  }, {
    key: "styling",
    value: function styling(scale, styles, before) {
      // ここでセットするの？
      this.styles(styles);
      this.x(this.calX(styles));
      this.y(before ? before.nextY() : 0);
      this.h(this.calH(styles));
      return this;
    }
  }]);

  return Branch;
}(_Node2.default);

exports.default = Branch;
;