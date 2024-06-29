"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Tree = _interopRequireDefault(require("./Tree.js"));

var _Reaf = _interopRequireDefault(require("./Reaf.js"));

var _Branch = _interopRequireDefault(require("./Branch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pippala = /*#__PURE__*/function () {
  function Pippala() {
    _classCallCheck(this, Pippala);
  }

  _createClass(Pippala, [{
    key: "build",
    value: // constructor () {}
    function build(from, to, v) {
      var filterd_wps = v.workpackages.filter(function (wp) {
        return isInTerm(from, to, wp.plan);
      });
      return new _Tree.default().compose(v.wbs, filterd_wps);
    }
  }]);

  return Pippala;
}();

exports.default = Pippala;
;

function isInTerm(from, to, term) {
  //         from        to
  //   o--->  |          |           o  x
  //   o------>          |           o  o
  //          |          |
  //   o-------->        |           o  o
  //   o----------------->           o  o
  //   o------------------->         o  o
  //          |          |
  //          o--->      |           o  o
  //          o---------->           o  o
  //          o------------>         o  o
  //          |          |
  //          |    o---> |           o  o
  //          |    o----->           o  o
  //          |    o------->         o  o
  //          |          o--->       o  o
  //          |          |
  //          |          | o--->     x  o
  return term.from <= to && term.to >= from;
}