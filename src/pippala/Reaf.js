import dayjs from 'dayjs';
import ArrowFeather from './ArrowFeather.js';

export default class Reaf extends ArrowFeather {
    constructor (data) {
        super(data);

        this._plan = plan2plan(data);
    }
    plan (v) {
        return this._plan;
    }
    inputTemplate () {
        return {
            id: -1,
            parent: -1,
            name: '????????',
            // plan:   { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' },
            // result: { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' },
            plan:   { start: null, end: null },
            result: { start: null, end: null },
            progress: 0,
        };
    }
    calY (branch, before) {
        if (!before)
            return branch.y();

        const styles = this.styles();

        // const start = before.y() + before.h();
        const start = before.y();

        return start + styles.body.yabane.margin;
    }
    styling (scale, timescale, styles, before) {
        // ここでセットするの？
        this.styles(styles);

        // x, y, w, h の計算
        const term = fixTerm (scale, this.plan());
        const start = timescale(term.start);
        const end   = timescale(term.end);
        this.x(start);
        this.w(end - start);

        const branch = this.parent();
        this.y(this.calY(branch, before));

        // 描画用ポイント座標の計算
        this.points(this.calPoints());
    }
};

function plan2plan (data) {
    const from = str2dt(data.plan.from);
    const to   = str2dt(data.plan.to);

    if (!from || !to || to.isBefore(from))
        return { from: null, to: null };

    return { from: from.toDate(), to: to.toDate() };
}

function str2dt (str) {
    if (!str)
        return null;

    const dt = dayjs(str);

    if (!dt.isValid())
        return null;

    return dt;
}

function fixTerm (scale, term) {
    const scale_from = dayjs(scale.from);
    const scale_to = dayjs(scale.to);

    const term_from = dayjs(term.from);
    const term_to = dayjs(term.to);

    const cycle = scale.cycle;

    return {
        start: (term_from.isBefore(scale_from) ? scale_from.add(-0.5, cycle) : term_from).toDate(),
        end: (term_to.isAfter(scale_to) ? scale_to.add(2, cycle) : term_to).toDate()
    };
}
