import React from 'react';

import SlideUsage from './data/SlideUsage';
import SlideOverview from './data/SlideOverview';

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
};

function PageData () {
    return (
        <div style={style.root}>
          <SlideUsage />
          <SlideOverview />
        </div>
    );
}

export default PageData;
