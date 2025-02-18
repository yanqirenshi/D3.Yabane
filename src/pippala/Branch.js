import Node from './Node.js';
import dayjs from 'dayjs';

//       -------------------------- ---------------------------------
//      |      margin.t            |
//  --- |   +------------------+   | --------------------------------
//   |  |   |  padding.t       |   |
//   |  |   | ---------------- |   |   reaf
//   |  |   |   |          |   |   |
//   h  | l | l |          | r | r |   area
//   |  |   |   |          |   |   |
//   |  |   | ---------------- |   |
//   |  |   |  padding.b       |   |
//  --- |   +------------------+   | --------------------------------
//      |      maring.b            |
//       -------------------------- ---------------------------------
//
//          |--------w---------|
//
export default class Branch extends Node {
    constructor (data) {
        super(data);

        this._children = { ht:{}, list:[], };
    }
    name () {
        return this.core().name;
    }
    children () {
        return this._children;
    }
    sortedChildren () {
        return this.children().list.sort((a,b)=> {
            if (a.plan().from < b.plan().from)
                return -1;

            if (a.plan().from > b.plan().from)
                return 1;

            return a.plan().to < b.plan().to ? -1 : 1;
        });
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
        // + this.margin().t
            + this.h()
            + this.margin().b
        ;
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
    calX () {
        const style = this.style();

        return style.margin * -1 * 1;
    }
    calH (styles) {
        const children = this.children().list;
        const len = children.length;

        const sytle_yabane = styles.body.yabane;

        // return len * sytle_yabane.h + (len - 1) * sytle_yabane.margin;
        return sytle_yabane.h;
    }
    styling (scale, styles, before) {

        // ここでセットするの？
        this.styles(styles);

        this.x(this.calX(styles));

        this.y(before ? before.nextY() : 0);

        this.h(this.calH(styles));

        return this;
    }
};
