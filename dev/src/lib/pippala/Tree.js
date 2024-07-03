import Reaf from './Reaf.js';
import Branch from './Branch.js';

export default class Tree {
    constructor () {
        this._children = { ht:{}, list:[], };

        this._branches = { ht:{}, list:[], };
        this._reafs = { ht:{}, list:[], };
    }
    branches () {
        return this._branches.list;
    }
    branch (id) {
        return this._branches.ht[id] || null;
    }
    reafsByBnraches () {
        return this._branches.list.reduce((list, b)=> {
            return list.concat(b.sortedChildren());
        }, []);
    }
    reafs () {
        return this._reafs.list;
    }
    addChild (child) {
        this._children.ht[child.id()] = child;
        this._children.list.push(child);
    }
    compose (branches_data, reafs_data) {
        const fn = (pool, obj)=> {
            obj.tree(this);

            const id = obj.id();

            pool.ht[id] = obj;
            pool.list.push(obj);

            return pool;
        };

        // branches を Pool にためる。
        const branches = branches_data.reduce((pool, d)=> {
            return fn(pool, new Branch(d)) ;
        }, { ht:{}, list:[], });

        // reafs を Pool にためる。
        const reafs = reafs_data.reduce((pool, d)=> {
            return fn(pool, new Reaf(d)) ;
        }, { ht:{}, list:[], });

        // branches の木構造つくる。
        for (const branch of branches.list) {
            const parent = branch.parentId();

            if (parent) {
                const parent_branch = branches.ht[parent];

                // TODO: 落ち枝!
                if (!parent_branch) continue;

                parent_branch.addChild(branch);
            } else {
                this.addChild(branch);
            }
        }

        // reafs の木構造つくる。
        for (const reaf of reafs.list) {
            const parent = reaf.parentId();

            const parent_branch = branches.ht[parent];

            // TODO: 落ち葉!
            if (!parent_branch) continue;

            parent_branch.addChild(reaf);
        }

        this._branches = branches;
        this._reafs = reafs;

        return this;
    }
};
