import React from 'react';

const style = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
};

const data = [
    " Appl               :    D3.*                    :  DOM",
    "                    :                            :",
    "   +----------+     :       +------------+       :      +-----+",
    "   | Data     |---[make]--->| graph Data |--->[Draw]--->| SVG |",
    "   |==========|     :       |------------|       :      +-----+",
    "   | _element |     :       | _core      |       :",
    "   |----------|     :       |------------|       :",
    "   +----------+     :       +------------+       :",
];

function SlideOverview () {
    return (
        <section className="slide">
          <div style={style.root}>
            <h1> Data Overview</h1>

            <div>
              <p>
                <pre>{data.join('\n')}</pre>
              </p>
            </div>
          </div>
        </section>
    );
}

export default SlideOverview;
