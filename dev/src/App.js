import React, { useState, useEffect } from 'react';

import Asshole from './libs/index.js';
import { Rectum, Pippala } from './lib/index.js';

import DATA from './data/DATA.js';

const rectum = new Rectum({
    grid: { draw: true },
    transform:  {
        k: 0.3,
        x: 0.0,
        y: 0.0,
        // x: 3500.0,
        // y: 300.0,
    },
    svg: {
        // style: {
        //     background: '#f8ff8f',
        //     backgroundImage: 'url(https://yanqirenshi.github.io/Mandara/assets/images/background/IMG_1519.JPG)',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center center',
        // },
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
        const tree = new Pippala().build(data);

        setGraphData({
            scale: {
                cycle: 'w',
                from: '2024-06-01',
                to:   '2024-06-30',
                size: 333,
            },
            style: graph_style,
            tree: tree,
        });
    }, [data]);

    useEffect(()=> {
        if (!graph_data) return;

        rectum.makeScale(graph_data.scale);

        const rectum_data = rectum.chewing(graph_data);

        rectum.data(rectum_data);
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
