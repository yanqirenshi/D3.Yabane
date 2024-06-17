import React from 'react';

import ReactFullpage from '@fullpage/react-fullpage';

import PageHome from './pages/PageHome';
import PageInit from './pages/PageInit';
import PageData from './pages/PageData';
import PageUsage from './pages/PageUsage';
import PageWhats from './pages/PageWhats';

const style = {
    root: {
        background: '#fce2c4',
    }
};

function App() {
    return (
        <ReactFullpage
          licenseKey = {'YOUR_KEY_HERE'}
          scrollingSpeed = {1000}
          scrollHorizontally = {true}
          scrollHorizontallyKey = {'YOUR KEY HERE'}
          render={({ state, fullpageApi }) => {
              return (
                  <ReactFullpage.Wrapper>
                    <div className="section" style={style.root}>
                      <PageHome />
                    </div>

                    <div className="section" style={style.root}>
                      <PageWhats />
                    </div>

                    <div className="section" style={style.root}>
                      <PageInit />
                    </div>

                    <div className="section" style={style.root}>
                      <PageData />
                    </div>

                    <div className="section" style={style.root}>
                      <PageUsage />
                    </div>
                  </ReactFullpage.Wrapper>
              );
          }}
        />
    );
}

export default App;
