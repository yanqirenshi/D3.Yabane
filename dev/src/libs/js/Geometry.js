// https://yanqirenshi.github.io/D3.Sketch/dist/edge/Drawer.js
/**
 * 幾何学計算するための Drawer です。
 *
 * @example
 * let drawer = new DrawerHierarchy();
 */
export default class Geometry {
    ///// ////////////////////////////////////////////////////////////////
    /////   Utilities
    ///// ////////////////////////////////////////////////////////////////
    deg2rad (degree) {
        return degree * ( Math.PI / 180 );
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Cross Point of two lines
    ///// ////////////////////////////////////////////////////////////////
    isCorss(A, B, C, D) {
        // 二つの線分の交差チェック
        // https://www.hiramine.com/programming/graphics/2d_segmentintersection.html
        let ACx = C.x - A.x;
        let ACy = C.y - A.y;
        let BUNBO = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

        if (BUNBO===0)
            return false;

        let r = ((D.y - C.y) * ACx - (D.x - C.x) * ACy) / BUNBO;
        let s = ((B.y - A.y) * ACx - (B.x - A.x) * ACy) / BUNBO;

        return ((0 <= r && r <= 1) && (0 <= s && s <= 1));
    }
    // 2直線の交点を求める。(具)
    getCrossPointCore (line, line_port) {
        let out = { x:0, y:0 };

        let A = line.from;
        let B = line.to;
        let C = line_port.from;
        let D = line_port.to;

        let bunbo = (B.y - A.y) * (D.x - C.x) - (B.x - A.x) * (D.y - C.y);

        if (!this.isCorss(A, B, C, D))
            return null;

        // 二つの線分の交点を算出する。
        // http://mf-atelier.sakura.ne.jp/mf-atelier/modules/tips/program/algorithm/a1.html
        let d1, d2;

        d1 = (C.y * D.x) - (C.x * D.y);
        d2 = (A.y * B.x) - (A.x * B.y);

        out.x = (d1 * (B.x - A.x) - d2 * (D.x - C.x)) / bunbo;
        out.y = (d1 * (B.y - A.y) - d2 * (D.y - C.y)) / bunbo;

        return out;
    }
    // 2直線の交点を求める。
    getCrossPoint (lines, line_port) {
        for (let line of lines) {
            let point = this.getCrossPointCore(line, line_port);

            if (point)
                return point;
        }

        return null;
    }
}
