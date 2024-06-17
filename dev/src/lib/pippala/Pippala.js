import Tree from './Tree.js';
import Reaf from './Reaf.js';
import Branch from './Branch.js';

export default class Pippala {
    // constructor () {}
    build (v) {
        return new Tree().compose(v.wbs, v.workpackages);
    }
};
