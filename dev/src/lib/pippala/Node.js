export default class Node {
    constructor (data) {
        this._core = data;
    }
    core () {
        return this._core;
    }
    id () {
        return this.core().id;
    }
    parent () {
        return this.core().parent || null;
    }
};
