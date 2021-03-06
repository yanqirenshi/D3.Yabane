riot.tag2('app', '<menu-bar brand="{{label:\'RT\'}}" site="{site()}" moves="{[]}"></menu-bar> <div ref="page-area"></div>', 'app > .page { width: 100vw; overflow: hidden; display: block; } app .hide,[data-is="app"] .hide{ display: none; }', '', function(opts) {
     this.site = () => {
         return STORE.state().get('site');
     };

     STORE.subscribe((action)=>{
         if (action.type!='MOVE-PAGE')
             return;

         let tags= this.tags;

         tags['menu-bar'].update();
         ROUTER.switchPage(this, this.refs['page-area'], this.site());
     })

     window.addEventListener('resize', (event) => {
         this.update();
     });

     if (location.hash=='')
         location.hash=STORE.get('site.active_page');
});

riot.tag2('markdown-preview', '', 'markdown-preview h1 { font-weight: bold; font-size: 20px; margin-top: 11px; margin-bottom: 6px; } markdown-preview h2 { font-weight: bold; font-size: 18px; margin-top: 8px; margin-bottom: 4px; } markdown-preview h3 { font-weight: bold; font-size: 16px; margin-top: 6px; margin-bottom: 3px; } markdown-preview h4 { font-weight: bold; font-size: 14px; margin-top: 6px; margin-bottom: 3px; } markdown-preview h5 { font-weight: bold; font-size: 12px; margin-bottom: 4px; } markdown-preview * { font-size: 12px; } markdown-preview table { border-collapse: collapse; } markdown-preview td { border: solid 0.6px #888888; padding: 2px 5px; } markdown-preview th { border: solid 0.6px #888888; padding: 2px 5px; background: #eeeeee; }', '', function(opts) {
     this.on('update', () => {
         this.root.innerHTML = this.opts.data;
     });

    this.root.innerHTML = opts.data

});

riot.tag2('menu-bar', '<aside class="menu"> <p ref="brand" class="menu-label" onclick="{clickBrand}"> {opts.brand.label} </p> <ul class="menu-list"> <li each="{opts.site.pages}"> <a class="{opts.site.active_page==code ? \'is-active\' : \'\'}" href="{\'#\' + code}"> {menu_label} </a> </li> </ul> </aside> <div class="move-page-menu hide" ref="move-panel"> <p each="{moves()}"> <a href="{href}">{label}</a> </p> </div>', 'menu-bar .move-page-menu { z-index: 666665; background: #ffffff; position: fixed; left: 55px; top: 0px; min-width: 111px; height: 100vh; box-shadow: 2px 0px 8px 0px #e0e0e0; padding: 22px 55px 22px 22px; } menu-bar .move-page-menu.hide { display: none; } menu-bar .move-page-menu > p { margin-bottom: 11px; } menu-bar > .menu { z-index: 666666; height: 100vh; width: 55px; padding: 11px 0px 11px 11px; position: fixed; left: 0px; top: 0px; background: #e198b4; } menu-bar .menu-label, menu-bar .menu-list a { padding: 0; width: 33px; height: 33px; text-align: center; margin-top: 8px; border-radius: 3px; background: none; color: #ffffff; font-weight: bold; padding-top: 7px; font-size: 14px; } menu-bar .menu-label,[data-is="menu-bar"] .menu-label{ background: #ffffff; color: #e198b4; } menu-bar .menu-label.open,[data-is="menu-bar"] .menu-label.open{ background: #ffffff; color: #e198b4; width: 44px; border-radius: 3px 0px 0px 3px; text-shadow: 0px 0px 1px #eee; padding-right: 11px; } menu-bar .menu-list a.is-active { width: 44px; padding-right: 11px; border-radius: 3px 0px 0px 3px; background: #ffffff; color: #333333; }', '', function(opts) {
     this.moves = () => {
         let moves = [
             { code: 'link-a', href: '', label: 'Link A' },
             { code: 'link-b', href: '', label: 'Link B' },
             { code: 'link-c', href: '', label: 'Link C' },
         ]
         return moves.filter((d)=>{
             return d.code != this.opts.current;
         });
     };

     this.brandStatus = (status) => {
         let brand = this.refs['brand'];
         let classes = brand.getAttribute('class').trim().split(' ');

         if (status=='open') {
             if (classes.find((d)=>{ return d!='open'; }))
                 classes.push('open')
         } else {
             if (classes.find((d)=>{ return d=='open'; }))
                 classes = classes.filter((d)=>{ return d!='open'; });
         }
         brand.setAttribute('class', classes.join(' '));
     }

     this.clickBrand = () => {
         let panel = this.refs['move-panel'];
         let classes = panel.getAttribute('class').trim().split(' ');

         if (classes.find((d)=>{ return d=='hide'; })) {
             classes = classes.filter((d)=>{ return d!='hide'; });
             this.brandStatus('open');
         } else {
             classes.push('hide');
             this.brandStatus('close');
         }
         panel.setAttribute('class', classes.join(' '));
     };
});

