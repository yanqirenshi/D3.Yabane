import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const style = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
};

const data = [
    "import React from 'react';" ,
    "import D3Xyz from '../js/D3Xyz.js';" ,
    "" ,
    "const options = {" ,
    "    svg: {" ,
    "        selector: '#asshole-graph'," ,
    "        w: 1111," ,
    "        h: 333," ,
    "    }" ,
    "};" ,
    "" ,
    "function AssholeGraph (props) {" ,
    "    const [d3xyz] = useState(new D3Xyz().init(options));" ,
    "}" ,
    "" ,
    "export default AssholeGraph;" ,
];

function SlideUsage () {
    return (
        <section className="slide">
          <div style={style.root}>
            <h1 className="title is-1">Asshole.init()</h1>

            <div>
              <SyntaxHighlighter language="javascript" style={dark}>
                {data.join('\n')}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>
    );
}

export default SlideUsage;
