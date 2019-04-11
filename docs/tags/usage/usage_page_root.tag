<usage_page_root>
    <section-header title="Usage"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <usage-page_tab-readme class="hide"></usage-page_tab-readme>
        <usage-page_tab-data   class="hide"></usage-page_tab-data>
        <usage-page_tab-js     class="hide"></usage-page_tab-js>
        <usage-page_tab-html   class="hide"></usage-page_tab-html>
    </div>

    <script>
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
    </script>

</usage_page_root>
