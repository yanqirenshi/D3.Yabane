import dayjs from 'dayjs';
import Node from './Node.js';

export default class Reaf extends Node {
    constructor (data) {
        super(data);

        this._plan = plan2plan(data);
    }
    style () {
        return this.style().body.yabane;
    }
    plan (v) {
        return this._plan;
    }
    h () {
        // TODO: this.style() が null を返すとき。
        return this.style().h;
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
