<app>
    <menu-bar brand={{label:'RT'}} site={site()} moves={[]}></menu-bar>

    <div ref="page-area"></div>

    <style>
     app > .page {
         width: 100vw;
         overflow: hidden;
         display: block;
     }
     .hide { display: none; }
    </style>

    <script>
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
    </script>
</app>
