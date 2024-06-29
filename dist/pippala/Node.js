"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stylist = /*#__PURE__*/function () {
  function Stylist() {
    _classCallCheck(this, Stylist);

    this._style = null;
  }

  _createClass(Stylist, [{
    key: "styles",
    value: function styles(v) {
      if (arguments.length === 1) this._style = v;
      return this._style;
    }
  }]);

  return Stylist;
}();

var Node = /*#__PURE__*/function (_Stylist) {
  _inherits(Node, _Stylist);

  var _super = _createSuper(Node);

  function Node(data) {
    var _this;

    _classCallCheck(this, Node);

    _this = _super.call(this);
    _this._core = data;
    _this._style = null;
    _this._x = 0;
    _this._y = 0;
    _this._w = 0;
    _this._h = 0;
    _this._tree = null;
    return _this;
  }

  _createClass(Node, [{
    key: "core",
    value: function core() {
      return this._core;
    }
  }, {
    key: "id",
    value: function id() {
      return this.core().id;
    }
  }, {
    key: "tree",
    value: function tree(v) {
      if (arguments.length === 1) this._tree = v;
      return this._tree;
    }
  }, {
    key: "parentId",
    value: function parentId() {
      return this.core().parent || null;
    }
  }, {
    key: "parent",
    value: function parent() {
      var parent_id = this.parentId();
      if (!parent_id) return null;
      return this.tree().branch(parent_id);
    }
  }, {
    key: "x",
    value: function x(v) {
      if (arguments.length === 1) this._x = v;
      return this._x;
    }
  }, {
    key: "y",
    value: function y(v) {
      if (arguments.length === 1) this._y = v;
      return this._y;
    }
  }, {
    key: "w",
    value: function w(v) {
      if (arguments.length === 1) this._w = v;
      return this._w;
    }
  }, {
    key: "h",
    value: function h(v) {
      if (arguments.length === 1) this._h = v;
      return this._h;
    }
  }]);

  return Node;
}(Stylist);

exports.default = Node;
;