export default class Rows {
    constructor (rectum) {
        this._rectum = rectum;
    }
    rectum () {
        return this._rectum;
    }
    build (style, branches) {
        const style_body = style.body;

        const m_b = style_body ? style_body.row.margin / 2 : 0;

        return branches.map(branch=> {
            return {
                id: branch.id(),
                x1: 0,
                y1: branch.y() + branch.h() + m_b,
                x2: 3333,
                y2: branch.y() + branch.h() + m_b,
                stroke: '#aaa',
                // strokeDasharray: '10 10',
            };
        });
    }
}
