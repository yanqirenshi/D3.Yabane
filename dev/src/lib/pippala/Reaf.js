import dayjs from 'dayjs';
import Node from './Node.js';

export default class Reaf extends Node {
    constructor (data) {
        super(data);

        this._style = null;

        this._plan = plan2plan(data);

        this._x = 0;
        this._y = 0;
        this._w = 0;
        // this._h = 0;  // これは this._style から取得する。
    }
    style (v) {
        if (arguments.length===1)
            this._style = v;

        return this._style;
    }
    plan (v) {
        return this._plan;
    }
    x (v) {
        if (arguments.length===1)
            this._x = v;

        return this._x;
    }
    y (v) {
        if (arguments.length===1)
            this._y = v;

        return this._y;
    }
    w (v) {
        if (arguments.length===1)
            this._w = v;

        return this._w;
    }
    h () {
        // TODO: this.style() が null を返すとき。
        return this.style().body.yabane.h;
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
