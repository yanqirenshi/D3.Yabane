// import dayjs from 'dayjs';
import Node from './Node.js';

export default class Branch extends Node {
    constructor (data) {
        super(data);

        this._children = { ht:{}, list:[], };
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
};