riot.tag2('modal-description-editor', '<div class="modal {isActive()}"> <div class="modal-background"></div> <div class="modal-content" style="width: 88vw;"> <div class="card"> <div class="card-content" style="height: 88vh;"> <div style="display:flex; height: 100%; width: 100%;flex-direction: column;"> <div style="margin-bottom:11px;"> <h1 class="title is-4">{title()} の Description の変更</h1> </div> <div style="display:flex; flex-grow: 1"> <div style="flex-grow: 1;margin-right: 8px;"> <div class="element-container"> <h1 class="title is-5">Markdown</h1> <textarea class="input" ref="description" onkeyup="{inputDescription}">{description()}</textarea> </div> </div> <div style=";flex-grow: 1;margin-left: 8px;"> <div class="element-container"> <h1 class="title is-5">Preview</h1> <div class="preview" style="padding: 0px 11px 11px 11px;"> <markdown-preview data="{marked(markdown)}"></markdown-preview> </div> </div> </div> </div> <div style="margin-top:11px;"> <button class="button is-warning" onclick="{clickCancel}">Cancel</button> <button class="button is-danger" style="float:right;" onclick="{clickSave}">Save</button> </div> </div> </div> </div> </div> </div>', 'modal-description-editor .element-container { display:flex; height: 100%; width: 100%; flex-direction: column; } modal-description-editor .element-container .title{ margin-bottom:6px; } modal-description-editor .input { border: 1px solid #eeeeee; padding: 11px; box-shadow: none; height: 100%; width: 100%; } modal-description-editor .preview { border: 1px solid #eeeeee; flex-grow:1; }', '', function(opts) {
     this.markdown = null;

     this.clickCancel = () => {
         this.opts.callback('close-modal-description-editor');
     };
     this.clickSave = () => {
         this.opts.callback('save-column-instance-description', {
             object: this.opts.data,
             value: this.refs['description'].value,
         });
     };
     this.inputDescription = () => {
         this.markdown = this.refs['description'].value;

         this.tags['markdown-preview'].update();
     };

     this.description = () => {
         if (!this.markdown) {
             let obj = this.opts.data;

             this.markdown = !obj ? '' : obj.description;
         }

         return this.markdown;
     };
     this.title = () => {
         if (!this.opts.data)
             return '';

         let obj = this.opts.data;
         return obj._class + ':' + obj.name;
     };
     this.isActive = () => {
         return this.opts.data ? 'is-active' : '';
     };
});

riot.tag2('page-tabs', '<div class="tabs is-boxed" style="padding-left:55px;"> <ul> <li each="{opts.core.tabs}" class="{opts.core.active_tab==code ? \'is-active\' : \'\'}"> <a code="{code}" onclick="{clickTab}">{label}</a> </li> </ul> </div>', 'page-tabs li:first-child { margin-left: 55px; }', '', function(opts) {
     this.clickTab = (e) => {
         let code = e.target.getAttribute('code');
         this.opts.callback(e, 'CLICK-TAB', { code: code });
     };
});

riot.tag2('section-breadcrumb', '<section-container data="{path()}"> <nav class="breadcrumb" aria-label="breadcrumbs"> <ul> <li each="{opts.data}"> <a class="{active ? \'is-active\' : \'\'}" href="{href}" aria-current="page">{label}</a> </li> </ul> </nav> </section-container>', 'section-breadcrumb section-container > .section,[data-is="section-breadcrumb"] section-container > .section{ padding-top: 3px; }', '', function(opts) {
     this.path = () => {
         let hash = location.hash;
         let path = hash.split('/');

         if (path[0] && path[0].substr(0,1)=='#')
             path[0] = path[0].substr(1);

         let out = [];
         let len = path.length;
         let href = null;
         for (var i in path) {
             href = href ? href + '/' + path[i] : '#' + path[i];

             if (i==len-1)
                 out.push({
                     label: path[i],
                     href: hash,
                     active: true
                 });

             else
                 out.push({
                     label: path[i],
                     href: href,
                     active: false
                 });
         }
         return out;
     }
});

riot.tag2('section-container', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', '', '', function(opts) {
});

riot.tag2('section-contents', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <div class="contents"> <yield></yield> </div> </div> </section>', 'section-contents > section.section { padding: 0.0rem 1.5rem 2.0rem 1.5rem; }', '', function(opts) {
});

