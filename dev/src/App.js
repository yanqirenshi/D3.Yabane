import React, { useState, useEffect } from 'react';

import Asshole from './libs/index.js';
import { Rectum, Pippala } from './lib/index.js';

import DATA from './data/DATA.js';

const rectum = new Rectum({
    grid: { draw: false },
    transform:  {
        k: 0.2,
        x: 0.0,
        y: 0.0,
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
        const from = '2024-06-01';
        const to   = '2025-05-30';
        const cycle = 'w';

        // TODO: これは↓の useEffect じゃないかな
        const tree = new Pippala().build(data);

        setGraphData({
            scale: {
                cycle: cycle, from: from, to: to, size: 3333,
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
            w: 222,
            h:  88 + 33, // TODO: うーん。。。
            margin: 33,
        },
        yabane: {
            head: 11,
            h: 66,       // TODO: これは row - margin * 2 じゃないかな。。。
            margin: 33,
        },
    },
    foot: {
        h: 33,
    },
};
