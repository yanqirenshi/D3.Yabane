"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ArrowFeather2 = _interopRequireDefault(require("./ArrowFeather.js"));

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

var Branches = /*#__PURE__*/function (_ArrowFeather) {
  _inherits(Branches, _ArrowFeather);

  var _super = _createSuper(Branches);

  function Branches(rectum) {
    var _this;

    _classCallCheck(this, Branches);

    _this = _super.call(this);
    _this._rectum = rectum;
    return _this;
  }

  _createClass(Branches, [{
    key: "rectum",
    value: function rectum() {
      return this._rectum;
    }
  }, {
    key: "drawBox",
    value: function drawBox(place, branches) {
      var draw = function draw(targets) {
        targets.attr("x", function (d) {
          return d.x();
        }).attr("y", function (d) {
          return d.y();
        }).attr("width", function (d) {
          return d.w();
        }).attr("height", function (d) {
          return d.h();
        }).attr("fill", "#fff").attr("stroke-width", 4).attr("stroke", "#0e9aa7");
      };

      var selections = place.selectAll("rect.branch").data(branches, function (d) {
        return d.id();
      }); // remove

      selections.exit().remove(); // add

      draw(selections.enter().append("rect").attr('class', 'branch').attr('code', function (d) {
        return d.id();
      })); // update

      draw(selections);
    }
  }, {
    key: "drawText",
    value: function drawText(place, branches) {
      var draw = function draw(targets) {
        targets.attr("x", function (d) {
          return d.x() + 33;
        }).attr("y", function (d) {
          return d.y() + 33 + 10;
        }).attr("font-size", 33).text(function (d) {
          return d.name();
        });
      };

      var selections = place.selectAll("text.branch_label").data(branches, function (d) {
        return d.id();
      }); // remove

      selections.exit().remove(); // add

      draw(selections.enter().append("text").attr('class', 'branch_label').attr('code', function (d) {
        return d.id();
      })); // update

      draw(selections);
    }
  }, {
    key: "draw",
    value: function draw(branches) {
      var rectum = this.rectum();
      var place = rectum.layer('foreground');
      this.drawBox(place, branches);
      this.drawText(place, branches);
    }
  }]);

  return Branches;
}(_ArrowFeather2.default);

exports.default = Branches;