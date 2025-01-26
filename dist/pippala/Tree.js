"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Reaf = _interopRequireDefault(require("./Reaf.js"));

var _Branch = _interopRequireDefault(require("./Branch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tree = /*#__PURE__*/function () {
  function Tree() {
    _classCallCheck(this, Tree);

    this._children = {
      ht: {},
      list: []
    };
    this._branches = {
      ht: {},
      list: []
    };
    this._reafs = {
      ht: {},
      list: []
    };
  }

  _createClass(Tree, [{
    key: "branches",
    value: function branches() {
      return this._branches.list;
    }
  }, {
    key: "branch",
    value: function branch(id) {
      return this._branches.ht[id] || null;
    }
  }, {
    key: "reafsByBnraches",
    value: function reafsByBnraches() {
      return this._branches.list.reduce(function (list, b) {
        return list.concat(b.sortedChildren());
      }, []);
    }
  }, {
    key: "reafs",
    value: function reafs() {
      return this._reafs.list;
    }
  }, {
    key: "addChild",
    value: function addChild(child) {
      this._children.ht[child.id()] = child;

      this._children.list.push(child);
    }
  }, {
    key: "compose",
    value: function compose(branches_data, reafs_data) {
      var _this = this;

      var fn = function fn(pool, obj) {
        obj.tree(_this);
        var id = obj.id();
        pool.ht[id] = obj;
        pool.list.push(obj);
        return pool;
      }; // branches を Pool にためる。


      var branches = branches_data.reduce(function (pool, d) {
        return fn(pool, new _Branch.default(d));
      }, {
        ht: {},
        list: []
      }); // reafs を Pool にためる。

      var reafs = reafs_data.reduce(function (pool, d) {
        return fn(pool, new _Reaf.default(d));
      }, {
        ht: {},
        list: []
      }); // branches の木構造つくる。

      var _iterator = _createForOfIteratorHelper(branches.list),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var branch = _step.value;
          var parent = branch.parentId();

          if (parent) {
            var parent_branch = branches.ht[parent]; // TODO: 落ち枝!

            if (!parent_branch) continue;
            parent_branch.addChild(branch);
          } else {
            this.addChild(branch);
          }
        } // reafs の木構造つくる。

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(reafs.list),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var reaf = _step2.value;

          var _parent = reaf.parentId();

          var _parent_branch = branches.ht[_parent]; // TODO: 落ち葉!

          if (!_parent_branch) continue;

          _parent_branch.addChild(reaf);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var x = {};

      var _iterator3 = _createForOfIteratorHelper(branches.list),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var b = _step3.value;

          var _iterator4 = _createForOfIteratorHelper(b.children().list),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var c = _step4.value;
              x[c.constructor.name] = true;
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (Object.keys(x).length > 1) throw new Error('children に Branch と Reaf は混在できません。');
      this._branches = branches;
      this._reafs = reafs;
      return this;
    }
  }]);

  return Tree;
}();

exports.default = Tree;
;