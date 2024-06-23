import Colon from '../../libs/js/Colon.js';
import * as d3 from 'd3';
import dayjs from 'dayjs';

import Reafs from '../painters/Reafs.js';

export default class Rectum extends Colon {
    constructor (v) {
        super(v);

        this._scale = null;
    }
    makeScale (scale) {
        const from_date = dayjs(scale.from).toDate();
        const to_date = dayjs(scale.to).toDate();

        this._scale = d3.scaleTime([from_date, to_date], [0, scale.size]);

        return this._scale;
    }
    scale () {
        return this._scale;
    }
    chewing (graph_data) {
        const scale = this.scale();

        // Branch(WBS)  の x, y, w, h を決める。
        let before_branch = null;
        for (const branch of graph_data.tree.branches()) {
            branch.styling(scale, graph_data.style, before_branch);

            // Reaf(Workpackage) の x, y, w, h を決める。
            let before_reaf = null;
            for (const reaf of branch.children().list) {
                reaf.styling(scale, graph_data.style, before_reaf);
                before_reaf = reaf;
            }

            before_branch = branch;
        }

        return graph_data;
    }
    draw () {
        const data = this.data();

        if (!data) return this;

        const branches = data.tree.branches();
        const reafs = data.tree.reafs();

        // console.log(branches);

        new Reafs(this).draw(reafs);

        return this;
    }
}
