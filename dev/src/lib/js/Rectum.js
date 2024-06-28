import Colon from '../../libs/js/Colon.js';
import * as d3 from 'd3';
import dayjs from 'dayjs';

import Reafs from '../painters/Reafs.js';
import Branches from '../painters/Branches.js';
import PTimescale from '../painters/Timescale.js';
import PRows from '../painters/Rows.js';

import Timescale from './Timescale.js';
import Rows from './Rows.js';

export default class Rectum extends Colon {
    constructor (v) {
        super(v);

        this._timescale = null;
        this._scale = null;
        this._cycle = null;
        this._from = null;
        this._to = null;

        this._rows = [];
    }
    makeScale (scale, style) {
        this._cycle = scale.cycle;
        this._from  = dayjs(scale.from).startOf(this._cycle).toDate();
        this._to    = dayjs(scale.to).endOf(this._cycle).toDate();

        const start_x = style.body.row.w + style.body.row.margin;

        this._scale = d3.scaleTime(
            [this._from, this._to],
            [start_x, start_x + scale.size]);

        return this._scale;
    }
    scale () {
        return this._scale;
    }
    cycle () {
        return this._cycle;
    }
    from () {
        return this._from;
    }
    to () {
        return this._to;
    }
    timescale () {
        return this._timescale;
    }
    rows () {
        return this._rows;
    }
    style () {
        if (!this.data())
            return {};

        return this.data().style;
    }
    chewing (graph_data) {
        const style = graph_data.style;

        this.makeScale(graph_data.scale, style);

        const scale = this.scale();

        // Branch(WBS)  の x, y, w, h を決める。
        let before_branch = null;
        for (const branch of graph_data.tree.branches()) {
            branch.styling(scale, style, before_branch);

            // Reaf(Workpackage) の x, y, w, h を決める。
            let before_reaf = null;
            for (const reaf of branch.children().list) {
                reaf.styling(scale, style, before_reaf);
                before_reaf = reaf;
            }

            before_branch = branch;
        }

        const branches = graph_data.tree.branches();

        this._timescale = new Timescale(this).build(style, branches);

        this._rows = new Rows(this).build(style, branches);

        return graph_data;
    }
    draw () {
        const data = this.data();

        if (!data) return this;

        const reafs = data.tree.reafs();
        new Reafs(this).draw(reafs);

        const branches = data.tree.branches();
        new Branches(this).draw(branches);

        const timescale = this.timescale();
        new PTimescale(this).draw(timescale);

        const rows = this.rows();
        new PRows(this).draw(rows);

        return this;
    }
}
