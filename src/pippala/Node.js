class Stylist {
    constructor () {
        this._style = null;
    }
    styles (v) {
        if (arguments.length===1)
            this._style = v;

        return this._style;
    }
}

export default class Node extends Stylist{
    constructor (data) {
        super();

        this._core = data;

        this._style = null;

        this._x = 0;
        this._y = 0;
        this._w = 0;
        this._h = 0;

        this._tree = null;
    }
    core () {
        return this._core;
    }
    id () {
        return this.core().id;
    }
    tree (v) {
        if (arguments.length===1)
            this._tree = v;

        return this._tree;
    }
    parentId () {
        return this.core().parent || null;
    }
    parent () {
        const parent_id = this.parentId();

        if (!parent_id)
            return null;

        return this.tree().branch(parent_id);
    }
    x (v) {
        if (arguments.length===1)
            this._x = v;

        return this._x;
    }
    y (v) {
        if (arguments.length===1)
            this._y = v;

        return this._y;
    }
    w (v) {
        if (arguments.length===1)
            this._w = v;

        return this._w;
    }
    h (v) {
        if (arguments.length===1)
            this._h = v;

        return this._h;
    }
};
