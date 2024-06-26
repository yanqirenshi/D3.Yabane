import Colon from '../../libs/js/Colon.js';
import dayjs from 'dayjs';

export default class Timescale {
    // constructor (v) {
    // }
    makeWeekLines (dates, from, to, cycle, scale) {
        let tmp = dayjs(from);
        while (tmp.isBefore(to)) {
            const date = tmp.toDate();

            const date_str = tmp.format('YYYY-MM-DD');

            const x = scale(tmp.toDate());

            dates[date_str] = {
                date: tmp.format('YYYY-MM-DD'),
                x1: x, y1: 0,
                x2: x, y2: 2555,
                type: cycle,
                stroke: '#aaa',
                strokeDasharray: '10 10',
            };

            tmp = tmp.add(1, cycle);
        }
    }
    makeMonthLines (dates, from, to, scale) {
        let tmp = dayjs(from).endOf('month').add(1, 'd');
        while (tmp.isBefore(to)) {
            const date = tmp.toDate();

            const date_str = tmp.format('YYYY-MM-DD');

            const x = scale(tmp.toDate());

            dates[date_str] = {
                date: tmp.format('YYYY-MM-DD'),
                x1: x, y1: 0,
                x2: x, y2: 2555,
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
            });

            tmp = tmp.add(1, 'month');
        }

        return out;
    }
    build (from_str, to_str, cycle, scale) {
        const from = dayjs(from_str);
        const to   = dayjs(to_str);

        const dates = {};

        // 週次の線を引く。
        this.makeWeekLines(dates, from, to, cycle, scale);

        // 月次の線を引く。
        this.makeMonthLines(dates, from, to, scale);

        // 月のラベル
        const labels = this.makeManthLabels(from, to, scale);

        return {
            lines: Object.values(dates),
            labels: labels,
        };
    }
}
