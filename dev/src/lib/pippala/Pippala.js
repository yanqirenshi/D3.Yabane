import Tree from './Tree.js';
import Reaf from './Reaf.js';
import Branch from './Branch.js';

export default class Pippala {
    // constructor () {}
    build (from, to, v) {
        const filterd_wps = v.workpackages.filter(wp=> {
            return isInTerm (from, to, wp.plan);
        });

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
