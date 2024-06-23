// import dayjs from 'dayjs';
import Node from './Node.js';

export default class Branch extends Node {
    constructor (data) {
        super(data);

        this._children = { ht:{}, list:[], };
    }
    children () {
        return this._children;
    }
    w () {
        // TODO: this.styles() が null を返すとき。
        return this.style().w;
    }
    // h () {
    //     // TODO: this.styles() が null を返すとき。
    //     return this.style().h;
    // }
    nextY () {
        return this.y()
            + this.margin().t
            + this.h() * this.children().list.length
            + this.margin().b;
    }
    inputTemplate () {
        return {
            id: -1,
            name: '???',
        };
    }
    addChild (child) {
        this._children.ht[child.id()] = child;
        this._children.list.push(child);
    }
    style () {
        return this.styles().body.row;
    }
    margin () {
        const m = this.style().margin;

        return { l: m, r: m, t: m,b: m };
    }
    styling (scale, styles, before) {
        // ここでセットするの？
        this.styles(styles);

        this.x(0);
        this.y(before ? before.nextY() : 0);

        const children = this.children().list;

        this.h(children.length * styles.body.row.h);

        return this;
    }
};
