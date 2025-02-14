import Tree from './Tree.js';
import Reaf from './Reaf.js';
import Branch from './Branch.js';

export default class Pippala {
    // constructor () {}
    build (from, to, v) {
        // term(fron, to) で wp を絞る。
        const filterd_wps = v.workpackages.filter(wp=> {
            return isInTerm (from, to, wp.plan);
        });

        // ツリーを構築する。
        return new Tree().compose(v.wbs, filterd_wps);
    }
};

function isInTerm (from, to, term) {
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
