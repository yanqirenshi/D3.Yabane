import Node from './Node.js';

export default class ArrowFeather extends Node {
    constructor (data) {
        super(data);

        this._points = [
            [ 0, 0 ],
            [ 0, 0 ],
            [ 0, 0 ],
            [ 0, 0 ],
            [ 0, 0 ],
        ];

        this._points_str = this._points.reduce((str, arr)=> {
            return str + `${arr[0]},${arr[1]} `;
        }, '' );
    }
    style () {
        return this.styles().body.yabane;
    }
    points (v) {
        if (arguments.length===1) {
            this._points = v;
            this.pointsString(this.points2string(v));
        }

        return this._points;
    }
    pointsString (v) {
        if (arguments.length===1)
            this._points_str = v;

        return this._points_str;
    }
    head () {
        return this.style().head;
    }
    h () {
        // TODO: this.style() が null を返すとき。
        return this.style().h;
    }
    points2string (points) {
        return points.reduce((str, arr)=> {
            return str + `${arr[0]},${arr[1]} `;
        }, '' );
    }
    calPoints () {
        //   (x,y)
        // --- p1-------->p2
        //  ^  ^
        //  |  |               p3
        //  v  |
        // --- p5<--------p4
        //                |--h-|
        //     |-------w-------|

        const id = this.id();
        const x = this.x();
        const y = this.y();
        const w = this.w();
        const h = this.h();
        const head = this.head();

        const x_head_root = x + w - head;

        return [
            [ x,           y ],       // p1
            [ x_head_root, y ],       // p2
            [ x + w,       y + h/2 ], // p3
            [ x_head_root, y + h ],   // p4
            [ x,           y + h ],   // p5
        ];
    }
};
