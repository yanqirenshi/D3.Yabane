import Colon from '../../libs/js/Colon.js';
import dayjs from 'dayjs';

export default class Timescale {
    constructor (rectum) {
        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    makeWeekLines (dates, from, to, cycle, scale, h) {
        let tmp = dayjs(from);
        while (tmp.isBefore(to)) {
            const date = tmp.toDate();

            const date_str = tmp.format('YYYY-MM-DD');

            const x = scale(tmp.toDate());

            dates[date_str] = {
                date: tmp.format('YYYY-MM-DD'),
                x1: x, y1: 0,
                x2: x, y2: h,
                type: cycle,
                stroke: '#aaa',
                strokeDasharray: '10 10',
            };

            tmp = tmp.add(1, cycle);
        }
    }
    makeMonthLines (dates, from, to, scale, h) {
        let tmp = dayjs(from).endOf('month').add(1, 'd');
        while (tmp.isBefore(to)) {
            const date = tmp.toDate();

            const date_str = tmp.format('YYYY-MM-DD');

            const x = scale(tmp.toDate());

            dates[date_str] = {
                date: tmp.format('YYYY-MM-DD'),
                x1: x, y1: 0,
                x2: x, y2: h,
                type: 'month',
                stroke: '#333',
            };

            tmp = tmp.add(1, 'month');
        }
    }
    makeManthLabels (from, to, scale) {
        const out = [];

        let tmp = dayjs(from).endOf('month').add(1, 'd');
        while (tmp.isBefore(to)) {
            const date = tmp.toDate();

            const date_str = tmp.format('YYYY-MM-DD');

            out.push({
                label: tmp.format('YYYY-MM'),
                x: scale(tmp.toDate()),
                y: -22,
                font: { size: 44 },
            });

            tmp = tmp.add(1, 'month');
        }

        return out;
    }
    build (style, branches) {
        const rectum = this.rectum();

        const from_str = rectum.from();
        const to_str = rectum.to();
        const cycle = rectum.cycle();
        const scale = rectum.scale();

        const from = dayjs(from_str);
        const to   = dayjs(to_str);

        let last = null;
        for (const branch of branches) {
            if (last && branch.y() < last.y())
                continue;
            last = branch;
        }

        const h = last.y() + last.h() + style.body.row.margin;

        const dates = {};

        // 週次の線を引く。
        this.makeWeekLines(dates, from, to, cycle, scale, h);

        // 月次の線を引く。
        this.makeMonthLines(dates, from, to, scale, h);

        // 月のラベル
        const labels = this.makeManthLabels(from, to, scale);

        return {
            lines: Object.values(dates),
            labels: labels,
        };
    }
}