riot.tag2('section-footer', '<footer class="footer"> <div class="container"> <div class="content has-text-centered"> <p> </p> </div> </div> </footer>', 'section-footer > .footer { background: #ffffff; padding-top: 13px; padding-bottom: 13px; }', '', function(opts) {
});

riot.tag2('section-header-with-breadcrumb', '<section-header title="{opts.title}"></section-header> <section-breadcrumb></section-breadcrumb>', 'section-header-with-breadcrumb section-header > .section,[data-is="section-header-with-breadcrumb"] section-header > .section{ margin-bottom: 3px; }', '', function(opts) {
});

riot.tag2('section-header', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', 'section-header > .section { background: #ffffff; }', '', function(opts) {
});

riot.tag2('section-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>機能</th> <th>概要</th> </tr> </thead> <tbody> <tr each="{data()}"> <td><a href="{hash}">{title}</a></td> <td>{description}</td> </tr> </tbody> </table>', '', '', function(opts) {
     this.data = () => {
         return opts.data.filter((d) => {
             if (d.code=='root') return false;

             let len = d.code.length;
             let suffix = d.code.substr(len-5);
             if (suffix=='_root' || suffix=='-root')
                 return false;

             return true;
         });
     };
});

riot.tag2('sections-list', '<table class="table"> <tbody> <tr each="{opts.data}"> <td><a href="{hash}">{name}</a></td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('home', '', '', '', function(opts) {
     this.mixin(MIXINS.page);

     this.on('mount', () => { this.draw(); });
     this.on('update', () => { this.draw(); });
});

riot.tag2('home_page_root', '<section-header title="HOME"></section-header> <section class="section"> <div class="container"> <h1 class="title is-4">Description</h1> <h2 class="subtitle"></h2> <section class="section"> <div class="container"> <h1 class="title is-5">CDN</h1> <h2 class="subtitle"></h2> <div class="contents"> <p>https://yanqirenshi.github.io/D3.Yabane/dist/beta/d3.yabane.js</p> <p>https://yanqirenshi.github.io/D3.Yabane/dist/0.0.2/d3.yabane.js</p> <p>https://yanqirenshi.github.io/D3.Yabane/dist/0.0.1/d3.yabane.js</p> </div> </div> </section> </div> </section> <section class="section"> <div class="container"> <h1 class="title is-4">Dependencies</h1> <h2 class="subtitle"></h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('usage-data', '<p><pre style="font-size:12px; line-height:13px;">{code}</pre></p>', '', '', function(opts) {
     this.code = [
         "var yabane_data = [",
         "    {",
         "        _class: 'WBS',",
         "        _id: 1,",
         "        code: '1',",
         "        name: 'www.yahoo.co.jp',",
         "        uri: 'https://www.yahoo.co.jp/',",
         "        schedule: {",
         "            start: moment().add(-1, 'h').toDate(),",
         "            end: moment().add(1, 'h').toDate(),",
         "        },",
         "        children: [],",
         "    },",
         "    {",
         "        _class: 'WBS',",
         "        _id: 2,",
         "        code: '2',",
         "        name: 'www.google.co.jp',",
         "        uri: 'https://www.google.co.jp/',",
         "        children: [",
         "            {",
         "                _class: 'WORKPACKAGE',",
         "                _id: 10,",
         "                code: '10',",
         "                name: 'www.facebook.com',",
         "                uri: 'https://www.facebook.com/',",
         "                schedule: {",
         "                    start: moment().add(-1, 'h').toDate(),",
         "                    end: moment().add(1, 'h').toDate(),",
         "                },",
         "                children: [],",
         "            },",
         "            {",
         "                _class: 'WORKPACKAGE',",
         "                _id: 11,",
         "                code: '11',",
         "                name: 'www.facebook.com',",
         "                uri: 'https://twitter.com/',",
         "                schedule: {",
         "                    start: moment().add(2, 'h').toDate(),",
         "                    end: moment().add(4, 'h').toDate(),",
         "                },",
         "                children: [],",
         "            }",
         "        ]",
         "    },",
         "    {",
         "        _class: 'WORKPACKAGE',",
         "        _id: 3,",
         "        code: '3',",
         "        name: 'www.amazon.co.jp',",
         "        uri: 'https://www.amazon.co.jp/',",
         "        schedule: {",
         "            start: moment().add(5, 'h').toDate(),",
         "            end: moment().add(6, 'h').toDate(),",
         "        },",
         "        children: [],",
         "    },",
         "    {",
         "        _class: 'WORKPACKAGE',",
         "        _id: 4,",
         "        code: '4',",
         "        name: 'www.facebook.com',",
         "        uri: 'https://www.facebook.com/',",
         "        schedule: {",
         "            start: moment().add(7, 'h').toDate(),",
         "            end: moment().add(10, 'h').toDate(),",
         "        },",
         "        children: [],",
         "    },",
         "    {",
         "        _class: 'WORKPACKAGE',",
         "        _id: 5,",
         "        code: '5',",
         "        name: 'www.facebook.com',",
         "        uri: 'https://twitter.com/',",
         "        schedule: {",
         "            start: moment().add(11, 'h').toDate(),",
         "            end: moment().add(12, 'h').toDate(),",
         "        },",
         "        children: [],",
         "    },",
         "];",
     ].join('\n');
});

