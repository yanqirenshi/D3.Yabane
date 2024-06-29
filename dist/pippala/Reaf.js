"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

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

var Reaf = /*#__PURE__*/function (_ArrowFeather) {
  _inherits(Reaf, _ArrowFeather);

  var _super = _createSuper(Reaf);

  function Reaf(data) {
    var _this;

    _classCallCheck(this, Reaf);

    _this = _super.call(this, data);
    _this._plan = plan2plan(data);
    return _this;
  }

  _createClass(Reaf, [{
    key: "plan",
    value: function plan(v) {
      return this._plan;
    }
  }, {
    key: "inputTemplate",
    value: function inputTemplate() {
      return {
        id: -1,
        parent: -1,
        name: '????????',
        // plan:   { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' },
        // result: { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' },
        plan: {
          start: null,
          end: null
        },
        result: {
          start: null,
          end: null
        },
        progress: 0
      };
    }
  }, {
    key: "calY",
    value: function calY(branch, before) {
      if (!before) return branch.y();
      var styles = this.styles();
      var start = before.y() + before.h();
      return start + styles.body.yabane.margin;
    }
  }, {
    key: "styling",
    value: function styling(scale, timescale, styles, before) {
      // ここでセットするの？
      this.styles(styles); // x, y, w, h の計算

      var term = fixTerm(scale, this.plan());
      var start = timescale(term.start);
      var end = timescale(term.end);
      this.x(start);
      this.w(end - start);
      var branch = this.parent();
      this.y(this.calY(branch, before)); // 描画用ポイント座標の計算

      this.points(this.calPoints());
    }
  }]);

  return Reaf;
}(_ArrowFeather2.default);

exports.default = Reaf;
;

function plan2plan(data) {
  var from = str2dt(data.plan.from);
  var to = str2dt(data.plan.to);
  if (!from || !to || to.isBefore(from)) return {
    from: null,
    to: null
  };
  return {
    from: from.toDate(),
    to: to.toDate()
  };
}

function str2dt(str) {
  if (!str) return null;
  var dt = (0, _dayjs.default)(str);
  if (!dt.isValid()) return null;
  return dt;
}

function fixTerm(scale, term) {
  var scale_from = (0, _dayjs.default)(scale.from);
  var scale_to = (0, _dayjs.default)(scale.to);
  var term_from = (0, _dayjs.default)(term.from);
  var term_to = (0, _dayjs.default)(term.to);
  var cycle = scale.cycle;
  return {
    start: (term_from.isBefore(scale_from) ? scale_from.add(-0.5, cycle) : term_from).toDate(),
    end: (term_to.isAfter(scale_to) ? scale_to.add(2, cycle) : term_to).toDate()
  };
}