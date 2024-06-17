import React from 'react';

import SlideUsage from './init/SlideUsage';
import SlideOverview from './init/SlideOverview';

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
};

function PageInit () {
    return (
        <div style={style.root}>
          <SlideUsage />
          <SlideOverview />
        </div>
    );
}

export default PageInit;
