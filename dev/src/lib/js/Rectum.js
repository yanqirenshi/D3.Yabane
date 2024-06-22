import Colon from '../../libs/js/Colon.js';
import * as d3 from 'd3';
import dayjs from 'dayjs';

export default class Rectum extends Colon {
    constructor () {
        super();

        this._scale = null;
    }
    makeScale (scale) {
        const from_date = dayjs(scale.from).toDate();
        const to_date = dayjs(scale.to).toDate();

        this._scale = d3.scaleTime([from_date, to_date], [0, scale.size]);

        return this._scale;
    }
    scale () {
        return this._scale;
    }
    chewing (graph_data) {
        const scale = this.scale();

        // Branch(WBS)  の x, y, w, h を決める。
        let before = null;
        for (const branch of graph_data.tree.branches()) {
            // ここでセットするの？
            branch.styles(graph_data.style);

            branch.x(0);
            branch.y(before ? before.nextY() : 0);

            before = branch;
        }

        // Reaf(Workpackage) の x, w, h を決める。 y は後で決める。
        // TODO: いったん y も決められるな。。。。
        for (const reaf of graph_data.tree.reafs()) {
            // ここでセットするの？
            reaf.styles(graph_data.style);

            const start = scale(reaf.plan().from);
            const end   = scale(reaf.plan().to);
            reaf.x(start);
            reaf.w(end - start);

            const branch = reaf.parent();
            console.log(branch.y());
        }

        return {};
    }
    draw () {
        const data = this.data();

        const list = [
            {
                id: 1,
                x: 10, y: 20,
                w: 200, h: 50,
                head: 30,
            },
            {
                id: 2,
                x: 100, y: 200,
                w: 300, h: 50,
                head: 30,
            },
        ];

        const p = new ArrowFeatherPainter();

        const place = this.layer('foreground');

        p.draw(place, list.map(d=> new ArrowFeather(d, {})));

        return this;
    }
}

class ArrowFeather {
    constructor (data, style) {
        this._core = data;
        this._style = style;

        this.w = data.w || 0;
        this.h = data.h || 0;
        this.x = data.x || 0;
        this.y = data.y || 0;
        this.head = data.head || 0;

        this._points = this.calPoints();
        this._points_str = this._points.reduce((str, arr)=> {
            return str + `${arr[0]},${arr[1]} `;
        }, '' );
    }
    points () {
        return this._points;
    }
    pointsString () {
        return this._points_str;
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

        const id = this.id;
        const x = this.x;
        const y = this.y;
        const w = this.w;
        const h = this.h;
        const head = this.head;

        const x_head_root = x + w - head;

        return [
            [ x,           y ],       // p1
            [ x_head_root, y ],       // p2
            [ x + w,       y + h/2 ], // p3
            [ x_head_root, y + h ],   // p4
            [ x,           y + h ],   // p5
        ];
    }
}

class ArrowFeatherPainter {
    // constructor () {}
    draw (place, data) {
        place.selectAll("div")
            .data(data, (d)=> d.id)
            .enter()
            .append("polygon")
            .attr("points", (d)=> d.pointsString())
            .attr("fill","#3da4ab")
            .attr("stroke-width", 4)
            .attr("stroke","#0e9aa7");
    }
}