riot.tag2('usage-html', '<p><pre style="font-size:12px; line-height:13px;">{code}</pre></p>', '', '', function(opts) {
     this.code = [
         '\<html\>',
         '    \<head\>',
         '        \<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.10.0/d3.min.js"\>\</script\>',
         '        \<script src="https://raw.githack.com/moment/moment/develop/moment.js"\>\</script\>',
         '        \<script src="https://yanqirenshi.github.io/Vanilla.js/dist/0.0.3/vanilla.js"\>\</script\>',
         '',
         '        \<script src="data.js"\>\</script\>',
         '        \<script src="d3.yabane.js"\>\</script\>',
         '    \</head\>',
         '    \<body\>',
         '        \<svg class="chart-yabane"\>\</svg\>',
         '    \</body\>',
         '\</html\>',
     ].join('\n');
});

riot.tag2('usage-js', '<p><pre style="font-size:12px; line-height:13px;">{code}</pre></p>', '', '', function(opts) {
     this.code = [
         "let now   = moment().millisecond(0).second(0).minute(0).hour(0);",
         "let start = moment(now).add(-2, 'w');",
         "let end   = moment(now).add( 6, 'M');",
         "let selector = 'svg.chart-yabane';",
         "",
         "this.options = {",
         "    stage: {",
         "        selector: selector,",
         "    },",
         "    scale: {",
         "        x: {",
         "            cycle: 'days',",
         "            tick: 88,",
         "            start:  start,",
         "            end:    end,",
         "        },",
         "        // y: null,",
         "        margin: {},",
         "    },",
         "    header: {",
         "        h:       33,",
         "        padding: 5,",
         "        fill:    {},",
         "        stroke:  {},",
         "        font:    {},",
         "    },",
         "    lane: {",
         "        h: 33,",
         "        w: null,",
         "        padding: 5,",
         "    },",
         "    yabane: {",
         "        color:  {},",
         "        fill:   {},",
         "        stroke: {},",
         "        font:   {},",
         "    }",
         "};",
         "",
         "let d3yabane = new D3jsYabane()",
         "    .config(options)",
         "    .makeStage()",
         "    .data(yabane_data) // with sizing and positioning",
         "    .draw();"
     ].join('\n');
});

riot.tag2('usage-page_tab-data', '<section class="section"> <div class="container"> <div class="contents"> <usage-data></usage-data> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('usage-page_tab-html', '<section class="section"> <div class="container"> <div class="contents"> <usage-html></usage-html> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('usage-page_tab-js', '<section class="section"> <div class="container"> <div class="contents"> <usage-js></usage-js> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('usage-page_tab-readme', '<section class="section"> <div class="container"> </div> </section>', '', '', function(opts) {
});

riot.tag2('usage', '', '', '', function(opts) {
     this.mixin(MIXINS.page);

     this.on('mount', () => { this.draw(); });
     this.on('update', () => { this.draw(); });
});

riot.tag2('usage_page_root', '<section-header title="Usage"></section-header> <div style="padding-left:55px;"> <page-tabs core="{page_tabs}" callback="{clickTab}"></page-tabs> </div> <div> <usage-page_tab-readme class="hide"></usage-page_tab-readme> <usage-page_tab-data class="hide"></usage-page_tab-data> <usage-page_tab-js class="hide"></usage-page_tab-js> <usage-page_tab-html class="hide"></usage-page_tab-html> </div>', '', '', function(opts) {
     this.page_tabs = new PageTabs([
         {code: 'readme', label: 'README',     tag: 'usage-page_tab-readme' },
         {code: 'data',   label: 'Data',       tag: 'usage-page_tab-data' },
         {code: 'js',     label: 'Javascript', tag: 'usage-page_tab-js' },
         {code: 'html',   label: 'HTML',       tag: 'usage-page_tab-html' },
     ]);

     this.on('mount', () => {
         this.page_tabs.switchTab(this.tags)
         this.update();
     });

     this.clickTab = (e, action, data) => {
         if (this.page_tabs.switchTab(this.tags, data.code))
             this.update();
     };
});
