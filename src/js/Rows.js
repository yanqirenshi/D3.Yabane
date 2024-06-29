export default class Rows {
    constructor (rectum) {
        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    build (style, branches) {
        const m_b = style.body ? style.body.row.margin / 2 : 0;

        return branches.map(branch=> {
            return {
                id: branch.id(),
                x1: 0,
                y1: branch.y() + branch.h() + m_b,
                x2: style.stage.w + style.body.row.w + style.body.row.margin,
                y2: branch.y() + branch.h() + m_b,
                stroke: style.body.row.stroke.color,
                // strokeDasharray: '10 10',
            };
        });
    }
}
