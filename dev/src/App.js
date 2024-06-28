import React, { useState, useEffect } from 'react';

import dayjs from 'dayjs';

import Asshole from './libs/index.js';
import { Rectum, Pippala } from './lib/index.js';

import DATA from './data/DATA.js';

const rectum = new Rectum({
    grid: { draw: false },
    transform:  {
        k: 0.3,
        x: 100.0,
        y: 100.0,
    },
    svg: {
        style: {
            background: '#ffffff',
            // background: '#f8ff8f',
            // backgroundImage: 'url(https:yanqirenshi.github.io/Mandara/assets/images/background/IMG_1519.JPG)',
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: 'cover',
            // backgroundPosition: 'center center',
        },
    },
});

const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    graph_area: {
        width:  1200 + (22*2),
        height: 800 + (22*2),
        background: '#eee',
        padding: 22,
        borderRadius: 5,
    },
};

export default function App() {
    const [data, setData] = useState(DATA);
    const [graph_data, setGraphData] = useState(null);

    useEffect(()=> {
        const term = getTerm(data.workpackages);

        const from = term.from;
        const to   = term.to;
        const cycle = 'w';

        // TODO: これは↓の useEffect じゃないかな
        const tree = new Pippala().build(from, to, data);

        setGraphData({
            scale: {
                cycle: cycle,
                from: from,
                to: to,
                size: graph_style.stage.w,
            },
            style: graph_style,
            tree: tree, // TODO: これは↓の useEffect じゃないかな
        });
    }, [data]);

    useEffect(()=> {
        if (!graph_data) return;

        rectum.data(rectum.chewing(graph_data));
    }, [graph_data]);

    return (
        <div style={style}>
          <div style={style.graph_area}>
            <Asshole id="asshole-graph" rectum={rectum}/>
          </div>
        </div>
    );
}

const graph_style = {
    stage: {
        w: 3333,
    },
    head: {
        h: 33,
    },
    body: {
        h: null, // cal wbs/wp number
        w: null, // cal wbs plan(start, end)
        columns: {
            h: 88,
            w: 111,
        },
        row: {
            w: 333,
            h:  88,
            margin: 33,
            stroke: { color: '#aaa' },
        },
        yabane: {
            head: 11,
            h: 66,       // TODO: これは row - margin * 2 じゃないかな。。。
            margin: 33,
            font: { size: 33 },
        },
    },
    foot: {
        h: 33,
    },
};

function getTerm (wps) {
    const x = wps.reduce((term, wp)=> {
        if (term.from===null || wp.plan.from < term.from)
            term.from = wp.plan.from;

        if (term.to===null || wp.plan.to > term.to)
            term.to = wp.plan.to;

        return term;
    }, { from: null, to: null });

    return {
        from: dayjs(x.from).add(1, 'M').format('YYYY-MM-DD'),
        to:   dayjs(x.to).add(-2, 'M').format('YYYY-MM-DD'),
    };
}
