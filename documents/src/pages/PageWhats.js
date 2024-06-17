import React from 'react';

import SlideDescription from './whats/SlideDescription';

const style = {
    root: {
        width: '100%',
        // height: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

function PageWhats () {

    return (
        <div style={style.root}>
          <SlideDescription />
        </div>
    );
}

export default PageWhats;
