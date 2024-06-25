import Colon from '../../libs/js/Colon.js';
import dayjs from 'dayjs';

export default class Timescale {
    // constructor (v) {
    // }
    build (from_str, to_str, cycle, scale) {
        const from = dayjs(from_str);
        const to   = dayjs(to_str);

        const dates = {};

        // 週次の線を引く。
        let tmp = dayjs(from);
        while (tmp.isBefore(to)) {
            const date = tmp.toDate();

            const date_str = tmp.format('YYYY-MM-DD');
            dates[date_str] = {
                date: tmp.format('YYYY-MM-DD'),
                x: scale(tmp.toDate()),
                type: cycle,
                stroke: '#aaa',
                strokeDasharray: '10 10',
            };

            tmp = tmp.add(1, cycle);
        }

        // 月次の線を引く。
        let tmp2 = dayjs(from).endOf('month').add(1, 'd');
        while (tmp2.isBefore(to)) {
            const date = tmp2.toDate();

            const date_str = tmp2.format('YYYY-MM-DD');

            dates[date_str] = {
                date: tmp2.format('YYYY-MM-DD'),
                x: scale(tmp2.toDate()),
                type: 'month',
                stroke: '#333',
            };

            tmp2 = tmp2.add(1, 'month');
        }


        return Object.values(dates);
    }
}
