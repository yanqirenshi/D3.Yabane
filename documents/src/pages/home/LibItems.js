import React from 'react';

import LibItem from './LibItem';

const style = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginLeft: '88px',
        marginRight: '88px',
        marginTop: '11px',
    },
};

function LibItems (props) {

    return (
        <div style={style.root}>
          {props.source.map((d, i) => {
              return <LibItem key={i} source={d} />;
          })}
        </div>
    );
}

export default LibItems;
