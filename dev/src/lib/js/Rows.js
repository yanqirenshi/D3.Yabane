export default class Rows {
    // constructor (v) {
    // }
    build (branches) {
        return branches.map(branch=> {
            return {
                id: branch.id(),
                x1: 0,
                y1: branch.y() + branch.h() + 5,
                x2: 3333,
                y2: branch.y() + branch.h() + 5,
                stroke: '#aaa',
                strokeDasharray: '4 4',
            };
        });
    }
}
