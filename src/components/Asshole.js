import React, { useState, useEffect } from 'react';
import Measure from 'react-measure';
import sha256 from 'sha256';

function makeSvgID (id) {
    return 'svg_' + sha256(id + (new Date()).toISOString());
}

export default function Asshole (props) {
    const [svg_id, setSvgID] = useState(null);
    const [bounds, setBounds] = useState({width:0, height:0});

    const rectum = props.rectum;

    useEffect(()=> setSvgID(makeSvgID(props.id)), [props.id]);

    useEffect(()=> {
        if (!svg_id) return;

        rectum.selector('#' + svg_id);
    }, [svg_id]);

    return (
        <Measure bounds onResize={contentRect=> setBounds(contentRect.bounds)}>
          {({ measureRef }) => (
              <div ref={measureRef} style={{width:'100%', height:'100%'}}>
                <svg id={svg_id}
                     style={rectum.svg().style}
                     width={bounds.width}
                     height={bounds.height} />
              </div>
          )}
        </Measure>
    );
}
