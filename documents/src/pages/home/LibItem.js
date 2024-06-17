import React from 'react';

const style = {
    root: {
        borderRadius: '5px',
        padding: '8px',
        background: '#fff',
        marginTop: '11px',
        marginLeft: '11px',
    },
    inner: {
        padding: '8px 16px',
        borderRadius: '5px',
        background: 'rgb(250, 191, 20)',
    },
    label: {
        margin: '0px',
        color: '#fff',
    },
};

function LibItem (props) {
    const item = props.source;

    return (
        <a href={item.url} style={{textDecoration: 'none'}}>
          <div style={style.root}>
            <div style={style.inner}>
              <p style={style.label}>
                {item.label}
              </p>
            </div>
            <div>
              {item.prod.map((l,i)=> <p key={i}>{l}</p>)}
            </div>
            <div>
              {item.dev.map((l,i)=> <p key={i}>{l}</p>)}
            </div>
          </div>
        </a>
    );
}

export default LibItem;
