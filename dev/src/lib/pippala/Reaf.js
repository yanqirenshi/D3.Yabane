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
            return branch.y() + branch.margin().t;

        const styles = this.styles();

        const start = before.y() + before.h();

        return start + styles.body.yabane.margin;
    }
    styling (scale, styles, before) {
        // ここでセットするの？
        this.styles(styles);

        // x, y, w, h の計算
        const start = scale(this.plan().from);
        const end   = scale(this.plan().to);
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
