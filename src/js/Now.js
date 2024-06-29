import dayjs from 'dayjs';

export default class Now {
    constructor (rectum) {
        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    build (style, branches, scale) {
        let last = null;
        for (const branch of branches) {
            if (last && branch.y() < last.y())
                continue;
            last = branch;
        }

        const h = last.y() + last.h() + style.body.row.margin;
        const dt = dayjs();
        const x = scale(dt.toDate());
        return {
            dt: dt.format('YYYY-MM-DD HH:mm:ss'),
            x1: x,
            y1: 0,
            x2: x,
            y2: h,
            stroke: {
                color: '#eb6101',
                width: 5,
            }
        };
    }
}
