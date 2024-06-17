import React from 'react';

const style = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
};

function SlideDescription () {
    return (
        <section className="slide">
          <div style={style.root}>
            <h1 className="title is-1">Asshole とは</h1>

            <div style={{textAlign: 'center'}}>
              <p>不可逆な物の象徴です。</p>
              <p>それは Engineering / Rverse engineering における「敵」であると考えます。</p>
            </div>
          </div>
        </section>
    );
}

export default SlideDescription;
