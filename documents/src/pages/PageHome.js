import React from 'react';

import LibItems from './home/LibItems';
import {ITEMS} from '../data/HOME.js';

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
    title: {
        jp: {
            fontFamily: "Sawarabi Mincho",
            color: "rgb(153,0,0)",
            fontWeight: 'bold',
            fontSize: '33px',
            textShadow: '0px 0px 11px rgb(250, 191, 20)',
        },
        en: {
            fontFamily: "Sawarabi Mincho",
            color: "rgb(255,0,0)",
            fontWeight: 'bold',
            fontSize: '111px',
            textShadow: '0px 0px 11px rgb(250, 191, 20)',
        },
    }
};

function PageHome () {
    let items = ITEMS;

    return (
        <div style={style.root}>
          <div style={style.title}>
            <p>
              <span style={style.title.jp}>きっと何者にもなれない</span>
              <span style={style.title.en}>Asshole</span>
              <span style={style.title.jp}>たちに告げる</span>
            </p>
          </div>

          <div style={{marginTop: '55px'}}>
            <LibItems source={items.first}/>
            <LibItems source={items.second}/>
            <LibItems source={items.third}/>
            <LibItems source={items.ama}/>
          </div>
        </div>
    );
}

export default PageHome;
