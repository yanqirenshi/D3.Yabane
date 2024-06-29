"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Colon = _interopRequireDefault(require("../../libs/js/Colon.js"));

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Timescale = /*#__PURE__*/function () {
  function Timescale(rectum) {
    _classCallCheck(this, Timescale);

    this._rectum = rectum;
  }

  _createClass(Timescale, [{
    key: "rectum",
    value: function rectum() {
      return this._rectum;
    }
  }, {
    key: "makeWeekLines",
    value: function makeWeekLines(dates, from, to, cycle, scale, h) {
      var tmp = (0, _dayjs.default)(from);

      while (tmp.isBefore(to)) {
        var date = tmp.toDate();
        var date_str = tmp.format('YYYY-MM-DD');
        var x = scale(tmp.toDate());
        dates[date_str] = {
          date: tmp.format('YYYY-MM-DD'),
          x1: x,
          y1: 0,
          x2: x,
          y2: h,
          type: cycle,
          stroke: '#aaa',
          strokeDasharray: '10 10'
        };
        tmp = tmp.add(1, cycle);
      }
    }
  }, {
    key: "ensureMonthStart",
    value: function ensureMonthStart(from) {
      var start = (0, _dayjs.default)(from);
      if (1 === start.date()) return start;
      return start.endOf('month').add(1, 'd');
    }
  }, {
    key: "makeMonthLines",
    value: function makeMonthLines(dates, from, to, scale, h) {
      var tmp = this.ensureMonthStart(from);

      while (tmp.isBefore(to) || tmp.isSame(to)) {
        var date = tmp.toDate();
        var date_str = tmp.format('YYYY-MM-DD');
        var x = scale(tmp.toDate());
        dates[date_str] = {
          date: tmp.format('YYYY-MM-DD'),
          x1: x,
          y1: 0,
          x2: x,
          y2: h,
          type: 'month',
          stroke: '#333'
        };
        tmp = tmp.add(1, 'month');
      }
    }
  }, {
    key: "makeManthLabels",
    value: function makeManthLabels(from, to, scale) {
      var out = [];
      var tmp = this.ensureMonthStart(from);

      while (tmp.isBefore(to) || tmp.isSame(to)) {
        var date = tmp.toDate();
        var date_str = tmp.format('YYYY-MM-DD');
        out.push({
          label: tmp.format('YYYY-MM'),
          x: scale(tmp.toDate()),
          y: -22,
          font: {
            size: 44
          }
        });
        tmp = tmp.add(1, 'month');
      }

      return out;
    }
  }, {
    key: "build",
    value: function build(style, branches) {
      var rectum = this.rectum();
      var from_str = rectum.from();
      var to_str = rectum.to();
      var cycle = rectum.cycle();
      var scale = rectum.scale();
      var from = (0, _dayjs.default)(from_str);
      var to = (0, _dayjs.default)(to_str).add(1, 'cycle');
      var last = null;

      var _iterator = _createForOfIteratorHelper(branches),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var branch = _step.value;
          if (last && branch.y() < last.y()) continue;
          last = branch;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var h = last.y() + last.h() + style.body.row.margin;
      var dates = {}; // 週次の線を引く。

      this.makeWeekLines(dates, from, to, cycle, scale, h); // 月次の線を引く。

      this.makeMonthLines(dates, from, to, scale, h); // 月のラベル

      var labels = this.makeManthLabels(from, to, scale);
      return {
        lines: Object.values(dates),
        labels: labels
      };
    }
  }]);

  return Timescale;
}();

exports.default = Timescale;