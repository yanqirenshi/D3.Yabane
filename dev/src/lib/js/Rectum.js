import { Colon } from '@yanqirenshi/assh0le';
import * as d3 from 'd3';
import dayjs from 'dayjs';

import Reafs from '../painters/Reafs.js';
import Branches from '../painters/Branches.js';
import PTimescale from '../painters/Timescale.js';
import PRows from '../painters/Rows.js';
import PNow from '../painters/Now.js';

import Timescale from './Timescale.js';
import Rows from './Rows.js';
import Now from './Now.js';

export default class Rectum extends Colon {
    constructor (v) {
        super(v);

        this._timescale = null;
        this._scale = null;
        this._cycle = null;
        this._from = null;
        this._to = null;

        this._rows = [];
        this._now = null;
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
    now () {
        return this._now;
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
        // Workpackage を持っている
        let before_branch = null;
        for (const branch of graph_data.tree.branches()) {
            branch.styling(scale, style, before_branch);

            // Reaf(Workpackage) の x, y, w, h を決める。
            let before_reaf = null;
            for (const reaf of branch.sortedChildren()) {
                reaf.styling(
                    graph_data.scale,
                    scale,
                    style, before_reaf);
                before_reaf = reaf;
            }

            // Reaf 全体から Branch の 高さを決める。
            let min_y = null;
            let max_y = null;
            let max_y_h = null;
            for (const reaf of branch.sortedChildren()) {
                const y = reaf.y();

                if (min_y===null || min_y > y) min_y = y;
                if (max_y===null || max_y < y) {
                    max_y = y;
                    max_y_h = reaf.h();
                };
                branch.h(max_y - min_y + max_y_h);
            }

            before_branch = branch;
        }

        const branches = graph_data.tree.branches();

        this._timescale = new Timescale(this).build(style, branches);

        this._rows = new Rows(this).build(style, branches);

        this._now = new Now(this).build(style, branches, scale);

        return graph_data;
    }
    draw () {
        const data = this.data();

        if (!data) return this;

        const reafs = data.tree.reafs();
        new Reafs(this).draw(reafs);

        const branches = data.tree.branches();
        new Branches(this).draw(branches);

        new PTimescale(this).draw(this.timescale());

        new PRows(this).draw(this.rows());

        new PNow(this).draw(this.now());

        return this;
    }
}

class stylingWorkpackages {
    /**
     * 矩形が被るものがないか確認する。 被る=true, 被らない=false
     */
    isPuton (wp, targets) {
        for (const target of targets) {
            const wp_l = wp.location();
            const wp_s = wp.size();

            const trg_l = target.location();
            const trg_s = target.size();

            if (Math.abs(wp_l.x - trg_l.x) < wp_s.w / 2 + trg_s.w / 2 &&
                Math.abs(wp_l.y - trg_l.y) < wp_s.h / 2 + trg_s.h / 2)
                return true;
        }

        return false;
    }
    /**
     * Workpackage のチャートが被るかどうかを整える。(2/2)
     */
    layoutChildrenAddTemp (wp, tmp) {
        for (const wp_list of tmp) {
            // wp が 他 wp と被る場合、次(別)の段の確認に進む。
            if (this.isPuton(wp, wp_list))
                continue;

            // wp が 他 wp と被らない場合、同じ段での表示にする。
            wp_list.push(wp);

            return;
        }

        // 全段被る場合は、新しい段を追加する。
        tmp.push([wp]);
    }
    /**
     * Workpackage のチャートが被るかどうかを整える。(1/2)
     */
    layoutChildrenMakeTmp (children) {
        const func = (tmp, child)=>{

            if (tmp.length===0) {
                tmp.push([child]);
                return tmp;
            }

            // tmp に child を追加する。
            this.layoutChildrenAddTemp(child, tmp);

            return tmp;
        };

        // tmp = [
        //    [], 一段目
        //    [], 二段目
        //    :   n 段目
        // ]
        const tmp = [];

        return children.reduce(func, tmp);
    }
}
