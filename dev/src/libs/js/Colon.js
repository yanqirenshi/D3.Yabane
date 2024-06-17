import D3Svg, {Camera} from '@yanqirenshi/d3.svg';

import Background from './data/Background.js';
import Font       from './data/Font.js';
import Position   from './data/Position.js';
import Rectangle  from './data/Rectangle.js';
import Stroke     from './data/Stroke.js';
import Label      from './data/Label.js';
import Padding    from './data/Padding.js';
import Hierarchy  from './Hierarchy.js';
import Geometry   from './Geometry.js' ;

export {
    Camera,
    Hierarchy,
    Geometry,
    Background,
    Font,
    Position,
    Rectangle,
    Stroke,
    Padding,
    Label,
};

export default class Colon {
    /** ****************************************************************
     *  params:
     *    selector  ???
     *    camera    ???
     * **************************************************************** */
    constructor (params={}) {
        const layers = params.layers;
        const transform = params.transform;

        this._d3svg = new D3Svg({
            layers: layers || [
                { id: 1, code: 'background' },
                { id: 2, code: 'foreground' },
            ],
            transform: transform || {
                k: 1.0,
                x: 0.0,
                y: 0.0,
            },
        });

        this._grid = params.grid || {
            draw: true,
            size: 10000,
            span:   100,
        };

        this._svg = params.svg || {
            style: {
                background: "#ffffff",
            }
        };

        this._data = null;

        this._first_draw = null;

        if (params.camera)
            this.camera(params.camera);
    }
    /** ***************************************************************
     *  svg
     * **************************************************************** */
    svg () {
        return this._svg;
    }
    /** ***************************************************************
     *  Wrapper
     * **************************************************************** */
    selector (v) {
        if (!this._d3svg) return;

        this.selector_setBefore();

        this._d3svg.selector(v, false);

        this.selector_setAfter();

        this.drawGrids();

        if (this._first_draw===null)
            this.draw();
    }
    selector_setBefore () { /* Aspect method */ }
    selector_setAfter  () { /* Aspect method */ }
    d3Element () {
        if (!this._d3svg) return null;
        return this._d3svg.d3Element();
    }
    camera (v) {
        if (!this._d3svg) return null;

        if (arguments.length===0)
            return this._d3svg.camera();

        return this._d3svg.camera(v);
    }
    bounds (v) {
        if (!this._d3svg) return null;

        if (arguments.length===0)
            return this._d3svg.bounds();

        return this._d3svg.bounds(v);
    }
    layers () {
        if (!this._d3svg) return null;
        return this._d3svg.layers();
    }
    layer (code) {
        if (!this._d3svg) return null;
        return this._d3svg.layer(code);
    }
    d3svg () {
        if (this._d3svg.d3Element())
            return this._d3svg;

        this.setting();

        return this._d3svg;
    }
    /** ***************************************************************
     *  Grids
     * **************************************************************** */
    gridsData (size = 10000) {
        const lineSize = (pos) => {
            if (pos===0)     return 20;
            if (pos%1000===0) return 10;
            return 1;
        };

        const out = [];
        for (let pos=size*-1; pos<=size ; pos+=100 ) {
            const line = lineSize(pos);
            out.push({ x1: pos,     x2: pos,  y1: size*-1, y2: size, size: line});
            out.push({ x1: size*-1, x2: size, y1: pos,     y2: pos,  size: line});
        }

        return out;
    }
    drawGrids () {
        if (this._grid.draw===false)
            return;

        this.layer('background')
            .selectAll('line.grid')
            .data(this.gridsData())
            .enter()
            .append("line")
            .attr("x1",d=>d.x1)
            .attr("x2",d=>d.x2)
            .attr("y1",d=>d.y1)
            .attr("y2",d=>d.y2)
            .attr("stroke-width", d=>d.size)
            .attr("stroke","#e0e0e0");
    }
    /** ***************************************************************
     *  Data
     * **************************************************************** */
    data_setBefore (v) {}
    data_setAfter (v) {}
    data (v) {
        const data = this._data;
        if (arguments.length===0)
            return data;

        this._data = v;

        const d3svg = this._d3svg;

        if (!d3svg || !d3svg.selector())
            return data;

        if (this._first_draw===null)
            this._first_draw = new Date();

        this.draw();

        return data;
    }
    /** ***************************************************************
     *  Draw (Overwride)
     * **************************************************************** */
    draw () {
        return this;
    }
}
