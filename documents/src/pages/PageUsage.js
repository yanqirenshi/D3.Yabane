import React from 'react';

import UsageReactCode from './usage/UsageReactCode';

const style = {
    root: {
        width: '100%',
        // height: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        contents: {
            fontSize: '55px',
            marginBottom: '0px',
            fontWeight: 'bold',
        }
    },
    react_code: {
        background: '#f3f3f3',
        padding: '22px 33px',
        borderRadius: '11px',
        fontSize: '14px',
        marginTop: '33px',
    },
};

function PageUsage () {
    return (
        <div style={style.root}>
          <div>
            <p style={style.title.contents}>Usage</p>
          </div>

          <div>
            <UsageReactCode />
          </div>
        </div>
    );
}

export default PageUsage;
