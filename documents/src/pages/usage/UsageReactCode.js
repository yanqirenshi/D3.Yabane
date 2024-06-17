import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const style = {
    root: {
    },
};

const data = [
    "import React, { useState, useEffect } from 'react';" ,
    "import D3Xyz from '../js/D3Xyz.js';" ,
    "" ,
    "function AssholeGraph (props) {" ,
    "    const [d3xyz] = useState(new D3Xyz().init({",
    "        svg: {",
    "            selector: '#asshole-graph',",
    "            w: 1111, h: 333,",
    "        }",
    "    }));",
    "" ,
    "    useEffect(() => { d3xyz.data(props.graph_data); });" ,
    "" ,
    "    useEffect(() => {" ,
    "        window.addEventListener('resize', () => {" ,
    "            d3er.svgSize(document.getElementById('asshole-graph-container'));" ,
    "        });" ,
    "    }, []);" ,
    "" ,
    "    return (" ,
    "        <div id='asshole-graph-container'>" ,
    "          <svg id='asshole-graph'/>" ,
    "        </div>" ,
    "    );" ,
    "}" ,
    "" ,
    "export default AssholeGraph;" ,
];

function UsageReactCode () {
    return (
        <div style={style.root}>
          <SyntaxHighlighter language="javascript" style={dark}>
            {data.join('\n')}
          </SyntaxHighlighter>
        </div>
    );
}

export default UsageReactCode;
